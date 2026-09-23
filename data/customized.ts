export interface CustomizedPiece {
  id: string;
  slug: string;
  name: string;
  category: string; // e.g. 'Name Plates' | 'Gifts' | 'Idols' | 'Pooja Articles' | 'Baby Gifts' | 'Wedding' | 'Keepsakes'
  categoryLabel: string;
  occasions: string[]; // e.g. ['Housewarming', 'Wedding', 'Baby', 'Pooja', 'Anniversary', 'Corporate']
  image: string;
  conceptSketchImage?: string; // Optional idea/sketch image for Before/After visual transition
  shortDescription: string;
  fullDescription: string;
  craftsmanshipDetails: {
    metal: string;
    purity: string;
    hallmark: string;
    technique: string;
    turnaroundDays: string;
  };
  customizationOptions: string[]; // e.g. ['Custom Engraved Names', 'Family Crest', 'Custom Dimensions']
  featured?: boolean;
  signature?: boolean;
  storySnippet?: string;
}

export interface CustomCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  iconName?: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  detailPoints: string[];
}

export interface CustomizationOptionType {
  id: string;
  title: string;
  description: string;
  tag: string;
  image: string;
}

export const CUSTOM_CATEGORIES: CustomCategory[] = [
  {
    id: "name-plates",
    name: "Customized Name Plates",
    description: "Handcrafted 925 silver door plaques & house nameplates with intricate motif engraving.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "personalized-gifts",
    name: "Personalized Keepsakes & Gifts",
    description: "Custom engraved silver memory boxes, photo frames, and monogrammed heirloom pieces.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "custom-idols",
    name: "Custom Silver Idols",
    description: "Bespoke sacred deity statues sculpted with traditional wax chasing and hallmark purity.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "pooja-articles",
    name: "Custom Pooja Articles",
    description: "Personalized Kamakshi deepams, silver aarti trays, kalash sets & prayer essentials.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "baby-gifts",
    name: "Custom Baby Gifts",
    description: "Hallmark silver nazariya, custom name-engraved baby kadas, and silver feeding spoons.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: "wedding-pieces",
    name: "Custom Wedding Pieces",
    description: "Bespoke initial silver thaali coins, silver coin gift sets & bridal keepsake hampers.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "SHARE YOUR IDEA",
    subtitle: "Inspiration & Consultation",
    description: "Connect with our silver atelier team with your initial sketch, reference image, or meaningful vision.",
    detailPoints: ["Personal consultation via WhatsApp or Store", "Image reference & dimension evaluation", "Initial feasibility & purity discussion"],
  },
  {
    stepNumber: "02",
    title: "DISCUSS THE DESIGN",
    subtitle: "CAD & Master Craftsman Blueprint",
    description: "Our master silversmiths refine your concept into detailed 3D CAD blueprints and wax mold prototypes.",
    detailPoints: ["Precision digital 3D model render", "Exact silver weight & finish estimation", "Client approval before wax carving"],
  },
  {
    stepNumber: "03",
    title: "CRAFT IN SILVER",
    subtitle: "925 Hallmark Hand Forging",
    description: "Experienced artisans cast, chase, hand-engrave, and polish your custom ornament in 925 sterling silver.",
    detailPoints: ["Traditional lost-wax silver casting", "Hand repoussé & filigree engraving", "BIS 925 Hallmark certification"],
  },
  {
    stepNumber: "04",
    title: "RECEIVE YOUR PIECE",
    subtitle: "Luxury Unboxing & Delivery",
    description: "Your personalized silver masterpiece is inspected for purity, placed in signature luxury packaging, and delivered.",
    detailPoints: ["Final quality & weight audit", "Velvet-lined gift presentation box", "Insured doorstep courier or store pickup"],
  },
];

