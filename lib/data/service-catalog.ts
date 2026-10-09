import { SalonService, ServiceCategory } from '../types/booking';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'grooming',
    name: 'Grooming & Haircuts',
    iconName: 'Scissors',
    description: 'Precision scissor cuts, fade designs, trimming and smoothing treatments.'
  },
  {
    id: 'detan',
    name: 'Detan & Glow',
    iconName: 'Sun',
    description: 'Targeted sun-tan removal and active skin tone brightening.'
  },
  {
    id: 'facials',
    name: 'Luxury Facials',
    iconName: 'Sparkles',
    description: 'Gold, Diamond, O3 and Special Hydra facial rejuvenation therapies.'
  },
  {
    id: 'clean-ups',
    name: 'Skin Clean-ups',
    iconName: 'Smile',
    description: 'Deep pore cleansing, fruit exfoliations and hydration masks.'
  },
  {
    id: 'hair-colour',
    name: 'Hair Colour',
    iconName: 'Palette',
    description: 'Premium Streax, Matrix, Loreal & Inoa ammonia-free shades.'
  },
  {
    id: 'manicure',
    name: 'Manicure Care',
    iconName: 'Hand',
    description: 'Crystal, luxury cuticle refinement and nail revitalisation.'
  },
  {
    id: 'pedicure',
    name: 'Pedicure Spa',
    iconName: 'Footprints',
    description: 'Deep cleansing foot rituals, callous smoothing and massage.'
  },
  {
    id: 'head-massage',
    name: 'Head Massage',
    iconName: 'HeartHandshake',
    description: 'Warm almond, coconut oil therapy with soothing hot towel steam.'
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    iconName: 'Droplets',
    description: 'Matrix, Loreal, Enrich deep conditioning and scalp care.'
  },
  {
    id: 'tattoo',
    name: 'Tattoo Studio',
    iconName: 'PenTool',
    description: 'Custom ink design consultations, hygienic needles and body art.'
  }
];

