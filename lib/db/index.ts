import fs from 'fs';
import path from 'path';
import { Appointment, BookingStatus, SalonMaster, SalonService, SalonSettings } from '../types/booking';
import { SERVICE_CATALOG } from '../data/service-catalog';
import { SALON_MASTERS } from '../data/masters';
import { SALON_STATS } from '../data/reviews';

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

function ensureDbFile(): SalonDatabase {
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
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw) as SalonDatabase;
  } catch (err) {
    console.error('Error reading salon-db.json, recreating fallback:', err);
    const initialDb: SalonDatabase = {
      settings: DEFAULT_SETTINGS,
      services: SERVICE_CATALOG,
      masters: SALON_MASTERS,
      appointments: [],
      auditLogs: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
}

function saveDb(db: SalonDatabase) {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  // Atomic write via temp file
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// Convert "10:30" to minutes from midnight
function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

export const salonDb = {
  getSettings(): SalonSettings {
    const db = ensureDbFile();
    return db.settings;
  },

  updateSettings(newSettings: Partial<SalonSettings>): SalonSettings {
    const db = ensureDbFile();
    db.settings = { ...db.settings, ...newSettings };
    db.auditLogs.unshift({
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'admin',
      action: 'UPDATE_SETTINGS',
      details: 'Updated salon settings'
    });
    saveDb(db);
    return db.settings;
  },

  getServices(): SalonService[] {
    const db = ensureDbFile();
    return db.services;
  },

  updateService(serviceId: string, updates: Partial<SalonService>): SalonService | null {
    const db = ensureDbFile();
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
    saveDb(db);
    return db.services[idx];
  },

  getMasters(): SalonMaster[] {
    const db = ensureDbFile();
    return db.masters;
  },

  updateMaster(masterId: string, updates: Partial<SalonMaster>): SalonMaster | null {
    const db = ensureDbFile();
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
    saveDb(db);
    return db.masters[idx];
  },

  getAppointments(): Appointment[] {
    const db = ensureDbFile();
    return db.appointments;
  },

  getAppointmentByReference(reference: string): Appointment | null {
    const db = ensureDbFile();
    const cleanRef = reference.trim().toUpperCase();
    return db.appointments.find(a => a.bookingReference.toUpperCase() === cleanRef) || null;
  },

  /**
   * Check if a master has an overlapping booking at the given date and time window
   */
  hasConflict(masterId: string, date: string, time: string, durationMinutes: number): boolean {
    if (masterId === 'no-preference') return false;
    const db = ensureDbFile();
    const reqStart = timeToMinutes(time);
    const reqEnd = reqStart + durationMinutes;

    return db.appointments.some(app => {
      if (app.masterId !== masterId) return false;
      if (app.appointmentDate !== date) return false;
      // Exclude cancelled and rejected
      if (app.status === 'CANCELLED' || app.status === 'REJECTED') return false;

      const appStart = timeToMinutes(app.appointmentTime);
      const appEnd = appStart + app.totalDurationMinutes;

      // Overlap condition
      return Math.max(reqStart, appStart) < Math.min(reqEnd, appEnd);
    });
  },

  /**
   * Create an appointment with conflict verification and immutable snapshot
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
    const db = ensureDbFile();

    // 1. Resolve selected services and snapshot them
    const matchedServices = db.services.filter(s => payload.serviceIds.includes(s.id));
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

    // 2. Resolve Master Name
    let finalMasterId = payload.masterId;
    let finalMasterName = 'No preference';
    if (finalMasterId !== 'no-preference') {
      const foundMaster = db.masters.find(m => m.id === finalMasterId);
      if (!foundMaster || !foundMaster.isAvailable) {
        return { error: 'The selected master is not currently available.' };
      }
      finalMasterName = foundMaster.name;

      // Check conflict
      if (this.hasConflict(finalMasterId, payload.appointmentDate, payload.appointmentTime, totalDuration)) {
        return { error: `Selected slot (${payload.appointmentTime}) is no longer available with ${finalMasterName}. Please choose another time or master.` };
      }
    } else {
      // Find an eligible available master who has no conflict
      const eligible = db.masters.filter(m => m.isAvailable);
      const conflictFree = eligible.find(m => !this.hasConflict(m.id, payload.appointmentDate, payload.appointmentTime, totalDuration));
      if (conflictFree) {
        finalMasterId = conflictFree.id;
        finalMasterName = conflictFree.name;
      }
    }

    // 3. Generate human-readable reference e.g. "ANIQ-26-8392"
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

    saveDb(db);
    return { appointment: newAppointment };
  },

  updateAppointmentStatus(
    reference: string, 
    status: BookingStatus, 
    notes?: string, 
    cancellationReason?: string
  ): Appointment | null {
    const db = ensureDbFile();
    const cleanRef = reference.trim().toUpperCase();
    const app = db.appointments.find(a => a.bookingReference.toUpperCase() === cleanRef);
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

    saveDb(db);
    return app;
  },

  rescheduleAppointment(reference: string, newDate: string, newTime: string): { appointment: Appointment } | { error: string } {
    const db = ensureDbFile();
    const cleanRef = reference.trim().toUpperCase();
    const app = db.appointments.find(a => a.bookingReference.toUpperCase() === cleanRef);
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

    saveDb(db);
    return { appointment: app };
  },

  getAuditLogs(): AuditLog[] {
    const db = ensureDbFile();
    return db.auditLogs.slice(0, 100);
  }
};

