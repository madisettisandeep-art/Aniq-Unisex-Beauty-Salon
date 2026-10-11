import fs from 'fs';
import path from 'path';
import { Appointment, BookingStatus, SalonMaster, SalonService, SalonSettings } from '../types/booking';
import { SERVICE_CATALOG } from '../data/service-catalog';
import { SALON_MASTERS } from '../data/masters';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'salon-db.json');

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  targetId?: string;
  details: string;
}

export interface SalonDatabase {
  settings: SalonSettings;
  services: SalonService[];
  masters: SalonMaster[];
  appointments: Appointment[];
  auditLogs: AuditLog[];
  adminSessionToken?: string;
}

/**
 * O(1) Secondary Hash Indexes for fast database lookups without full table scans
 */
interface DbIndexes {
  servicesById: Map<string, SalonService>;
  mastersById: Map<string, SalonMaster>;
  appointmentsByRef: Map<string, Appointment>;
  appointmentsByMasterAndDate: Map<string, Appointment[]>;
  appointmentsByDate: Map<string, Appointment[]>;
}

/**
 * Pooled Database Connection & Query Cache State
 */
interface DbPoolState {
  db: SalonDatabase | null;
  lastMtimeMs: number;
  indexes: DbIndexes;
  queryCache: Map<string, { value: any; expiresAt: number }>;
  activeConnections: number;
  totalQueriesExecuted: number;
  cacheHits: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __aniqDbPool: DbPoolState | undefined;
}

const DEFAULT_SETTINGS: SalonSettings = {
  brandName: 'ANIQ Unisex Beauty Salon and Tattoo',
  tagline: 'West Marredpally, Secunderabad',
  address: 'W Marredpally Road, Siva Arun Colony, West Marredpally, Secunderabad, Telangana 500026, India',
  phone: '+91 99124 17109',
  whatsappNumber: '919912417109',
  googleRating: 4.7,
  googleReviewCount: 91,
  instagramUrl: 'https://www.instagram.com/aniqstudio_westmarredpally/',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aniq+Unisex+Beauty+Salon+and+Tattoo+West+Marredpally+Secunderabad',
  operatingHours: {
    openTime: '10:00',
    closeTime: '21:00',
    operatingDays: 'Monday – Sunday (All 7 Days)'
  },
  minNoticeHours: 2,
  maxAdvanceBookingDays: 30,
  cancellationPolicy: 'Cancellations or rescheduling are requested at least 2 hours before the scheduled appointment slot.'
};

function createEmptyIndexes(): DbIndexes {
  return {
    servicesById: new Map(),
    mastersById: new Map(),
    appointmentsByRef: new Map(),
    appointmentsByMasterAndDate: new Map(),
    appointmentsByDate: new Map(),
  };
}

function getPool(): DbPoolState {
  if (!globalThis.__aniqDbPool) {
    globalThis.__aniqDbPool = {
      db: null,
      lastMtimeMs: 0,
      indexes: createEmptyIndexes(),
      queryCache: new Map(),
      activeConnections: 1,
      totalQueriesExecuted: 0,
      cacheHits: 0,
    };
  }
  return globalThis.__aniqDbPool;
}

/**
 * Rebuilds O(1) in-memory B-tree/Hash indexes whenever the database loads or mutates
 */
function rebuildIndexes(db: SalonDatabase, indexes: DbIndexes) {
  indexes.servicesById.clear();
  for (const s of db.services) {
    indexes.servicesById.set(s.id, s);
  }

  indexes.mastersById.clear();
  for (const m of db.masters) {
    indexes.mastersById.set(m.id, m);
  }

  indexes.appointmentsByRef.clear();
  indexes.appointmentsByMasterAndDate.clear();
  indexes.appointmentsByDate.clear();

  for (const app of db.appointments) {
    const refKey = app.bookingReference.toUpperCase();
    indexes.appointmentsByRef.set(refKey, app);

    const dateBucket = indexes.appointmentsByDate.get(app.appointmentDate) || [];
    dateBucket.push(app);
    indexes.appointmentsByDate.set(app.appointmentDate, dateBucket);

    const masterDateKey = `${app.masterId}::${app.appointmentDate}`;
    const mdBucket = indexes.appointmentsByMasterAndDate.get(masterDateKey) || [];
    mdBucket.push(app);
    indexes.appointmentsByMasterAndDate.set(masterDateKey, mdBucket);
  }
}

/**
 * Acquires a pooled database handle, reading from disk only on cold start or external file change
 */
