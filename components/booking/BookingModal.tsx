'use client';

import React, { useState, useEffect } from 'react';
import { 
  CustomerType, 
  SalonService, 
  SalonMaster, 
  Appointment 
} from '@/lib/types/booking';
import { SERVICE_CATEGORIES } from '@/lib/data/service-catalog';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Scissors
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId
}) => {
  // Steps: 1: Customer Type, 2: Services, 3: Master, 4: Date, 5: Time, 6: Details, 7: Review, 8: Success
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [customerType, setCustomerType] = useState<CustomerType>('men');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [selectedMasterId, setSelectedMasterId] = useState<string>('no-preference');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Loaded Catalog & Master Data
  const [services, setServices] = useState<SalonService[]>([]);
  const [masters, setMasters] = useState<SalonMaster[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Created Appointment
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);
  const [whatsAppUrl, setWhatsAppUrl] = useState<string>('');

  // Service Category Filter inside Modal
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Load Services & Masters on Mount
  useEffect(() => {
    async function loadData() {
      try {
        const [resServices, resMasters] = await Promise.all([
          fetch('/api/services').then(r => r.json()),
          fetch('/api/masters').then(r => r.json()),
        ]);

        if (resServices.success) setServices(resServices.services);
        if (resMasters.success) setMasters(resMasters.masters);
      } catch (err) {
        console.error('Failed to load services/masters:', err);
      }
    }
    loadData();
  }, []);

  // Handle preselected service
  useEffect(() => {
    if (preselectedServiceId && services.length > 0) {
      if (!selectedServiceIds.includes(preselectedServiceId)) {
        setSelectedServiceIds([preselectedServiceId]);
      }
    }
  }, [preselectedServiceId, services]);

  // Set default initial date to tomorrow or today if early
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [selectedDate]);

  // Calculate Running Total & Duration
  const selectedServices = services.filter(s => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + (s.price ?? 0), 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  // Fetch Available Slots when Date, Master, or Duration Changes
  useEffect(() => {
    if (currentStep === 5 && selectedDate) {
      const fetchSlots = async () => {
        setLoadingSlots(true);
        setErrorMessage('');
        try {
          const res = await fetch(
            `/api/slots?date=${selectedDate}&masterId=${selectedMasterId}&duration=${totalDuration || 30}`
          );
          const data = await res.json();
          if (data.success) {
            setAvailableSlots(data.slots || []);
            if (data.slots.length > 0 && !data.slots.includes(selectedTime)) {
              setSelectedTime(data.slots[0]);
            }
          } else {
            setErrorMessage(data.error || 'Unable to retrieve available slots');
          }
        } catch (err) {
          setErrorMessage('Network error fetching slots');
        } finally {
          setLoadingSlots(false);
        }
      };
      fetchSlots();
    }
  }, [currentStep, selectedDate, selectedMasterId, totalDuration, selectedTime]);

  if (!isOpen) return null;

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleCreateBooking = async () => {
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerType,
          customerName,
          customerPhone,
          customerEmail,
          specialInstructions,
          serviceIds: selectedServiceIds,
          masterId: selectedMasterId,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit appointment. Please try again.');
        setSubmitting(false);
        return;
      }

      setCreatedAppointment(data.appointment);
      setWhatsAppUrl(data.whatsAppUrl);
      setCurrentStep(8); // Success step
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#B76E79']
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error creating booking.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    setErrorMessage('');
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (selectedServiceIds.length === 0) {
        setErrorMessage('Please select at least one service to proceed.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!selectedDate) {
        setErrorMessage('Please pick an appointment date.');
        return;
      }
      setCurrentStep(5);
    } else if (currentStep === 5) {
      if (!selectedTime) {
        setErrorMessage('Please select an available time slot.');
        return;
      }
      setCurrentStep(6);
    } else if (currentStep === 6) {
      if (!customerName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        setErrorMessage('Please enter a valid 10-digit mobile number.');
        return;
      }
      setCurrentStep(7);
    } else if (currentStep === 7) {
      handleCreateBooking();
    }
  };

  const handlePrev = () => {
    setErrorMessage('');
    if (currentStep > 1 && currentStep < 8) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Filter services by customer type and category
  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategoryFilter === 'all' || service.categoryId === activeCategoryFilter;
    const matchesCustomer = !service.suitableFor || service.suitableFor.includes(customerType);
    return matchesCategory && matchesCustomer;
  });

  const selectedMaster = masters.find(m => m.id === selectedMasterId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-cream-50 rounded-3xl shadow-2xl border border-ivory-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* --- HEADER --- */}
        <div className="bg-cream-100 border-b border-ivory-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold border border-gold/30">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-charcoal">
                Book Your Experience
              </h2>
              <p className="text-xs text-charcoal-muted">
                ANIQ Unisex Beauty Salon & Tattoo • West Marredpally
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2 rounded-full hover:bg-beige text-charcoal-muted hover:text-charcoal transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- PROGRESS BAR (Steps 1 to 7) --- */}
        {currentStep < 8 && (
          <div className="bg-ivory-100 px-6 py-2 border-b border-ivory-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-medium text-charcoal">
              <span className="w-5 h-5 rounded-full bg-gold text-charcoal font-bold flex items-center justify-center text-[10px]">
                {currentStep}
              </span>
              <span>
                {currentStep === 1 && 'Select Customer Profile'}
                {currentStep === 2 && 'Choose Services'}
                {currentStep === 3 && 'Select Master'}
                {currentStep === 4 && 'Pick Date'}
                {currentStep === 5 && 'Choose Slot'}
                {currentStep === 6 && 'Your Information'}
                {currentStep === 7 && 'Review & Confirm'}
              </span>
            </div>
            <span className="text-charcoal-muted text-[11px] font-mono">
              Step {currentStep} of 7
            </span>
          </div>
        )}

        {/* --- BODY CONTENT --- */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* === STEP 1: CUSTOMER TYPE === */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-6">
                <h3 className="text-xl font-serif font-bold text-charcoal mb-1">
                  Who is this appointment for?
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Choose the category to view curated services and specialized masters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    type: 'men',
                    title: "Men's Grooming",
                    desc: 'Haircuts, fades, beard sculpting, hair spa and facials'
                  },
                  {
                    type: 'women',
                    title: "Women's Beauty & Styling",
                    desc: 'Haute hair styling, bridal facials, detan and nail rituals'
                  },
                  {
                    type: 'kids',
                    title: "Kids' Grooming",
                    desc: 'Patient, gentle haircut styling for boys and girls'
                  },
                  {
                    type: 'tattoo',
                    title: "Tattoo Studio Consultation",
                    desc: 'Custom ink stencils, fine-line and sterile consultations'
                  }
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => setCustomerType(item.type as CustomerType)}
                    className={`p-4.5 rounded-2xl border text-left transition-all ${
                      customerType === item.type
                        ? 'border-gold bg-gold/10 shadow-luxury'
                        : 'border-ivory-200 bg-white hover:border-beige hover:bg-cream-100/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-serif font-bold text-charcoal text-base">
                        {item.title}
                      </h4>
                      {customerType === item.type && (
                        <div className="w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === STEP 2: SELECT SERVICES === */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-serif font-bold text-charcoal">
                    Select Your Services
                  </h3>
                  <p className="text-xs text-charcoal-muted">
                    Pick one or multiple services. Running duration and price calculate automatically.
                  </p>
                </div>
                {selectedServiceIds.length > 0 && (
                  <div className="text-right">
                    <span className="text-xs text-charcoal-muted">Total: </span>
                    <span className="text-base font-bold text-gold">₹{totalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-charcoal-muted"> ({totalDuration} mins)</span>
                  </div>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
                <button
                  onClick={() => setActiveCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                    activeCategoryFilter === 'all'
                      ? 'bg-charcoal text-white font-medium'
                      : 'bg-white border border-ivory-200 text-charcoal hover:border-beige'
                  }`}
                >
                  All ({filteredServices.length})
                </button>
                {SERVICE_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                      activeCategoryFilter === cat.id
                        ? 'bg-gold text-charcoal font-semibold'
                        : 'bg-white border border-ivory-200 text-charcoal hover:border-beige'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Services List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {filteredServices.map(service => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-gold bg-gold/10 shadow-sm'
                          : 'border-ivory-200 bg-white hover:border-beige'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-charcoal leading-snug">
                            {service.name}
                          </h4>
                          <span className="text-sm font-bold text-gold whitespace-nowrap">
                            {service.priceDisplay}
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-muted line-clamp-2 mb-2">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-ivory-200/60">
                        <span className="text-charcoal-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" />
                          {service.durationMinutes} mins
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-gold border-gold text-charcoal' : 'border-beige bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* === STEP 3: CHOOSE MASTER === */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-4">
                <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                  Choose Your Master
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Select a specific professional or let us assign the best available specialist for your services.
                </p>
              </div>

              {/* Option 1: No Preference */}
              <button
                onClick={() => setSelectedMasterId('no-preference')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                  selectedMasterId === 'no-preference'
                    ? 'border-gold bg-gold/10 shadow-luxury'
                    : 'border-ivory-200 bg-white hover:border-beige'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-cream-200 flex items-center justify-center text-gold border border-gold/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm">
                      No Preference (Recommended)
                    </h4>
                    <p className="text-xs text-charcoal-muted">
                      We will assign an eligible, available master with zero wait time.
                    </p>
                  </div>
                </div>
                {selectedMasterId === 'no-preference' && (
                  <div className="w-5 h-5 rounded-full bg-gold text-charcoal flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Master Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {masters.map(master => {
                  const isSelected = selectedMasterId === master.id;
                  return (
                    <button
                      key={master.id}
                      onClick={() => setSelectedMasterId(master.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-gold bg-gold/10 shadow-luxury'
                          : 'border-ivory-200 bg-white hover:border-beige'
                      }`}
                    >
                      <img
                        src={master.photo}
                        alt={master.name}
                        className="w-12 h-12 rounded-xl object-cover border border-ivory-200 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-charcoal text-sm truncate">
                            {master.name}
                          </h4>
                          <span className="text-[11px] font-bold text-gold flex items-center gap-0.5">
                            ★ {master.rating}
                          </span>
                        </div>
                        <p className="text-[11px] text-charcoal-muted truncate mb-1">
                          {master.role}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {master.specialisations.slice(0, 2).map((s, i) => (
                            <span key={i} className="text-[9px] bg-ivory-100 text-charcoal px-1.5 py-0.5 rounded border border-ivory-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* === STEP 4: SELECT DATE === */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-4">
                <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                  Select Appointment Date
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Open 7 days a week: 10:00 AM to 9:00 PM. Book up to 30 days in advance.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-4">
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
                  Choose Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-beige bg-cream-50 text-charcoal font-medium text-sm focus:outline-none focus:border-gold"
                />

                <div className="p-3 rounded-xl bg-ivory-50 border border-ivory-200 text-xs text-charcoal-muted flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-charcoal">Same-Day Bookings: </span>
                    Require a minimum 2-hour notice window. Contact WhatsApp for immediate walk-in status.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === STEP 5: SELECT TIME SLOT === */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-4">
                <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                  Select Available Time Slot
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Date: <span className="font-semibold text-charcoal">{selectedDate}</span> • Total Duration: <span className="font-semibold text-gold">{totalDuration} mins</span>
                </p>
              </div>

              {loadingSlots ? (
                <div className="py-12 text-center text-charcoal-muted text-xs">
                  <Clock className="w-6 h-6 text-gold animate-spin mx-auto mb-2" />
                  Checking real-time master schedule availability...
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center max-w-md mx-auto">
                  <p className="text-xs font-semibold text-amber-800 mb-2">
                    No open slots available for this date and duration.
                  </p>
                  <p className="text-[11px] text-amber-700 mb-3">
                    Try choosing a different date or select "No Preference" for the master.
                  </p>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-4 py-2 bg-amber-800 text-white rounded-lg text-xs font-medium"
                  >
                    Change Date
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 max-h-[300px] overflow-y-auto p-1">
                  {availableSlots.map(timeStr => {
                    const isSelected = selectedTime === timeStr;
                    return (
                      <button
                        key={timeStr}
                        onClick={() => setSelectedTime(timeStr)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          isSelected
                            ? 'bg-gold border-gold text-charcoal font-bold shadow-sm'
                            : 'bg-white border-ivory-200 text-charcoal hover:border-gold/50'
                        }`}
                      >
                        {timeStr}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* === STEP 6: CUSTOMER DETAILS === */}
          {currentStep === 6 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="text-center mb-4">
                <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                  Your Contact Details
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Used exclusively to generate your official booking reference and WhatsApp confirmation.
                </p>
              </div>

              <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm">
                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Full Name <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="e.g. Vikram Joshi"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-charcoal text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Mobile Number (WhatsApp Preferred) <span className="text-gold">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 99124 17109"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-charcoal text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={customerEmail}
                      onChange={e => setCustomerEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-charcoal text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal mb-1">
                    Special Instructions / Hair / Skin Notes (Optional)
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive scalp, bridal consultation, tattoo reference"
                      value={specialInstructions}
                      onChange={e => setSpecialInstructions(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-beige bg-cream-50 text-charcoal text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === STEP 7: REVIEW BOOKING === */}
          {currentStep === 7 && (
            <div className="space-y-4 max-w-lg mx-auto">
              <div className="text-center mb-2">
                <h3 className="text-lg font-serif font-bold text-charcoal mb-1">
                  Review Your Appointment Summary
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Please review your selections before creating the appointment record.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-4 text-xs">
                {/* Customer */}
                <div className="flex justify-between pb-3 border-b border-ivory-200">
                  <span className="text-charcoal-muted">Customer Name:</span>
                  <span className="font-semibold text-charcoal">{customerName}</span>
                </div>

                {/* Phone */}
                <div className="flex justify-between pb-3 border-b border-ivory-200">
                  <span className="text-charcoal-muted">Mobile Number:</span>
                  <span className="font-semibold text-charcoal">{customerPhone}</span>
                </div>

                {/* Date & Time */}
                <div className="flex justify-between pb-3 border-b border-ivory-200">
                  <span className="text-charcoal-muted">Date & Time:</span>
                  <span className="font-semibold text-charcoal">
                    {selectedDate} at {selectedTime} ({totalDuration} mins)
                  </span>
                </div>

                {/* Master */}
                <div className="flex justify-between pb-3 border-b border-ivory-200">
                  <span className="text-charcoal-muted">Stylist / Master:</span>
                  <span className="font-semibold text-charcoal">
                    {selectedMaster ? selectedMaster.name : 'No preference (Best available assigned)'}
                  </span>
                </div>

                {/* Services Snapshot */}
                <div className="pb-3 border-b border-ivory-200 space-y-2">
                  <span className="text-charcoal-muted block font-semibold">Selected Services:</span>
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex justify-between pl-2">
                      <span className="text-charcoal">{s.name} ({s.durationMinutes}m)</span>
                      <span className="font-semibold text-gold">₹{(s.price ?? 0).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>

                {/* Estimated Total */}
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="font-bold text-charcoal">Estimated Total:</span>
                  <span className="text-lg font-serif font-bold text-gold">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Salon Policy Note */}
                <div className="p-3 bg-ivory-50 rounded-xl text-[11px] text-charcoal-muted border border-ivory-200 leading-relaxed">
                  <span className="font-semibold text-charcoal">Policy Note: </span>
                  Appointments are created in <span className="font-semibold text-gold">PENDING_CONFIRMATION</span> status. In Step 9, you will be invited to confirm via WhatsApp with our salon reception desk.
                </div>
              </div>
            </div>
          )}

          {/* === STEP 8: SUCCESS & WHATSAPP CONFIRMATION === */}
          {currentStep === 8 && createdAppointment && (
            <div className="text-center py-4 space-y-5 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold">
                  Appointment Created Successfully
                </span>
                <h3 className="text-2xl font-serif font-bold text-charcoal mt-1">
                  {createdAppointment.bookingReference}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Save this reference code to track or reschedule your visit.
                </p>
              </div>

              {/* Status Box */}
              <div className="bg-white p-4.5 rounded-2xl border border-ivory-200 shadow-sm text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Initial Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase text-[10px]">
                    {createdAppointment.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Date & Time:</span>
                  <span className="font-semibold text-charcoal">
                    {createdAppointment.appointmentDate} • {createdAppointment.appointmentTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Master:</span>
                  <span className="font-semibold text-charcoal">{createdAppointment.masterName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal-muted">Estimated Total:</span>
                  <span className="font-bold text-gold text-sm">
                    ₹{createdAppointment.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Step 9 Action: WhatsApp click-to-chat */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5" />
                  Confirm on WhatsApp (+91 99124 17109)
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-charcoal-muted hover:text-charcoal font-medium"
                >
                  Return to Website
                </button>
              </div>

              <p className="text-[11px] text-charcoal-muted max-w-sm mx-auto">
                Opening WhatsApp does not finalize confirmation automatically. Our salon desk will verify stylist availability and reply with your confirmed token.
              </p>
            </div>
          )}
        </div>

        {/* --- FOOTER BUTTONS --- */}
        {currentStep < 8 && (
          <div className="bg-cream-100 border-t border-ivory-200 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-charcoal ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-beige'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-hover text-charcoal font-bold text-xs uppercase tracking-wider shadow-gold hover:shadow-lg transition-all"
            >
              {submitting ? (
                'Processing...'
              ) : currentStep === 7 ? (
                'Confirm & Book Now'
              ) : (
                <>
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

