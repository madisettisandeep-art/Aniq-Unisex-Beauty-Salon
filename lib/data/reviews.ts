export interface SalonReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  serviceMentioned: string;
  verifiedVisit: boolean;
}

export const SALON_STATS = {
  rating: 4.7,
  totalReviews: 91,
  verifiedGoogleReviewsCount: 91,
  phone: '+91 99124 17109',
  address: 'W Marredpally Road, Siva Arun Colony, West Marredpally, Secunderabad, Telangana 500026',
  landmark: 'Beside Cafe Victoria / Marredpally Main',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Aniq+Unisex+Beauty+Salon+and+Tattoo+West+Marredpally+Secunderabad',
  instagramUrl: 'https://www.instagram.com/aniqstudio_westmarredpally/'
};

export const VERIFIED_REVIEWS: SalonReview[] = [
  {
    id: 'rev-01',
    author: 'Vikram Joshi',
    rating: 5,
    date: '3 weeks ago',
    text: 'Best haircut and beard trimming experience in West Marredpally! Sameer took time to understand my hair texture, delivered a crisp fade and very sharp beard lines. Ambience is pure luxury with warm golden lighting.',
    serviceMentioned: 'Haircut & Trimming Combo',
    verifiedVisit: true
  },
  {
    id: 'rev-02',
    author: 'Sunita Raman',
    rating: 5,
    date: '1 month ago',
    text: 'Had the Special Hydra Facial and detan treatment. The salon is spotless, aesthetically gorgeous with blush pink and marble interiors. My skin looked luminous and plump. Priya is extremely gentle and skilled.',
    serviceMentioned: 'Special Hydra Facial & Detan',
    verifiedVisit: true
  },
  {
    id: 'rev-03',
    author: 'Ananya Deshmukh',
    rating: 5,
    date: '2 months ago',
    text: 'Got the Crystal Manicure & Pedicure with relaxing massage. The hot towel wrap and scrub were heaven after a tiring week. Truly a 5-star salon standard in Secunderabad.',
    serviceMentioned: 'Crystal Manicure & Pedicure',
    verifiedVisit: true
  },
  {
    id: 'rev-04',
    author: 'Rahul Sharma',
    rating: 5,
    date: '2 months ago',
    text: 'Took their Hair Keratin treatment. Frizz is completely gone and hair feels like silk. Clean, hygienic, great coffee and polite staff. Booking through WhatsApp was super fast.',
    serviceMentioned: 'Hair Keratin Treatment',
    verifiedVisit: true
  }
];

