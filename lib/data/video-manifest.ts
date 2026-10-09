export interface VideoScene {
  id: number;
  part: string;
  title: string;
  subtitle: string;
  sceneName: string;
  category: string;
  videoSrc: string;
  posterSrc: string;
  durationSeconds: number;
  description: string;
}

export const VIDEO_MANIFEST: VideoScene[] = [
  {
    id: 1,
    part: "01",
    title: "The Grand Entrance",
    subtitle: "West Marredpally, Secunderabad",
    sceneName: "Exterior & Sparkler Reveal",
    category: "Arrival",
    videoSrc: "/videos/part-01.mp4",
    posterSrc: "/posters/part-01.jpg",
    durationSeconds: 10,
    description: "Architectural arrival into luxury grooming. Sparkling entrance revealing the refined facade of Aniq Unisex Salon."
  },
  {
    id: 2,
    part: "02",
    title: "Warm Welcome & Lounge",
    subtitle: "Champagne Gold Reception",
    sceneName: "Reception & Welcome",
    category: "Reception",
    videoSrc: "/videos/part-02.mp4",
    posterSrc: "/posters/part-02.jpg",
    durationSeconds: 10,
    description: "Italian marble reception, fluted blush-pink backdrop, luminous pendant chandeliers, and gold ribbon welcoming."
  },
  {
    id: 3,
    part: "03",
    title: "Gentlemen's Grooming",
    subtitle: "Precision Scissor Craft & Fades",
    sceneName: "Men's Haircut & Styling",
    category: "Men's Care",
    videoSrc: "/videos/part-03.mp4",
    posterSrc: "/posters/part-03.jpg",
    durationSeconds: 10,
    description: "Sleek barbering stations, levitating professional shears and trimmers, and sharp contemporary styling."
  },
  {
    id: 4,
    part: "04",
    title: "Haute Coiffure",
    subtitle: "Bespoke Women's Styling",
    sceneName: "Women's Hair Styling",
    category: "Women's Styling",
    videoSrc: "/videos/part-04.mp4",
    posterSrc: "/posters/part-04.jpg",
    durationSeconds: 10,
    description: "Artisan hair styling through radial crystal mirror facets, rich volume blow-drys, and radiant tone finishes."
  },
  {
    id: 5,
    part: "05",
    title: "Sensory Hair Cleansing",
    subtitle: "Hydrating Water Lounge",
    sceneName: "Hair Wash Experience",
    category: "Hair Care",
    videoSrc: "/videos/part-05.mp4",
    posterSrc: "/posters/part-05.jpg",
    durationSeconds: 10,
    description: "Ergonomic wash basins with swirling crystalline water vortex and calming scalp therapy."
  },
  {
    id: 6,
    part: "06",
    title: "Luminous Skincare",
    subtitle: "Hydra-Facials & Rejuvenation",
    sceneName: "Facials & Skin Treatments",
    category: "Skin & Facials",
    videoSrc: "/videos/part-06.mp4",
    posterSrc: "/posters/part-06.jpg",
    durationSeconds: 10,
    description: "Nourishing facial therapy, micro-mist hydration, and delicate gold-infused cream treatments."
  },
  {
    id: 7,
    part: "07",
    title: "Artisan Nail Care",
    subtitle: "Crystal Manicure & Pedicure",
    sceneName: "Manicure & Pedicure",
    category: "Nail Lounge",
    videoSrc: "/videos/part-07.mp4",
    posterSrc: "/posters/part-07.jpg",
    durationSeconds: 10,
    description: "Therapeutic hand and foot spa rituals, cuticle refinement, and premium soothing care."
  },
  {
    id: 8,
    part: "08",
    title: "Detan & Body Glow",
    subtitle: "Even Tone & Deep Exfoliation",
    sceneName: "Detan & Body Treatments",
    category: "Body Care",
    videoSrc: "/videos/part-08.mp4",
    posterSrc: "/posters/part-08.jpg",
    durationSeconds: 10,
    description: "Targeted sun-tan removal, nourishing O3 infusions, and silky skin rejuvenation."
  },
  {
    id: 9,
    part: "09",
    title: "Intensive Hair Spa",
    subtitle: "Keratin & Botanical Elixirs",
    sceneName: "Hair Spa Experience",
    category: "Spa Rituals",
    videoSrc: "/videos/part-09.mp4",
    posterSrc: "/posters/part-09.jpg",
    durationSeconds: 10,
    description: "Deep conditioning steam, revitalizing hair masks, and scalp tension release."
  },
  {
    id: 10,
    part: "10",
    title: "The Studio Architectural Sanctuary",
    subtitle: "Multi-Zone Luxury Layout",
    sceneName: "Complete Architectural Reveal",
    category: "Architecture",
    videoSrc: "/videos/part-10.mp4",
    posterSrc: "/posters/part-10.jpg",
    durationSeconds: 10,
    description: "Isometric floating salon dioramas revealing all zones in perfect harmony with the golden shears symbol."
  },
  {
    id: 11,
    part: "11",
    title: "ANIQ Luxury Signature",
    subtitle: "Where Elegance Meets Craft",
    sceneName: "Storefront & Brand Finale",
    category: "Brand Finale",
    videoSrc: "/videos/part-11.mp4",
    posterSrc: "/posters/part-11.jpg",
    durationSeconds: 10,
    description: "The illuminated ANIQ storefront sign, scissors emblem, and open invitation to experience perfection."
  }
];