export const CUSTOMIZATION_TYPES: CustomizationOptionType[] = [
  {
    id: "names",
    title: "Names & Devotional Mantra",
    description: "Custom deep-laser or hand-chiselled name inscriptions, family titles, and sacred Sanskrit slokas.",
    tag: "Engraving",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "dates",
    title: "Auspicious Dates & Years",
    description: "Commemorate weddings, housewarmings, or births with etched Roman, Tamil, or English typography.",
    tag: "Milestone",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "initials",
    title: "Monograms & Monogram Medallions",
    description: "Intertwined monogram emblems for silver coin bars, photo frames, and wedding keepsakes.",
    tag: "Personal Signature",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "religious",
    title: "Religious Motifs & Deities",
    description: "Intricate depictions of Goddess Lakshmi, Lord Ganesha, Balaji, or custom temple architecture motifs.",
    tag: "Sacred Art",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "shapes",
    title: "Personalized Shapes & Molds",
    description: "Bespoke 3D sculpted shapes, custom deepam silhouettes, and tailored ornamental geometry.",
    tag: "Bespoke Sculpting",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "dimensions",
    title: "Custom Dimensions & Weight",
    description: "From 10 grams delicate keepsakes to multi-kilogram grand temple pooja articles tailored to specification.",
    tag: "Tailored Spec",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
  },
];

