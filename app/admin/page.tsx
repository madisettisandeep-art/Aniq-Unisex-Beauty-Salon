'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { AniqLogo } from '@/components/brand/AniqLogo';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Appointment, BookingStatus, SalonMaster, SalonService, SalonSettings } from '@/lib/types/booking';
import { 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Edit3, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  ArrowLeft,
  RefreshCw,
  Phone,
  MessageSquare
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin Data State
  const [activeTab, setActiveTab] = useState<'appointments' | 'masters' | 'services' | 'settings'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [masters, setMasters] = useState<SalonMaster[]>([]);
  const [services, setServices] = useState<SalonService[]>([]);
  const [settings, setSettings] = useState<SalonSettings | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Action Modal State
  const [selectedApp, setSelectedApp] = useState<Appointment | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchAdminData = async () => {
    setLoadingData(true);
    try {
      const [resApp, resSet] = await Promise.all([
        fetch('/api/admin/appointments'),
        fetch('/api/admin/settings'),
      ]);

      const dataApp = await resApp.json();
      const dataSet = await resSet.json();

      if (dataApp.success) setAppointments(dataApp.appointments || []);
      if (dataSet.success) {
        setSettings(dataSet.settings);
        setServices(dataSet.services || []);
        setMasters(dataSet.masters || []);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Invalid credentials');
      } else {
        setIsAuthenticated(true);
        fetchAdminData();
      }
    } catch (err: any) {
      setLoginError('Network error during login');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleStatusChange = async (reference: string, newStatus: BookingStatus) => {
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          status: newStatus,
          notes: actionNotes
        })
      });

      const data = await res.json();
      if (data.success) {
        setSelectedApp(null);
        setActionNotes('');
        fetchAdminData();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating status');
    } finally {
      setUpdating(false);
    }
  };

  const handleToggleMasterAvailability = async (masterId: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: 'master',
          data: {
            masterId,
            updates: { isAvailable: !currentStatus }
          }
        })
      });
      fetchAdminData();
    } catch (err) {
      alert('Failed to update master');
    }
  };

  const debouncedSearch = useDebounce(searchQuery, 250);

  // Compute all dashboard metrics in a single O(N) memoized pass
  const { todayCount, pendingCount, confirmedCount, completedCount, totalRevenue } = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    let today = 0;
    let pending = 0;
    let confirmed = 0;
    let completed = 0;
    let revenue = 0;

    for (const a of appointments) {
      if (a.appointmentDate === todayStr) today++;
      if (a.status === 'PENDING_CONFIRMATION') pending++;
      if (a.status === 'CONFIRMED') {
        confirmed++;
        revenue += a.totalPrice;
      } else if (a.status === 'COMPLETED') {
        completed++;
        revenue += a.totalPrice;
      }
    }

    return {
      todayCount: today,
      pendingCount: pending,
      confirmedCount: confirmed,
      completedCount: completed,
      totalRevenue: revenue,
    };
  }, [appointments]);

  // Memoized & Debounced Filtered Appointments
  const filteredAppointments = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    return appointments.filter(a => {
      const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
      if (!matchesStatus) return false;
      if (!q) return true;
      return (
        a.bookingReference.toLowerCase().includes(q) ||
        a.customerName.toLowerCase().includes(q) ||
        a.customerPhone.includes(q)
      );
    });
  }, [appointments, debouncedSearch, statusFilter]);

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-cream-100">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-ivory-200 shadow-2xl text-charcoal">
          <div className="text-center mb-6">
            <AniqLogo variant="gold" className="h-12 mx-auto mb-3" showTagline={false} />
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-gold/15 px-3 py-1 rounded-full border border-gold/30">
              Administrative Control
            </span>
            <h1 className="text-2xl font-serif font-bold text-charcoal mt-3">
              ANIQ Salon Portal
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              West Marredpally Staff & Management Authentication
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-sm text-charcoal focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Security Password
              </label>
              <input
                type="password"
                placeholder="Enter password (AniqSalon@2026)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-sm text-charcoal focus:outline-none focus:border-gold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-gold hover:bg-gold-hover text-charcoal font-bold text-xs uppercase tracking-wider shadow-gold transition-all"
            >
              {loginLoading ? 'Authenticating...' : 'Enter Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-ivory-200 text-center">
            <Link
              href="/"
              className="text-xs text-charcoal-muted hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Public Salon Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-cream-50 flex flex-col text-charcoal">
      {/* Top Admin Nav */}
      <header className="bg-charcoal text-white px-6 py-4 border-b border-gold/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <AniqLogo variant="gold" className="h-9" showTagline={false} />
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold hidden sm:inline">
            Salon Control Dashboard
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-cream-200 hover:text-white transition-colors hidden md:inline"
          >
            View Live Site
          </Link>

          <button
            onClick={fetchAdminData}
            title="Refresh Data"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream-100"
          >
            <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-900/40 text-cream-100 hover:text-red-200 text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider block">Today's Visits</span>
            <span className="text-2xl font-serif font-bold text-charcoal mt-1 block">{todayCount}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/40 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">Pending Review</span>
            <span className="text-2xl font-serif font-bold text-amber-700 mt-1 block">{pendingCount}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/40 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">Confirmed</span>
            <span className="text-2xl font-serif font-bold text-emerald-700 mt-1 block">{confirmedCount}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
            <span className="text-[10px] uppercase font-bold text-charcoal-muted tracking-wider block">Completed</span>
            <span className="text-2xl font-serif font-bold text-charcoal mt-1 block">{completedCount}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gold/40 bg-gold/5 shadow-sm col-span-2 md:col-span-1">
            <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Projected Revenue</span>
            <span className="text-2xl font-serif font-bold text-gold mt-1 block">₹{totalRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-ivory-200 text-xs font-semibold uppercase tracking-wider space-x-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'appointments'
                ? 'border-gold text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('masters')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'masters'
                ? 'border-gold text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Stylists & Masters ({masters.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'services'
                ? 'border-gold text-charcoal'
                : 'border-transparent text-charcoal-muted hover:text-charcoal'
            }`}
          >
            Service Menu ({services.length})
          </button>
        </div>

        {/* TAB 1: APPOINTMENTS MANAGEMENT */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-ivory-200">
              <div className="relative w-full sm:max-w-xs">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search reference, customer, phone..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 rounded-xl border border-beige bg-cream-50 text-xs text-charcoal focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-2 self-end text-xs">
                <span className="text-charcoal-muted font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="bg-cream-50 border border-beige rounded-xl px-3 py-2 text-charcoal font-medium text-xs focus:outline-none focus:border-gold"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING_CONFIRMATION">Pending Confirmation</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] tracking-wider border-b border-ivory-200">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Services</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Master</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-charcoal-muted">
                          No appointment records found.
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map(app => (
                        <tr key={app.id} className="hover:bg-cream-50/60 transition-colors">
                          <td className="p-4 font-mono font-bold text-charcoal">
                            {app.bookingReference}
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-charcoal">{app.customerName}</div>
                            <div className="text-[11px] text-charcoal-muted">{app.customerPhone}</div>
                          </td>
                          <td className="p-4 max-w-[200px]">
                            <div className="truncate text-charcoal" title={app.services.map(s => s.name).join(', ')}>
                              {app.services.map(s => s.name).join(', ')}
                            </div>
                            <div className="text-[10px] text-charcoal-muted">{app.totalDurationMinutes} mins</div>
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <div className="font-medium text-charcoal">{app.appointmentDate}</div>
                            <div className="text-[11px] text-gold font-bold">{app.appointmentTime}</div>
                          </td>
                          <td className="p-4 text-charcoal font-medium">
                            {app.masterName}
                          </td>
                          <td className="p-4 font-bold text-gold">
                            ₹{app.totalPrice.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              app.status === 'CONFIRMED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'PENDING_CONFIRMATION'
                                ? 'bg-amber-100 text-amber-800'
                                : app.status === 'COMPLETED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {app.status === 'PENDING_CONFIRMATION' && (
                                <button
                                  onClick={() => handleStatusChange(app.bookingReference, 'CONFIRMED')}
                                  title="Confirm Appointment"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase"
                                >
                                  Confirm
                                </button>
                              )}
                              {app.status === 'CONFIRMED' && (
                                <button
                                  onClick={() => handleStatusChange(app.bookingReference, 'COMPLETED')}
                                  title="Mark as Completed"
                                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => setSelectedApp(app)}
                                className="p-1.5 rounded-lg border border-beige hover:bg-beige text-charcoal"
                                title="Manage Details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MASTERS MANAGEMENT */}
        {activeTab === 'masters' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {masters.map(m => (
              <div key={m.id} className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm flex items-start gap-4">
                <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-2xl object-cover border border-ivory-200" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-sm text-charcoal">{m.name}</h3>
                    <button
                      onClick={() => handleToggleMasterAvailability(m.id, m.isAvailable)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        m.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {m.isAvailable ? 'Available' : 'On Leave'}
                    </button>
                  </div>
                  <p className="text-xs text-charcoal-muted mb-2">{m.role}</p>
                  <p className="text-[11px] text-charcoal-muted">Hours: {m.workingHours.start} – {m.workingHours.end}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {m.specialisations.map((s, i) => (
                      <span key={i} className="text-[9px] bg-ivory-100 text-charcoal px-2 py-0.5 rounded border border-ivory-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: SERVICES MENU */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-2xl border border-ivory-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-ivory-200 flex justify-between items-center text-xs">
              <span className="font-semibold text-charcoal">Authoritative Service Catalogue ({services.length} items)</span>
              <span className="text-charcoal-muted">Sourced from verified Gents Menu</span>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-100 text-charcoal-muted uppercase text-[10px] tracking-wider border-b border-ivory-200 sticky top-0">
                  <tr>
                    <th className="p-3">Service Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price (INR)</th>
                    <th className="p-3">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-100">
                  {services.map(s => (
                    <tr key={s.id} className="hover:bg-cream-50">
                      <td className="p-3 font-semibold text-charcoal">{s.name}</td>
                      <td className="p-3 uppercase text-[10px] text-charcoal-muted">{s.categoryId}</td>
                      <td className="p-3 font-bold text-gold">{s.priceDisplay}</td>
                      <td className="p-3 text-charcoal-muted">{s.durationMinutes} mins</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Action Dialog for Selected Appointment */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-md">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-ivory-200 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-ivory-200">
              <h3 className="font-bold text-charcoal text-sm">
                Manage {selectedApp.bookingReference}
              </h3>
              <button onClick={() => setSelectedApp(null)} className="text-charcoal-muted hover:text-charcoal">
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              <p><span className="text-charcoal-muted">Customer:</span> <strong className="text-charcoal">{selectedApp.customerName}</strong></p>
              <p><span className="text-charcoal-muted">Phone:</span> <strong className="text-charcoal">{selectedApp.customerPhone}</strong></p>
              <p><span className="text-charcoal-muted">Slot:</span> <strong>{selectedApp.appointmentDate} at {selectedApp.appointmentTime}</strong></p>
              <p><span className="text-charcoal-muted">Master:</span> <strong>{selectedApp.masterName}</strong></p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-charcoal mb-1">Internal Notes / Reason:</label>
              <textarea
                rows={2}
                value={actionNotes}
                onChange={e => setActionNotes(e.target.value)}
                placeholder="e.g. Confirmed via phone call"
                className="w-full p-2.5 rounded-xl border border-beige bg-cream-50 text-xs focus:outline-none focus:border-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => handleStatusChange(selectedApp.bookingReference, 'CONFIRMED')}
                disabled={updating}
                className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold uppercase text-[10px]"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => handleStatusChange(selectedApp.bookingReference, 'REJECTED')}
                disabled={updating}
                className="py-2.5 rounded-xl bg-red-600 text-white font-bold uppercase text-[10px]"
              >
                Reject Slot
              </button>
              <button
                onClick={() => handleStatusChange(selectedApp.bookingReference, 'CANCELLED')}
                disabled={updating}
                className="py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium uppercase text-[10px]"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => handleStatusChange(selectedApp.bookingReference, 'COMPLETED')}
                disabled={updating}
                className="py-2.5 rounded-xl bg-blue-600 text-white font-bold uppercase text-[10px]"
              >
                Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

