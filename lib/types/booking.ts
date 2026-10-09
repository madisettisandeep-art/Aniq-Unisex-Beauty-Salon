export type CustomerType = 'men' | 'women' | 'kids' | 'tattoo';

export type ServiceCategoryId = 
  | 'grooming'
  | 'hair-styling'
  | 'hair-colour'
  | 'facials'
  | 'detan'
  | 'clean-ups'
  | 'manicure'
  | 'pedicure'
  | 'head-massage'
  | 'hair-spa'
  | 'tattoo';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  iconName: string;
  description: string;
}

export interface SalonService {
  id: string;
  name: string;
  categoryId: ServiceCategoryId;
  price: number | null; // null means "Price to be confirmed" / "Contact us"
  priceDisplay: string;
  durationMinutes: number;
  description: string;
  suitableFor?: CustomerType[];
  image?: string;
  isPopular?: boolean;
  isVerifiedPrice: boolean;
}

export interface SalonMaster {
  id: string;
  name: string;
  role: string;
  photo: string;
  specialisations: string[];
  rating: number;
  reviewsCount: number;
  experienceYears?: number;
  supportedServiceIds: string[]; // empty means all supported
  workingHours: {
    start: string; // e.g. "10:00"
    end: string;   // e.g. "21:00"
  };
  availableDays: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  isAvailable: boolean;
}

export type BookingStatus = 
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'REJECTED'
  | 'RESCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface ServiceSnapshot {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  categoryId: string;
}

export interface Appointment {
  id: string;
  bookingReference: string; // e.g. "ANIQ-26-4819"
  customerType: CustomerType;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  specialInstructions?: string;
  services: ServiceSnapshot[];
  masterId: string; // 'no-preference' or master ID
  masterName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:mm
  totalDurationMinutes: number;
  totalPrice: number;
  status: BookingStatus;
  statusNotes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalonSettings {
  brandName: string;
  tagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  googleRating: number;
  googleReviewCount: number;
  instagramUrl: string;
  mapsUrl: string;
  operatingHours: {
    openTime: string;
    closeTime: string;
    operatingDays: string;
  };
  minNoticeHours: number;
  maxAdvanceBookingDays: number;
  cancellationPolicy: string;
}

