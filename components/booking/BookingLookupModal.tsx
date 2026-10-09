'use client';

import React, { useState } from 'react';
import { Appointment } from '@/lib/types/booking';
import { X, Search, Clock, Calendar, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { WhatsAppTemplates } from '@/lib/whatsapp';

interface BookingLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingLookupModal: React.FC<BookingLookupModalProps> = ({ isOpen, onClose }) => {
  const [referenceQuery, setReferenceQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceQuery.trim()) return;

    setLoading(true);
    setError('');
    setAppointment(null);

    try {
      const res = await fetch(`/api/appointments?ref=${encodeURIComponent(referenceQuery.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'No appointment found with this reference code.');
      } else {
        setAppointment(data.appointment);
      }
    } catch (err: any) {
      setError('Network error while searching appointment.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase">Confirmed</span>;
      case 'PENDING_CONFIRMATION':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase">Pending Confirmation</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs uppercase">Completed</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs uppercase">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 font-bold text-xs uppercase">{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-cream-50 rounded-3xl shadow-2xl border border-ivory-200 overflow-hidden flex flex-col p-6 text-charcoal"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-ivory-200 mb-5">
          <div>
            <h3 className="text-lg font-serif font-bold text-charcoal">
              Track Your Appointment
            </h3>
            <p className="text-xs text-charcoal-muted">
              Enter your booking reference code (e.g. ANIQ-26-XXXX)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-beige text-charcoal-muted hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLookup} className="space-y-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="e.g. ANIQ-26-4819"
              value={referenceQuery}
              onChange={e => setReferenceQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-beige bg-white text-sm font-mono uppercase text-charcoal focus:outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !referenceQuery.trim()}
            className="w-full py-2.5 rounded-xl bg-gold hover:bg-gold-hover text-charcoal font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            {loading ? 'Searching...' : 'Lookup Booking'}
          </button>
        </form>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {appointment && (
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
              <span className="font-mono font-bold text-sm text-charcoal">
                {appointment.bookingReference}
              </span>
              {getStatusBadge(appointment.status)}
            </div>

            <div className="grid grid-cols-2 gap-2 text-charcoal-muted">
              <div>
                <span className="block text-[10px] uppercase font-bold text-charcoal-muted">Customer</span>
                <span className="font-semibold text-charcoal">{appointment.customerName}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-charcoal-muted">Stylist / Master</span>
                <span className="font-semibold text-charcoal">{appointment.masterName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-charcoal-muted">
              <div>
                <span className="block text-[10px] uppercase font-bold text-charcoal-muted">Date & Time</span>
                <span className="font-semibold text-charcoal">{appointment.appointmentDate} • {appointment.appointmentTime}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-charcoal-muted">Estimated Total</span>
                <span className="font-bold text-gold">₹{appointment.totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-ivory-200">
              <span className="block text-[10px] uppercase font-bold text-charcoal-muted mb-1">Services</span>
              <ul className="space-y-1">
                {appointment.services.map((s, idx) => (
                  <li key={idx} className="flex justify-between text-charcoal">
                    <span>{s.name} ({s.durationMinutes}m)</span>
                    <span className="font-medium text-gold">₹{s.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions: WhatsApp Reschedule / Cancellation */}
            <div className="pt-3 border-t border-ivory-200 space-y-2">
              <a
                href={WhatsAppTemplates.rescheduleRequest(appointment.bookingReference, appointment.customerName)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-ivory-100 hover:bg-beige text-charcoal font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                Request Reschedule via WhatsApp
              </a>

              <a
                href={WhatsAppTemplates.cancellationRequest(appointment.bookingReference, appointment.customerName)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                Request Cancellation
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

