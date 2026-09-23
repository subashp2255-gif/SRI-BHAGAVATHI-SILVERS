export interface Occasion {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  shortDescription: string;
  editorialStory: string;
  image: string;
  heroImage: string;
  subcategories: string[];
  relatedSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  productTag: string; // Used to match against product.occasions array
}

export const OCCASIONS: Occasion[] = [
  {
    slug: "wedding",
    name: "Wedding",
    heroTitle: "Sacred Silver for a Meaningful Beginning",
    heroSubtitle: "Blessed bridal ornaments, heirloom kadas, and luxury wedding return gifts.",
    tagline: "Bridal & Wedding Collections",
    shortDescription: "Silver pieces for a meaningful beginning, wedding trousseau, and royal return gifts.",
    editorialStory: "In South Indian traditions, silver symbolizes purity, prosperity, and eternal grace. Our wedding collection brings together hallmarked 925 bridal chokers, traditional peacock anklets, temple kadas, and custom silver bullion coins designed for memorable auspicious beginnings.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Wedding Gifts", "Couple Gifts", "Traditional Silver", "Return Gifts", "Premium Heirloom"],
    relatedSlugs: ["anniversary", "gifting", "housewarming"],
    metaTitle: "Silver Wedding Gifts & Bridal Collections | Sri Bhagavathi Silvers",
    metaDescription: "Explore certified 925 sterling silver bridal jewelry, temple kadas, and silver return gifts for weddings at Sri Bhagavathi Silvers.",
    productTag: "Wedding",
  },
  {
    slug: "housewarming",
    name: "Housewarming",
    heroTitle: "Auspicious Silver for Sacred Havens",
    heroSubtitle: "Kamakshi deepams, pooja kalash, and silver articles to bless new beginnings.",
    tagline: "Griha Pravesam & New Home Blessings",
    shortDescription: "Traditional Kamakshi lamps, silver kalash, and articles to bless a new home with abundance.",
    editorialStory: "Welcoming prosperity into a new home begins with pure silver. Our Housewarming collection features hand-carved 999 fine silver Kamakshi lamps, Panchapatra sets, polished silver tumblers, and decorative silver idols crafted for Griha Pravesam ceremonies.",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Silver Idols", "Pooja Articles", "Traditional Gifts", "Decorative Silver", "Silver Dining"],
    relatedSlugs: ["pooja", "gifting", "festival"],
    metaTitle: "Silver Housewarming Gifts & Griha Pravesam Articles | Sri Bhagavathi Silvers",
    metaDescription: "Discover consecrated silver Kamakshi deepams, silver idols, and housewarming gifts for Griha Pravesam ceremonies.",
    productTag: "Housewarming",
  },
  {
    slug: "baby",
    name: "Baby & Naming",
    heroTitle: "Cherished Keepsakes for Little Blessings",
    heroSubtitle: "Protection nazariya bangles, silver silver feeding bowls, and cradle ceremony gifts.",
    tagline: "Infant Keepsakes & Cradle Ceremony",
    shortDescription: "Certified 925 silver black-bead nazariyas, silver spoons, and cradling ceremony heirlooms.",
    editorialStory: "Protect and cherish life's newest arrivals with gentle, hallmarked silver. Designed with smooth rounded edges and nickel-free purity, our baby collection includes protective nazariya anklets, silver feeding bowls, rattle cups, and engraved silver coins for naming ceremonies.",
    image: "/baby_silver_nazariya.jpg",
    heroImage: "/baby_silver_nazariya.jpg",
    subcategories: ["Baby Gifts", "Naming Ceremony", "Cradle Keepsakes", "Nazariya Bangles", "Silver Dining"],
    relatedSlugs: ["birthday", "gifting", "wedding"],
    metaTitle: "Silver Baby Gifts, Nazariyas & Naming Ceremony Keepsakes | Sri Bhagavathi Silvers",
    metaDescription: "Shop certified 925 silver baby nazariya anklets, silver feeding bowls, and cradle ceremony gifts at Sri Bhagavathi Silvers.",
    productTag: "Baby",
  },
  {
    slug: "pooja",
    name: "Pooja & Sanctum",
    heroTitle: "Pure Silver for Sanctum Devotion",
    heroSubtitle: "Consecrated idols, silver diyas, kalash, and traditional temple ritual articles.",
    tagline: "Sacred Pooja & Sanctum Collection",
    shortDescription: "999 fine silver Ganesha & Lakshmi idols, ornate deepams, and silver ritual vessels.",
    editorialStory: "Silver is the revered metal of divine light and ritual purity. Handcrafted by traditional silversmiths, our Sanctum collection features heavy silver diyas, intricate Lakshmi and Ganesha statues, incense holders, and consecrated silver thali sets.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Silver Diyas", "Divine Idols", "Pooja Vessels", "Silver Thalis", "Temple Keepsakes"],
    relatedSlugs: ["housewarming", "festival", "gifting"],
    metaTitle: "Silver Pooja Articles, Diyas & Consecrated Idols | Sri Bhagavathi Silvers",
    metaDescription: "Explore 999 fine silver Lakshmi Ganesha idols, silver diyas, and temple ritual articles at Sri Bhagavathi Silvers.",
    productTag: "Pooja",
  },
  {
    slug: "festival",
    name: "Festivals & Celebrations",
    heroTitle: "Luminous Silver for Festive Traditions",
    heroSubtitle: "Diwali silver coins, Varalakshmi vratham articles, and festive silver ornaments.",
    tagline: "Diwali, Akshaya Tritiya & Festivities",
    shortDescription: "Certified 999 silver coins, Lakshmi deepams, and festive jewelry for grand celebrations.",
    editorialStory: "From Diwali to Akshaya Tritiya, festivals come alive with the bright shimmer of hallmarked silver. Explore stamped 999 silver bullion coins, traditional floral bangles, temple jhumkas, and divine gift hampers crafted for festive joy.",
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Silver Coins", "Festive Jewelry", "Pooja Articles", "Silver Bullion", "Return Gifts"],
    relatedSlugs: ["pooja", "gifting", "housewarming"],
    metaTitle: "Silver Festival Gifts, Coins & Festive Ornaments | Sri Bhagavathi Silvers",
    metaDescription: "Celebrate Diwali, Akshaya Tritiya, and festivals with 999 fine silver coins, silver diyas, and temple ornaments.",
    productTag: "Festival",
  },
  {
    slug: "anniversary",
    name: "Anniversary",
    heroTitle: "Timeless Silver for Everlasting Bond",
    heroSubtitle: "Romantic silver necklaces, statement rings, and elegant silver anniversary keepsakes.",
    tagline: "Silver Jubilee & Milestone Celebrations",
    shortDescription: "Statement silver rings, delicate stone neckpieces, and memorable anniversary gifts.",
    editorialStory: "Celebrate years of shared love and enduring commitment with handcrafted silver heirlooms. Whether marking a 25th Silver Jubilee or a special milestone, discover modern stone-set silver rings, oxidised chokers, and customized engraved silver coins.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Silver Necklaces", "Statement Rings", "Couple Gifts", "Silver Jubilee", "Custom Bullion"],
    relatedSlugs: ["wedding", "birthday", "gifting"],
    metaTitle: "Silver Anniversary Gifts & Milestone Jewelry | Sri Bhagavathi Silvers",
    metaDescription: "Celebrate milestones with 925 sterling silver anniversary rings, neckpieces, and custom engraved silver heirlooms.",
    productTag: "Anniversary",
  },
  {
    slug: "birthday",
    name: "Birthday",
    heroTitle: "Radiant Silver for Personal Milestones",
    heroSubtitle: "Modern minimalist rings, silver chains, floral earrings, and birthday keepsakes.",
    tagline: "Personal Celebrations & Modern Silver",
    shortDescription: "Contemporary silver jewelry, minimalist chains, floral studs, and birthday gifts.",
    editorialStory: "Make birthdays unforgettable with versatile, everyday luxury silver. Designed for effortless modern style, our birthday collection features minimalist geometric rings, floral jhumkas, lightweight silver chains, and silver charm bangles.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["Silver Chains", "Minimalist Rings", "Floral Earrings", "Silver Bracelets", "Silver Coins"],
    relatedSlugs: ["gifting", "anniversary", "baby"],
    metaTitle: "Silver Birthday Gifts & Modern Jewelry | Sri Bhagavathi Silvers",
    metaDescription: "Discover contemporary 925 silver rings, chains, and floral earrings for birthday gifting at Sri Bhagavathi Silvers.",
    productTag: "Birthday",
  },
  {
    slug: "gifting",
    name: "Curated Gifting",
    heroTitle: "Thoughtfully Curated Silver Gifts",
    heroSubtitle: "Interactive gift finder, hallmarked silver coins, and corporate return gifts.",
    tagline: "Guided Silver Gift Finder & Bullion",
    shortDescription: "Curated silver coins, custom return gifts, and interactive gift-finder for every budget.",
    editorialStory: "Giving silver is giving eternal value and blessing. Use our interactive Gifting Tool to filter by recipient, occasion, and budget to find certified 999 silver coins, silver articles, and luxury jewelry sets ready for presentation.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=85",
    heroImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2000&q=85",
    subcategories: ["For Her", "For Him", "For Parents", "For Devotees", "Silver Coins", "Corporate Gifts"],
    relatedSlugs: ["wedding", "housewarming", "festival"],
    metaTitle: "Curated Silver Gifts & Interactive Gift Finder | Sri Bhagavathi Silvers",
    metaDescription: "Find the perfect silver gift using our guided gift finder. Shop certified 999 silver coins and articles for all occasions.",
    productTag: "Gifting",
  },
];

export function getOccasionBySlug(slug: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.slug.toLowerCase() === slug.toLowerCase());
}