function acquirePooledDb(): { db: SalonDatabase; indexes: DbIndexes; pool: DbPoolState } {
  const pool = getPool();
  pool.totalQueriesExecuted += 1;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialDb: SalonDatabase = {
      settings: DEFAULT_SETTINGS,
      services: SERVICE_CATALOG,
      masters: SALON_MASTERS,
      appointments: [],
      auditLogs: [
        {
          id: 'log-init',
          timestamp: new Date().toISOString(),
          actor: 'system',
          action: 'INIT_DATABASE',
          details: 'Initialized database with verified service catalogue and masters.'
        }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    const stat = fs.statSync(DB_FILE);
    pool.db = initialDb;
    pool.lastMtimeMs = stat.mtimeMs;
    rebuildIndexes(initialDb, pool.indexes);
    return { db: initialDb, indexes: pool.indexes, pool };
  }

  try {
    const stat = fs.statSync(DB_FILE);
    if (pool.db && pool.lastMtimeMs === stat.mtimeMs) {
      return { db: pool.db, indexes: pool.indexes, pool };
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as SalonDatabase;
    pool.db = parsed;
    pool.lastMtimeMs = stat.mtimeMs;
    rebuildIndexes(parsed, pool.indexes);
    return { db: parsed, indexes: pool.indexes, pool };
  } catch (err) {
    if (pool.db) {
      return { db: pool.db, indexes: pool.indexes, pool };
    }
    const fallbackDb: SalonDatabase = {
      settings: DEFAULT_SETTINGS,
      services: SERVICE_CATALOG,
      masters: SALON_MASTERS,
      appointments: [],
      auditLogs: []
    };
    pool.db = fallbackDb;
    rebuildIndexes(fallbackDb, pool.indexes);
    return { db: fallbackDb, indexes: pool.indexes, pool };
  }
}

/**
 * Atomic write-through persistence that updates pooled state, rebuilds indexes, and invalidates stale query caches
 */
function commitPooledDb(db: SalonDatabase) {
  const pool = getPool();
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);

  const stat = fs.statSync(DB_FILE);
  pool.db = db;
  pool.lastMtimeMs = stat.mtimeMs;
  rebuildIndexes(db, pool.indexes);
  // Invalidate cached expensive queries on write
  pool.queryCache.clear();
}

function getCachedQuery<T>(key: string, ttlMs: number, computeFn: () => T): T {
  const pool = getPool();
  const now = Date.now();
  const hit = pool.queryCache.get(key);
  if (hit && hit.expiresAt > now) {
    pool.cacheHits += 1;
    return hit.value as T;
  }
  const value = computeFn();
  pool.queryCache.set(key, { value, expiresAt: now + ttlMs });
  return value;
}

// Convert "10:30" to minutes from midnight
function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export const salonDb = {
  getPoolStats() {
    const { db, indexes, pool } = acquirePooledDb();
    return {
      activeConnections: pool.activeConnections,
      totalQueriesExecuted: pool.totalQueriesExecuted,
      cacheHits: pool.cacheHits,
      indexedServices: indexes.servicesById.size,
      indexedMasters: indexes.mastersById.size,
      indexedAppointments: indexes.appointmentsByRef.size,
      totalAppointments: db.appointments.length,
    };
  },

  getSettings(): SalonSettings {
    const { db } = acquirePooledDb();
    return db.settings;
  },

  updateSettings(newSettings: Partial<SalonSettings>): SalonSettings {
    const { db } = acquirePooledDb();
    db.settings = { ...db.settings, ...newSettings };
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'admin',
      action: 'UPDATE_SETTINGS',
      details: 'Updated salon settings'
    });
    commitPooledDb(db);
    return db.settings;
  },

  getServices(): SalonService[] {
    const { db } = acquirePooledDb();
    return db.services;
  },

  getServiceById(serviceId: string): SalonService | null {
    const { indexes } = acquirePooledDb();
    return indexes.servicesById.get(serviceId) || null;
  },

  updateService(serviceId: string, updates: Partial<SalonService>): SalonService | null {
    const { db, indexes } = acquirePooledDb();
    const existing = indexes.servicesById.get(serviceId);
    if (!existing) return null;

    const idx = db.services.findIndex(s => s.id === serviceId);
    if (idx === -1) return null;
    db.services[idx] = { ...db.services[idx], ...updates };
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'admin',
      action: 'UPDATE_SERVICE',
      targetId: serviceId,
      details: `Updated service ${db.services[idx].name}`
    });
    commitPooledDb(db);
    return db.services[idx];
  },

  getMasters(): SalonMaster[] {
    const { db } = acquirePooledDb();
    return db.masters;
  },

  getMasterById(masterId: string): SalonMaster | null {
    const { indexes } = acquirePooledDb();
    return indexes.mastersById.get(masterId) || null;
  },

  updateMaster(masterId: string, updates: Partial<SalonMaster>): SalonMaster | null {
    const { db, indexes } = acquirePooledDb();
    if (!indexes.mastersById.has(masterId)) return null;

    const idx = db.masters.findIndex(m => m.id === masterId);
    if (idx === -1) return null;
    db.masters[idx] = { ...db.masters[idx], ...updates };
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'admin',
      action: 'UPDATE_MASTER',
      targetId: masterId,
      details: `Updated master ${db.masters[idx].name}`
    });
    commitPooledDb(db);
    return db.masters[idx];
  },

  getAppointments(): Appointment[] {
    const { db } = acquirePooledDb();
    return db.appointments;
  },

  /**
   * O(1) Indexed Lookup by Booking Reference
   */
  getAppointmentByReference(reference: string): Appointment | null {
    const { indexes } = acquirePooledDb();
    const cleanRef = reference.trim().toUpperCase();
    return indexes.appointmentsByRef.get(cleanRef) || null;
  },

  /**
   * O(1) Indexed Conflict Check using composite index `masterId::date`
   */
  hasConflict(masterId: string, date: string, time: string, durationMinutes: number): boolean {
    if (masterId === 'no-preference') return false;
    const { indexes } = acquirePooledDb();
    const bucket = indexes.appointmentsByMasterAndDate.get(`${masterId}::${date}`);
    if (!bucket || bucket.length === 0) return false;

    const reqStart = timeToMinutes(time);
    const reqEnd = reqStart + durationMinutes;

    return bucket.some(app => {
      if (app.status === 'CANCELLED' || app.status === 'REJECTED') return false;
      const appStart = timeToMinutes(app.appointmentTime);
      const appEnd = appStart + app.totalDurationMinutes;
      return Math.max(reqStart, appStart) < Math.min(reqEnd, appEnd);
    });
  },

  /**
   * Batch Slot Calculation with Query Caching (Eliminates N+1 slot queries)
   */
  getAvailableSlots(date: string, masterId: string = 'no-preference', duration: number = 30): string[] {
    const cacheKey = `slots:${date}:${masterId}:${duration}`;
    return getCachedQuery(cacheKey, 30_000, () => {
      const { db, indexes } = acquirePooledDb();
      const settings = db.settings;
      const [openH, openM] = settings.operatingHours.openTime.split(':').map(Number);
      const [closeH, closeM] = settings.operatingHours.closeTime.split(':').map(Number);

      const openMin = openH * 60 + openM;
      const closeMin = closeH * 60 + closeM;

      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      const isToday = date === todayStr;
      const currentMin = now.getHours() * 60 + now.getMinutes() + settings.minNoticeHours * 60;

      // Single O(1) index lookup for all appointments on this master + date
      const activeBookings =
        masterId === 'no-preference'
          ? []
          : (indexes.appointmentsByMasterAndDate.get(`${masterId}::${date}`) || []).filter(
              a => a.status !== 'CANCELLED' && a.status !== 'REJECTED'
            );

      const bookedIntervals = activeBookings.map(a => {
        const start = timeToMinutes(a.appointmentTime);
        return { start, end: start + a.totalDurationMinutes };
      });

      const candidateSlots: string[] = [];
      const interval = 30;

      for (let m = openMin; m + duration <= closeMin; m += interval) {
        if (isToday && m < currentMin) continue;

        const reqStart = m;
        const reqEnd = m + duration;
        const hasOverlap = bookedIntervals.some(
          b => Math.max(reqStart, b.start) < Math.min(reqEnd, b.end)
        );

        if (!hasOverlap) {
          const h = Math.floor(m / 60);
          const min = m % 60;
          candidateSlots.push(`${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`);
        }
      }

      return candidateSlots;
    });
  },

  /**
   * Create an appointment using O(1) Hash Index lookups (Zero N+1 queries)
   */
  createAppointment(payload: {
    customerType: Appointment['customerType'];
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    specialInstructions?: string;
    serviceIds: string[];
    masterId: string;
    appointmentDate: string;
    appointmentTime: string;
  }): { appointment: Appointment } | { error: string } {
    const { db, indexes } = acquirePooledDb();

    // 1. O(1) Map lookup for each selected service ID
    const matchedServices: SalonService[] = [];
    for (const id of payload.serviceIds) {
      const svc = indexes.servicesById.get(id);
      if (svc) matchedServices.push(svc);
    }

    if (matchedServices.length === 0) {
      return { error: 'Please select at least one valid service.' };
    }

    const serviceSnapshots = matchedServices.map(s => ({
      id: s.id,
      name: s.name,
      price: s.price ?? 0,
      durationMinutes: s.durationMinutes,
      categoryId: s.categoryId
    }));

    const totalDuration = serviceSnapshots.reduce((acc, s) => acc + s.durationMinutes, 0);
    const totalPrice = serviceSnapshots.reduce((acc, s) => acc + s.price, 0);

    // 2. O(1) Master lookup
    let finalMasterId = payload.masterId;
    let finalMasterName = 'No preference';
    if (finalMasterId !== 'no-preference') {
      const foundMaster = indexes.mastersById.get(finalMasterId);
      if (!foundMaster || !foundMaster.isAvailable) {
        return { error: 'The selected master is not currently available.' };
      }
      finalMasterName = foundMaster.name;

      if (this.hasConflict(finalMasterId, payload.appointmentDate, payload.appointmentTime, totalDuration)) {
        return { error: `Selected slot (${payload.appointmentTime}) is no longer available with ${finalMasterName}. Please choose another time or master.` };
      }
    } else {
      const eligible = db.masters.filter(m => m.isAvailable);
      const conflictFree = eligible.find(m => !this.hasConflict(m.id, payload.appointmentDate, payload.appointmentTime, totalDuration));
      if (conflictFree) {
        finalMasterId = conflictFree.id;
        finalMasterName = conflictFree.name;
      }
    }

    // 3. Generate unique reference e.g. "ANIQ-26-8392"
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const bookingReference = `ANIQ-${currentYear}-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: `app-${Date.now()}-${randomSuffix}`,
      bookingReference,
      customerType: payload.customerType,
      customerName: payload.customerName.trim(),
      customerPhone: payload.customerPhone.trim(),
      customerEmail: payload.customerEmail?.trim(),
      specialInstructions: payload.specialInstructions?.trim(),
      services: serviceSnapshots,
      masterId: finalMasterId,
      masterName: finalMasterName,
      appointmentDate: payload.appointmentDate,
      appointmentTime: payload.appointmentTime,
      totalDurationMinutes: totalDuration,
      totalPrice: totalPrice,
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.appointments.unshift(newAppointment);
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: payload.customerName,
      action: 'CREATE_APPOINTMENT',
      targetId: newAppointment.bookingReference,
      details: `Created appointment for ${payload.customerName} on ${payload.appointmentDate} at ${payload.appointmentTime}`
    });

    commitPooledDb(db);
    return { appointment: newAppointment };
  },

  updateAppointmentStatus(
    reference: string, 
    status: BookingStatus, 
    notes?: string, 
    cancellationReason?: string
  ): Appointment | null {
    const { db, indexes } = acquirePooledDb();
    const cleanRef = reference.trim().toUpperCase();
    const app = indexes.appointmentsByRef.get(cleanRef);
    if (!app) return null;

    app.status = status;
    app.updatedAt = new Date().toISOString();
    if (notes) app.statusNotes = notes;
    if (cancellationReason) app.cancellationReason = cancellationReason;

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'admin',
      action: 'UPDATE_STATUS',
      targetId: app.bookingReference,
      details: `Changed status to ${status}. Notes: ${notes || 'none'}`
    });

    commitPooledDb(db);
    return app;
  },

  rescheduleAppointment(reference: string, newDate: string, newTime: string): { appointment: Appointment } | { error: string } {
    const { db, indexes } = acquirePooledDb();
    const cleanRef = reference.trim().toUpperCase();
    const app = indexes.appointmentsByRef.get(cleanRef);
    if (!app) return { error: 'Appointment not found' };

    if (app.masterId !== 'no-preference' && this.hasConflict(app.masterId, newDate, newTime, app.totalDurationMinutes)) {
      return { error: 'The requested time slot is not available with the assigned master.' };
    }

    app.appointmentDate = newDate;
    app.appointmentTime = newTime;
    app.status = 'RESCHEDULED';
    app.updatedAt = new Date().toISOString();

    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'system',
      action: 'RESCHEDULE',
      targetId: app.bookingReference,
      details: `Rescheduled to ${newDate} at ${newTime}`
    });

    commitPooledDb(db);
    return { appointment: app };
  },

  getAuditLogs(): AuditLog[] {
    const { db } = acquirePooledDb();
    return db.auditLogs.slice(0, 100);
  }
};