export const SERVICE_CATALOG: SalonService[] = [
  // --- 1. GROOMING ---
  {
    id: 'g-01',
    name: 'Kids Hair Cut',
    categoryId: 'grooming',
    price: 149,
    priceDisplay: '₹149',
    durationMinutes: 25,
    description: 'Gentle, patient styling for young gentlemen and girls with gentle touch.',
    suitableFor: ['kids'],
    image: '/images/high_res/reel_10_expert_cut.jpg',
    isVerifiedPrice: true
  },
  {
    id: 'g-02',
    name: 'Any Hair Cut (Men)',
    categoryId: 'grooming',
    price: 199,
    priceDisplay: '₹199',
    durationMinutes: 30,
    description: 'Personalized consultation, precision scissor cut, taper or fade with styling.',
    suitableFor: ['men'],
    image: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'g-03',
    name: 'Shaving / Trimming',
    categoryId: 'grooming',
    price: 79,
    priceDisplay: '₹79',
    durationMinutes: 20,
    description: 'Classic razor shave or electric trimmer beard sculpting with soothing aftershave.',
    suitableFor: ['men'],
    image: '/images/high_res/reel_04_beard_grooming.jpg',
    isVerifiedPrice: true
  },
  {
    id: 'g-04',
    name: 'Haircut & Trimming Combo',
    categoryId: 'grooming',
    price: 249,
    priceDisplay: '₹249',
    durationMinutes: 45,
    description: 'Complete head and beard grooming session for a sharp, executive look.',
    suitableFor: ['men'],
    image: '/images/high_res/post_03_fresh_haircut_1080p.jpg',
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'g-05',
    name: 'Hair Wash',
    categoryId: 'grooming',
    price: 49,
    priceDisplay: '₹49',
    durationMinutes: 15,
    description: 'Invigorating shampoo cleanse and scalp rinse in luxury recliner.',
    suitableFor: ['men', 'women'],
    image: '/images/high_res/reel_06_hair_wash_spa.jpg',
    isVerifiedPrice: true
  },
  {
    id: 'g-06',
    name: 'Hair Straightening',
    categoryId: 'grooming',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 90,
    description: 'Long-lasting sleek straightening and thermal barrier protection.',
    suitableFor: ['men', 'women'],
    image: '/images/high_res/post_04_silky_smooth_1080p.jpg',
    isVerifiedPrice: true
  },
  {
    id: 'g-07',
    name: 'Hair Keratin Treatment',
    categoryId: 'grooming',
    price: 2999,
    priceDisplay: '₹2,999',
    durationMinutes: 120,
    description: 'Deep protein infusion eliminating frizz and imparting high-gloss softness.',
    suitableFor: ['men', 'women'],
    image: '/images/high_res/post_04_silky_smooth_1080p.jpg',
    isPopular: true,
    isVerifiedPrice: true
  },

  // --- 2. DETAN ---
  {
    id: 'd-01',
    name: 'Detan - Only Face',
    categoryId: 'detan',
    price: 249,
    priceDisplay: '₹249',
    durationMinutes: 20,
    description: 'Fast-acting sun tan reversal and skin soothing for the facial zone.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-02',
    name: 'Detan - Only Neck',
    categoryId: 'detan',
    price: 299,
    priceDisplay: '₹299',
    durationMinutes: 20,
    description: 'Targeted pigmentation and sun-damage lightening around front & back neck.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-03',
    name: 'Detan - O3 (Face)',
    categoryId: 'detan',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 30,
    description: 'Premium oxygenating O3+ formula for instant radiant clarity.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'd-04',
    name: 'Detan - Face & Neck',
    categoryId: 'detan',
    price: 599,
    priceDisplay: '₹599',
    durationMinutes: 35,
    description: 'Unified skin brightening and tone harmony across face and neckline.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-05',
    name: 'Detan - Half Hands',
    categoryId: 'detan',
    price: 799,
    priceDisplay: '₹799',
    durationMinutes: 30,
    description: 'Forearm and elbow sun-tan exfoliation and moisturizing mask.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-06',
    name: 'Detan - Full Hands',
    categoryId: 'detan',
    price: 1299,
    priceDisplay: '₹1,299',
    durationMinutes: 45,
    description: 'Complete arm detan from shoulders to fingertips with active brightening.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-07',
    name: 'Detan - Feet',
    categoryId: 'detan',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 25,
    description: 'Footwear tan marks removal and revitalizing hydration mask.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-08',
    name: 'Detan - Legs',
    categoryId: 'detan',
    price: 1499,
    priceDisplay: '₹1,499',
    durationMinutes: 50,
    description: 'Comprehensive leg detan ritual for velvety smooth, clear skin tone.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'd-09',
    name: 'Detan - Full Body',
    categoryId: 'detan',
    price: 2999,
    priceDisplay: '₹2,999',
    durationMinutes: 90,
    description: 'All-over deluxe detan and body polish for pre-event glow.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },

  // --- 3. FACIALS ---
  {
    id: 'f-01',
    name: 'Face Scrub',
    categoryId: 'facials',
    price: 249,
    priceDisplay: '₹249',
    durationMinutes: 20,
    description: 'Micro-bead exfoliation lifting dead skin and cellular buildup.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-02',
    name: 'Face Scrub With Steam',
    categoryId: 'facials',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 30,
    description: 'Warm steam opening pores followed by gentle scrubbing and blackhead clearing.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-03',
    name: 'Fruit Facial',
    categoryId: 'facials',
    price: 599,
    priceDisplay: '₹599',
    durationMinutes: 40,
    description: 'Natural botanical enzymes and fresh fruit vitamins for subtle daily radiance.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-04',
    name: 'Vitamin Facial',
    categoryId: 'facials',
    price: 799,
    priceDisplay: '₹799',
    durationMinutes: 45,
    description: 'Antioxidant infusion recharging tired skin against urban pollutants.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-05',
    name: 'Tan Removal Facial',
    categoryId: 'facials',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 50,
    description: 'Intensive sun exposure remedy restoring natural melanin balance.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'f-06',
    name: 'Silver Facial',
    categoryId: 'facials',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 50,
    description: 'Cooling silver leaf extract balancing excess sebum and soothing irritation.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-07',
    name: 'Pearl Facial',
    categoryId: 'facials',
    price: 1299,
    priceDisplay: '₹1,299',
    durationMinutes: 55,
    description: 'Crushed pearl minerals restoring an iridescent, smooth porcelain finish.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-08',
    name: 'Gold Facial',
    categoryId: 'facials',
    price: 1499,
    priceDisplay: '₹1,499',
    durationMinutes: 60,
    description: '24K gold dust rejuvenation stimulating collagen, firmness and golden radiance.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'f-09',
    name: 'Diamond Facial',
    categoryId: 'facials',
    price: 1599,
    priceDisplay: '₹1,599',
    durationMinutes: 60,
    description: 'Diamond bhasma polish delivering exceptional brightness and polished elasticity.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-10',
    name: 'ACNE Clarifying Facial',
    categoryId: 'facials',
    price: 1499,
    priceDisplay: '₹1,499',
    durationMinutes: 60,
    description: 'Salicylic, tea tree and anti-bacterial therapy calming active breakouts.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-11',
    name: 'Whitening Radiance Facial',
    categoryId: 'facials',
    price: 1999,
    priceDisplay: '₹1,999',
    durationMinutes: 65,
    description: 'Potent peptides reducing hyperpigmentation and boosting overall luminosity.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-12',
    name: 'Shahnaz Husain Gold Facial',
    categoryId: 'facials',
    price: 2119,
    priceDisplay: '₹2,119',
    durationMinutes: 70,
    description: 'Classic Ayurvedic gold formulation for deep nourishment and timeless royal glow.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-13',
    name: 'Shahnaz Husain Diamond Facial',
    categoryId: 'facials',
    price: 2499,
    priceDisplay: '₹2,499',
    durationMinutes: 75,
    description: 'Luxury Ayurvedic diamond therapy activating cellular renewal and firm contour.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'f-14',
    name: 'Bridal Special (O3+) Facial',
    categoryId: 'facials',
    price: 3999,
    priceDisplay: '₹3,999',
    durationMinutes: 90,
    description: 'The pinnacle 7-step bridal illumination ritual designed for unforgettable occasion glow.',
    suitableFor: ['women', 'men'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'f-15',
    name: 'Special Hydra Facial',
    categoryId: 'facials',
    price: 3999,
    priceDisplay: '₹3,999',
    durationMinutes: 80,
    description: 'Machine-assisted vacuum suction, deep infusing serums and intense hydration vortex.',
    suitableFor: ['men', 'women'],
    image: '/images/high_res/reel_11_beauty_care.jpg',
    isPopular: true,
    isVerifiedPrice: true
  },

  // --- 4. CLEAN-UPS ---
  {
    id: 'c-01',
    name: 'Fruit Clean-up',
    categoryId: 'clean-ups',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 30,
    description: 'Quick refreshing cleanse infused with active fruit extracts.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'c-02',
    name: 'Pearl Clean-up',
    categoryId: 'clean-ups',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 30,
    description: 'Lustrous pearlescent exfoliating cleanse for smooth texture.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'c-03',
    name: 'Papaya Clean-up',
    categoryId: 'clean-ups',
    price: 599,
    priceDisplay: '₹599',
    durationMinutes: 35,
    description: 'Natural papain enzyme dissolving blemishes and dry surface flakes.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'c-04',
    name: 'Gold Clean-up',
    categoryId: 'clean-ups',
    price: 699,
    priceDisplay: '₹699',
    durationMinutes: 35,
    description: 'Quick golden glow cleanse with stimulating massage creams.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'c-05',
    name: 'Diamond Clean-up',
    categoryId: 'clean-ups',
    price: 799,
    priceDisplay: '₹799',
    durationMinutes: 40,
    description: 'Deep diamond exfoliation for an instant polished camera-ready appearance.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'c-06',
    name: 'Luxury Clean-up',
    categoryId: 'clean-ups',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 45,
    description: 'Multi-stage salon treatment with serum infusion and collagen sheet mask.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'c-07',
    name: 'O3+ Clean-up',
    categoryId: 'clean-ups',
    price: 1199,
    priceDisplay: '₹1,199',
    durationMinutes: 45,
    description: 'Medical-grade oxygenated clean-up calming redness and restoring clarity.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },

  // --- 5. HAIR COLOUR ---
  {
    id: 'hc-01',
    name: 'Natural Black (Gel)',
    categoryId: 'hair-colour',
    price: 249,
    priceDisplay: '₹249',
    durationMinutes: 35,
    description: 'Quick root touch-up with non-drip natural black conditioning gel.',
    suitableFor: ['men'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-02',
    name: 'Streax Natural Black',
    categoryId: 'hair-colour',
    price: 399,
    priceDisplay: '₹399',
    durationMinutes: 40,
    description: 'Classic rich black shade with glossy finish and grey coverage.',
    suitableFor: ['men'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-03',
    name: 'Streax Burgundy',
    categoryId: 'hair-colour',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 45,
    description: 'Warm burgundy tones with subtle wine undertones.',
    suitableFor: ['men'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-04',
    name: 'Matrix Natural Black',
    categoryId: 'hair-colour',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 45,
    description: 'Professional salon Matrix formula with deep pigment penetration.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-05',
    name: 'Matrix Burgundy',
    categoryId: 'hair-colour',
    price: 599,
    priceDisplay: '₹599',
    durationMinutes: 50,
    description: 'Vibrant Matrix burgundy with lasting shine and conditioned feel.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-06',
    name: 'Loreal Natural Black',
    categoryId: 'hair-colour',
    price: 599,
    priceDisplay: '₹599',
    durationMinutes: 50,
    description: "L'Oréal Professionnel deep black with shine protection.",
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hc-07',
    name: 'Loreal Burgundy',
    categoryId: 'hair-colour',
    price: 699,
    priceDisplay: '₹699',
    durationMinutes: 55,
    description: "L'Oréal Professionnel rich burgundy with luminous multifaceted tones.",
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hc-08',
    name: 'Loreal Inoa Natural Black (Ammonia-Free)',
    categoryId: 'hair-colour',
    price: 699,
    priceDisplay: '₹699',
    durationMinutes: 55,
    description: "Revolutionary oil-delivery INOA ammonia-free colour for supreme scalp comfort.",
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hc-09',
    name: 'Loreal Inoa Burgundy (Ammonia-Free)',
    categoryId: 'hair-colour',
    price: 799,
    priceDisplay: '₹799',
    durationMinutes: 60,
    description: "Ammonia-free INOA oil formula delivering radiant velvet burgundy shades.",
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },

  // --- 6. MANICURE ---
  {
    id: 'm-01',
    name: 'Basic Manicure',
    categoryId: 'manicure',
    price: 399,
    priceDisplay: '₹399',
    durationMinutes: 30,
    description: 'Nail shaping, cuticle cleaning, hand soak and moisturizing massage.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'm-02',
    name: 'Advanced Manicure',
    categoryId: 'manicure',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 40,
    description: 'Exfoliating scrub, cuticle conditioning, and tension-release hand massage.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'm-03',
    name: 'Crystal Manicure',
    categoryId: 'manicure',
    price: 699,
    priceDisplay: '₹699',
    durationMinutes: 45,
    description: 'Aromatherapy crystal soak, brightening pack and intense moisture seal.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'm-04',
    name: 'Luxury Spa Manicure',
    categoryId: 'manicure',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 55,
    description: 'Royal ritual with hot towel treatment, collagen mask, and restorative massage.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },

  // --- 7. PEDICURE ---
  {
    id: 'p-01',
    name: 'Basic Pedicure',
    categoryId: 'pedicure',
    price: 699,
    priceDisplay: '₹699',
    durationMinutes: 40,
    description: 'Warm foot soak, heel buffing, nail trimming and softening lotion.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'p-02',
    name: 'Advanced Pedicure',
    categoryId: 'pedicure',
    price: 899,
    priceDisplay: '₹899',
    durationMinutes: 50,
    description: 'Dead skin removal, mineral salt scrub, and therapeutic calf & foot massage.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'p-03',
    name: 'Crystal Pedicure',
    categoryId: 'pedicure',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 55,
    description: 'Effervescent crystal spa soak, detoxifying mask and deep relaxation.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'p-04',
    name: 'Luxury Spa Pedicure',
    categoryId: 'pedicure',
    price: 1199,
    priceDisplay: '₹1,199',
    durationMinutes: 65,
    description: 'The ultimate foot pampering with botanical oils, steam towel wrap and heel balm.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },

  // --- 8. HEAD MASSAGE ---
  {
    id: 'hm-01',
    name: 'Head Massage - Coconut Oil',
    categoryId: 'head-massage',
    price: 199,
    priceDisplay: '₹199',
    durationMinutes: 20,
    description: 'Pure coconut oil pressure-point massage easing scalp tension and headaches.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hm-02',
    name: 'Head Massage - Cool Mint Oil',
    categoryId: 'head-massage',
    price: 249,
    priceDisplay: '₹249',
    durationMinutes: 25,
    description: 'Icy refreshing cooling oil promoting blood circulation and calm mind.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hm-03',
    name: 'Head Massage - Almond Oil',
    categoryId: 'head-massage',
    price: 299,
    priceDisplay: '₹299',
    durationMinutes: 25,
    description: 'Vitamin-E enriched sweet almond oil deeply hydrating hair roots.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hm-04',
    name: 'Warm Oil Massage',
    categoryId: 'head-massage',
    price: 399,
    priceDisplay: '₹399',
    durationMinutes: 30,
    description: 'Heated Ayurvedic herbal oil blend massaged into acupressure points.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hm-05',
    name: 'Warm Oil Massage & Steam',
    categoryId: 'head-massage',
    price: 499,
    priceDisplay: '₹499',
    durationMinutes: 40,
    description: 'Warm oil treatment followed by ozonated steam for deep follicle absorption.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hm-06',
    name: 'Head Wash Post Massage',
    categoryId: 'head-massage',
    price: 99,
    priceDisplay: '₹99',
    durationMinutes: 15,
    description: 'Clarifying rinse removing excess oil and leaving hair fresh and light.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },

  // --- 9. HAIR SPA ---
  {
    id: 'hs-01',
    name: 'Basic Hair Spa',
    categoryId: 'hair-spa',
    price: 799,
    priceDisplay: '₹799',
    durationMinutes: 45,
    description: 'Cleansing wash, nourishing hair mask, warm steam, and towel wrap.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hs-02',
    name: 'Anti Hair Fall Spa',
    categoryId: 'hair-spa',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 50,
    description: 'Root fortification serums strengthening weak follicles against breakage.',
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hs-03',
    name: 'Matrix Intense Hair Spa',
    categoryId: 'hair-spa',
    price: 999,
    priceDisplay: '₹999',
    durationMinutes: 50,
    description: 'Matrix Sensoria smoothing formula restoring elasticity and soft body.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hs-04',
    name: 'Loreal Mythic Oil Hair Spa',
    categoryId: 'hair-spa',
    price: 1199,
    priceDisplay: '₹1,199',
    durationMinutes: 55,
    description: "L'Oréal Professionnel deeply replenishing spa for damaged, dry strands.",
    suitableFor: ['men', 'women'],
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 'hs-05',
    name: 'Enrich Luxury Hair Spa',
    categoryId: 'hair-spa',
    price: 1199,
    priceDisplay: '₹1,199',
    durationMinutes: 55,
    description: 'Ultra-rich lipid infusion restructuring sensitized and heat-styled hair.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },
  {
    id: 'hs-06',
    name: 'Loreal Anti Dandruff Spa',
    categoryId: 'hair-spa',
    price: 1499,
    priceDisplay: '₹1,499',
    durationMinutes: 60,
    description: 'Targeted zinc pyrithione scalp purifying treatment ending persistent flaking.',
    suitableFor: ['men', 'women'],
    isVerifiedPrice: true
  },

  // --- 10. TATTOO STUDIO ---
  {
    id: 't-01',
    name: 'Custom Tattoo Consultation',
    categoryId: 'tattoo',
    price: 999,
    priceDisplay: '₹999 (Consultation & Deposit)',
    durationMinutes: 45,
    description: 'Dedicated 1-on-1 design consultation with ANIQ ink master, stencil sizing and sterile session booking.',
    suitableFor: ['tattoo'],
    image: '/images/high_res/post_05_salon_style_1080p.jpg',
    isPopular: true,
    isVerifiedPrice: true
  },
  {
    id: 't-02',
    name: 'Custom Tattoo Inking (Per Sq. Inch)',
    categoryId: 'tattoo',
    price: null,
    priceDisplay: 'Price to be confirmed / On consultation',
    durationMinutes: 90,
    description: 'Custom sleeve, calligraphy, minimalist or fine-line inking with medical-grade sterile equipment.',
    suitableFor: ['tattoo'],
    isVerifiedPrice: false
  }
];