export const CUSTOMIZED_PIECES: CustomizedPiece[] = [
  {
    id: "c1",
    slug: "heritage-engraved-silver-nameplate",
    name: "Heritage Engraved 925 Silver House Nameplate",
    category: "Name Plates",
    categoryLabel: "Customized Name Plates",
    occasions: ["Housewarming", "Gifting", "Anniversary"],
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    conceptSketchImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    shortDescription: "Personalized solid silver entrance door plaque with traditional South Indian floral border chasing.",
    fullDescription: "Forged for a new home beginning, this solid 925 sterling silver house nameplate features deep-carved family surname lettering surrounded by intricate temple lotus repoussé borders. Designed to grace entrance doorways with timeless elegance and divine protection.",
    craftsmanshipDetails: {
      metal: "Solid 925 Sterling Silver",
      purity: "92.5% Certified Silver",
      hallmark: "BIS 925 Stamped & Certified",
      technique: "Hand Chasing & Precision Deep Etching",
      turnaroundDays: "7 - 10 Business Days",
    },
    customizationOptions: ["Custom Family Name / House Name", "Font Selection (Tamil / English / Devanagari)", "Lotus or Peacock Border Motifs", "Custom Dimensions (8x4 in to 16x10 in)"],
    featured: true,
    signature: true,
    storySnippet: "Commissioned by a Chennai family for their ancestral housewarming ceremony.",
  },
  {
    id: "c2",
    slug: "custom-lakshmi-ganesha-silver-idol",
    name: "Custom 925 Silver Lakshmi Ganesha Deity Idol",
    category: "Idols",
    categoryLabel: "Custom Silver Idols",
    occasions: ["Pooja", "Housewarming", "Corporate", "Wedding"],
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
    conceptSketchImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=1000&q=85",
    shortDescription: "Bespoke 3D carved dual deity idol with micro-detailed crown ornaments and matte antique polish.",
    fullDescription: "Created to match exact pooja room proportions, this divine Lakshmi Ganesha idol set features solid silver casting with hand-carved facial serenity, intricate jewel work, and a sturdy polished silver pedestal base.",
    craftsmanshipDetails: {
      metal: "925 Sterling Silver & 999 Fine Silver Details",
      purity: "92.5% Purity Base",
      hallmark: "BIS 925 Hallmark Stamped",
      technique: "Lost-Wax Investment Casting & Antique Oxidization",
      turnaroundDays: "10 - 14 Business Days",
    },
    customizationOptions: ["Custom Height (3 in to 18 in)", "Dual or Single Deity Composition", "Matte Antique vs High Mirror Polish", "Engraved Devotional Donor Inscriptions"],
    featured: true,
    signature: true,
    storySnippet: "Sculpted for a sanctum mandir with precise iconographic measurements.",
  },
  {
    id: "c3",
    slug: "engraved-kamakshi-deepam-pooja-set",
    name: "Custom Engraved Kamakshi Silver Deepam",
    category: "Pooja Articles",
    categoryLabel: "Custom Pooja Articles",
    occasions: ["Pooja", "Housewarming", "Wedding"],
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Traditional brass-core heavy silver clad lamp with custom family surname laser etched at the base.",
    fullDescription: "A sacred heirloom lamp crafted for daily family worship. Features Goddess Kamakshi posture at the apex, solid wick oil reservoir, and custom devotional Sanskrit sloka engraved along the tiered silver base.",
    craftsmanshipDetails: {
      metal: "Heavyweight 925 Sterling Silver",
      purity: "92.5% Certified Silver",
      hallmark: "BIS 925 Stamped",
      technique: "Traditional South Indian Metal Chasing & High Gloss Polish",
      turnaroundDays: "5 - 7 Business Days",
    },
    customizationOptions: ["Base Sloka / Family Name Etching", "Single Wick vs 5-Wick Peacock Oil Bowl", "Pair or Single Lamp Configuration"],
    featured: false,
    signature: true,
    storySnippet: "Hand-finished with traditional oil basin geometry to burn for 12+ continuous hours.",
  },
  {
    id: "c4",
    slug: "personalized-silver-baby-nazariya-kada",
    name: "Personalized Silver Baby Nazariya & Name Kada",
    category: "Baby Gifts",
    categoryLabel: "Custom Baby Gifts",
    occasions: ["Baby", "Gifting"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "925 silver black bead protective nazariya bracelet with custom initial name charm.",
    fullDescription: "Specially formulated with smooth rounded edges and hypoallergenic 925 silver for delicate infant wrists. Features a custom cut-out baby name charm suspended from protective black and silver evil-eye beads.",
    craftsmanshipDetails: {
      metal: "925 Pure Sterling Silver",
      purity: "92.5% Hypoallergenic Silver",
      hallmark: "BIS 925 Certified",
      technique: "Hand Threading & Precision Micro Name Laser Cut",
      turnaroundDays: "3 - 5 Business Days",
    },
    customizationOptions: ["Baby Name or Initials Cutout", "Wrist Size Adjustment (Infant to Toddler)", "Evil Eye Bead Color Accents"],
    featured: true,
    signature: false,
    storySnippet: "A treasured newborn arrival gift loved by grandparents across South India.",
  },
  {
    id: "c5",
    slug: "custom-wedding-initial-silver-coins",
    name: "999 Pure Silver Custom Minted Wedding Coins",
    category: "Wedding",
    categoryLabel: "Custom Wedding Pieces",
    occasions: ["Wedding", "Anniversary", "Corporate"],
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Custom 999 fine silver bullion coins die-minted with bride and groom initials and ceremony date.",
    fullDescription: "Exclusive 999 pure silver coins created for wedding guest return gifts and keepsake hampers. High-relief die-struck portrait or initials on front, with Sri Bhagavathi Silvers 999 purity guarantee mark on reverse.",
    craftsmanshipDetails: {
      metal: "999 Fine Silver (99.9% Purity)",
      purity: "99.9% Pure Silver",
      hallmark: "NABL Accredited Lab Certified",
      technique: "High-Pressure Hydraulic Die Minting",
      turnaroundDays: "7 - 12 Business Days",
    },
    customizationOptions: ["Custom Couple Initials / Monogram", "Wedding Date & Venue Inscription", "Coin Weight Options (10g, 20g, 50g, 100g)", "Custom Velvet Acrylic Box Packaging"],
    featured: true,
    signature: true,
    storySnippet: "Minted in bulk orders for grand royal wedding ceremonies with tamper-proof packaging.",
  },
  {
    id: "c6",
    slug: "custom-silver-photo-frame-memory-box",
    name: "Custom Monogram Silver Photo Frame & Memory Keepsake",
    category: "Keepsakes",
    categoryLabel: "Personalized Keepsakes & Gifts",
    occasions: ["Anniversary", "Housewarming", "Gifting", "Corporate"],
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Architectural 925 silver table frame featuring hand-carved crest and engraved memory plaque.",
    fullDescription: "Encase your cherished family memories in solid sterling silver. Includes an engraved silver metal plaque inset into the lower border for personal wedding dates, quotes, or family lineage details.",
    craftsmanshipDetails: {
      metal: "925 Sterling Silver Facade",
      purity: "92.5% Silver Guarantee",
      hallmark: "BIS 925 Hallmark Stamped",
      technique: "Italian Silver Sheet Embossing & Mahogany Wood Backing",
      turnaroundDays: "4 - 6 Business Days",
    },
    customizationOptions: ["Engraved Plaque Quote", "Frame Size (4x6, 5x7, 8x10 inches)", "Ornate vs Modern Flat Silver Border"],
    featured: false,
    signature: false,
    storySnippet: "Commissioned as a 50th Silver Jubilee anniversary memory frame.",
  },
];
