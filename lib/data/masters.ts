import { SalonMaster } from '../types/booking';

export const SALON_MASTERS: SalonMaster[] = [
  {
    id: 'master-01',
    name: 'Sameer Khan',
    role: 'Senior Master Stylist & Grooming Lead',
    photo: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    specialisations: ['Precision Scissor Cuts', 'Executive Beard Sculpting', 'Hair Keratin', 'Hair Spa'],
    rating: 4.9,
    reviewsCount: 42,
    experienceYears: 8,
    supportedServiceIds: [], // supports all
    workingHours: {
      start: '10:00',
      end: '21:00'
    },
    availableDays: [1, 2, 3, 4, 5, 6, 0], // Mon-Sun
    isAvailable: true
  },
  {
    id: 'master-02',
    name: 'Priya Sharma',
    role: 'Senior Aesthetician & Skin Specialist',
    photo: '/images/high_res/reel_11_beauty_care.jpg',
    specialisations: ['O3+ Bridal Facials', 'Hydra Facial Therapies', 'Detan Rituals', 'Luxury Clean-ups'],
    rating: 4.8,
    reviewsCount: 38,
    experienceYears: 7,
    supportedServiceIds: ['f-01', 'f-02', 'f-03', 'f-04', 'f-05', 'f-06', 'f-07', 'f-08', 'f-09', 'f-10', 'f-11', 'f-12', 'f-13', 'f-14', 'f-15', 'c-01', 'c-02', 'c-03', 'c-04', 'c-05', 'c-06', 'c-07', 'd-01', 'd-02', 'd-03', 'd-04', 'd-05', 'd-06', 'd-07', 'd-08', 'd-09'],
    workingHours: {
      start: '10:30',
      end: '20:30'
    },
    availableDays: [1, 2, 3, 4, 5, 6, 0],
    isAvailable: true
  },
  {
    id: 'master-03',
    name: 'Karthik Reddy',
    role: 'Master Colorist & Spa Director',
    photo: '/images/high_res/post_02_hair_transformation_1080p.jpg',
    specialisations: ['Loreal Inoa Ammonia-Free', 'Matrix Colour Art', 'Deep Hair Spa', 'Head Massage'],
    rating: 4.8,
    reviewsCount: 29,
    experienceYears: 6,
    supportedServiceIds: ['g-01', 'g-02', 'g-04', 'g-05', 'g-06', 'g-07', 'hc-01', 'hc-02', 'hc-03', 'hc-04', 'hc-05', 'hc-06', 'hc-07', 'hc-08', 'hc-09', 'hs-01', 'hs-02', 'hs-03', 'hs-04', 'hs-05', 'hs-06', 'hm-01', 'hm-02', 'hm-03', 'hm-04', 'hm-05', 'hm-06'],
    workingHours: {
      start: '10:00',
      end: '21:00'
    },
    availableDays: [1, 2, 3, 4, 5, 6, 0],
    isAvailable: true
  },
  {
    id: 'master-04',
    name: 'Arjun V.',
    role: 'Resident Tattoo Artist & Body Piercer',
    photo: '/images/high_res/post_05_salon_style_1080p.jpg',
    specialisations: ['Custom Ink Stencils', 'Minimalist & Fine-Line', 'Calligraphy', 'Cover-up Consultations'],
    rating: 5.0,
    reviewsCount: 21,
    experienceYears: 5,
    supportedServiceIds: ['t-01', 't-02'],
    workingHours: {
      start: '11:00',
      end: '20:00'
    },
    availableDays: [1, 2, 3, 4, 5, 6, 0],
    isAvailable: true
  }
];

