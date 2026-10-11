# ANIQ Unisex Beauty Salon and Tattoo — Web Application

Production-ready, luxury, mobile-first web application for **ANIQ Unisex Beauty Salon and Tattoo**, located in West Marredpally, Secunderabad, Telangana.

---

## 1. Brand Identity & Visual Direction

- **Brand Name**: ANIQ Unisex Beauty Salon and Tattoo
- **Branch**: W Marredpally Road, Siva Arun Colony, West Marredpally, Secunderabad, Telangana 500026, India.
- **Phone & WhatsApp**: `+91 99124 17109`
- **Google Rating**: 4.7 Stars (91 Verified Reviews)
- **Palette**: Warm cream (`#FDFCF9`), soft ivory marble (`#FAF6F0`), blush pink (`#F6DDD9`), champagne gold (`#D4AF37`), rose gold (`#B76E79`), and charcoal typography (`#1E1E22`).
- **Brand Symbol**: Authoritative scissors emblem integrated into the letter 'A' of the ANIQ wordmark.

---

## 2. Cinematic 11-Part Scroll-Animated Hero

All 11 video clips provided in `C:\Aniq Unisex Beauty salon` are mapped directly in `lib/data/video-manifest.ts` and placed in `public/videos/`:

| Part | Scene Title | File | Focus |
| :---: | :--- | :--- | :--- |
| **01** | The Grand Entrance | `public/videos/part-01.mp4` | Exterior facade, sparkler effect & architectural reveal |
| **02** | Warm Welcome & Lounge | `public/videos/part-02.mp4` | Italian marble reception, fluted blush wall, gold ribbon welcome |
| **03** | Gentlemen's Grooming | `public/videos/part-03.mp4` | Levitating scissors & clippers, precision fade haircut |
| **04** | Haute Coiffure | `public/videos/part-04.mp4` | Radial crystal mirror facets, women's blowout & styling |
| **05** | Sensory Hair Cleansing | `public/videos/part-05.mp4` | Swirling water vortex, ergonomic wash recliners |
| **06** | Luminous Skincare | `public/videos/part-06.mp4` | Facial therapy, gold-infused cream vortex & skin rejuvenation |
| **07** | Artisan Nail Care | `public/videos/part-07.mp4` | Therapeutic crystal manicure and pedicure luxury rituals |
| **08** | Detan & Body Glow | `public/videos/part-08.mp4` | Targeted sun-tan removal and active skin tone polishing |
| **09** | Intensive Hair Spa | `public/videos/part-09.mp4` | Keratin nourishment, warm steam and scalp massage |
| **10** | Studio Architectural Sanctuary | `public/videos/part-10.mp4` | Floating dioramas of all salon zones with central shears |
| **11** | ANIQ Luxury Signature | `public/videos/part-11.mp4` | Illuminated storefront logo sign & brand finale |

Poster frames are pre-extracted in `public/posters/part-01.jpg` through `part-11.jpg` to prevent layout jumps or white flashes.

---

## 3. Verified Service Menu (Authoritative Gents Menu)

Pre-seeded in `data/salon-db.json` and `lib/data/service-catalog.ts`:

- **Grooming**: Kids Hair Cut (₹149), Any Hair Cut (₹199), Shaving/Trimming (₹79), Haircut & Trimming Combo (₹249), Hair Wash (₹49), Hair Straightening (₹999), Hair Keratin (₹2,999).
- **Detan**: Face (₹249), Neck (₹299), O3 Face (₹499), Face & Neck (₹599), Half Hands (₹799), Full Hands (₹1,299), Full Body (₹2,999), Feet (₹499), Legs (₹1,499).
- **Facials**: Face Scrub (₹249), Face Scrub With Steam (₹499), Fruit (₹599), Vitamin (₹799), Tan Removal (₹999), Silver (₹999), Gold (₹1,499), Diamond (₹1,599), Pearl (₹1,299), ACNE (₹1,499), Whitening (₹1,999), Shahnaz Gold (₹2,119), Shahnaz Diamond (₹2,499), Bridal Special O3 (₹3,999), Special Hydra Facial (₹3,999).
- **Clean-ups**: Fruit (₹499), Pearl (₹499), Papaya (₹599), Gold (₹699), Diamond (₹799), Luxury (₹999), O3+ (₹1,199).
- **Hair Colour**: Natural Black Gel (₹249), Streax Natural Black (₹399), Streax Burgundy (₹499), Matrix Natural Black (₹499), Matrix Burgundy (₹599), Loreal Natural Black (₹599), Loreal Burgundy (₹699), Loreal Inoa Ammonia-Free (₹699), Loreal Inoa Burgundy (₹799).
- **Manicure & Pedicure**: Basic Manicure (₹399), Advanced (₹499), Crystal (₹699), Luxury (₹999); Basic Pedicure (₹699), Advanced (₹899), Crystal (₹999), Luxury (₹1,199).
- **Head Massage**: Coconut (₹199), Cool Mint (₹249), Almond (₹299), Warm Oil (₹399), Warm Oil & Steam (₹499), Post-Massage Wash (₹99).
- **Hair Spa**: Basic (₹799), Anti Hair Fall (₹999), Matrix (₹999), Loreal (₹1,199), Enrich (₹1,199), Loreal Anti Dandruff (₹1,499).
- **Tattoo Studio**: Custom Design Consultation & Deposit (₹999), Custom Inking (Price on consultation).

---

## 4. Complete 11-Step Booking Workflow

1. **Profile Selection**: Men, Women, Kids, or Tattoo Consultation.
2. **Service Multi-Select**: Dynamic running price & duration calculations.
3. **Master Selection**: Choose specific stylist or "No Preference (Recommended)".
4. **Interactive Date Picker**: Operating days (Monday-Sunday 10 AM - 9 PM) with 2-hour minimum notice.
5. **Time Slot Selector**: Conflict-safe slot availability computed on server.
6. **Customer Details**: Name, 10-digit mobile number, optional email and special instructions.
7. **Summary & Policy Review**: Explicit review of appointment details before submission.
8. **Persistent Record Creation**: Generates unique reference code (`ANIQ-26-XXXX`) in `PENDING_CONFIRMATION` status.
9. **WhatsApp Click-to-Chat**: Direct link (`wa.me/919912417109?text=...`) with formatted appointment details.
10. **Customer Tracking & Lookup**: Look up status anytime via `/` with booking reference.
11. **Reschedule / Cancellation**: Secure workflow via appointment tracking modal.

---

## 5. Admin Dashboard (`/admin`)

- **URL**: `/admin`
- **Username**: `admin`
- **Password**: `AniqSalon@2026`
- **Features**:
  - Real-time visit counts (Today's, Pending, Confirmed, Completed, Projected Revenue).
  - Search and filter appointments by reference, name, phone, or status.
  - One-click Confirm, Reject, Complete, and Reschedule actions.
  - Toggle staff/master on-leave availability in real time.
  - Review authoritative service menu items.

---

## 6. Running Automated Tests

A comprehensive QA test suite is included in `tests/booking-engine.test.ts`:

```bash
npx tsx tests/booking-engine.test.ts
```

All 22 test assertions verify:
- Pricing and duration integrity
- Single and multi-service calculations
- Overlapping appointment conflict prevention
- No-preference master auto-assignment
- WhatsApp link URL-encoding
- Status transitions and rescheduling

---

## 7. Development & Production Deployment

### Local Development:
```bash
npm run dev
# Opens at http://localhost:3000
```

### Production Build:
```bash
npm run build
npm run start
```

