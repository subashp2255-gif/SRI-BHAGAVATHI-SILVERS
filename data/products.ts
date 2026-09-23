export interface Product {
  id: string;
  name: string;
  category: string; // 'rings' | 'anklets' | 'chains' | 'bracelets' | 'pooja' | 'necklaces' | 'articles' | 'coins'
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  netWeight: string;
  purityBadge: string;
  badgeType?: 'primary' | 'secondary' | 'accent' | 'gold';
  image: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  style?: string[]; // e.g., ['Traditional', 'Temple', 'Floral', 'Minimal', 'Contemporary', 'Divine']
  collection?: string; // e.g., 'Sanctum & Temple', 'Royal Silver Heritage', 'Modern Silver', 'Divine Keepsakes'
  occasions?: string[]; // e.g., ['Wedding', 'Pooja', 'Housewarming', 'Baby', 'Festival', 'Anniversary', 'Gifting']
  tags?: string[];
  story?: string;
  careInstructions?: string;
  specs?: {
    metal: string;
    hallmark: string;
    dimensions?: string;
    finish?: string;
  };
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Silver Cocktail Ring",
    category: "rings",
    categoryLabel: "Silver Rings",
    price: 3250,
    formattedPrice: "₹3,250",
    netWeight: "12.40g",
    purityBadge: "92.5 SILVER",
    badgeType: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
    description: "High luxury studio macro photo of an antique silver cocktail ring engraved with floral South Indian filigree and small garnet gemstone accent.",
    inStock: true,
    featured: true,
    style: ["Floral", "Traditional", "Contemporary"],
    collection: "Modern Silver",
    occasions: ["Anniversary", "Gifting", "Festival"],
    tags: ["Ring", "Filigree", "Sterling Silver", "Garnet"],
    story: "Forged with intricate petal geometry, this statement ring captures the botanical art of traditional South Indian artisan workshops.",
    careInstructions: "Wipe gently with the provided microfiber silver polish cloth. Store in dry airtight velvet box away from perfumes.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Stamped",
      finish: "Oxidized Antique Finish"
    }
  },
  {
    id: "p2",
    name: "Traditional Peacock Silver Anklet",
    category: "anklets",
    categoryLabel: "Silver Anklets (Kolusu)",
    price: 6800,
    formattedPrice: "₹6,800",
    netWeight: "42.00g",
    purityBadge: "ANTIQUE FINISH",
    badgeType: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWFKfS6Go96TEmCGI2yWSkTCAd5-HnZ5yc3hg2h1l7wHe4S0lpYjs5tWKWfYxZsBEU-zjOch4dXSDpEzee5gQAODDsx6YRXTHyJMZCfUjJhpgk1hUO0oGnytSfBJaKGF0p1Km069X8qJ8vvaPX1qjq3K0FULjDfjCsj0p0LUJHG2iHkdEiS9_cq0bKG_vNXHy7nxd6YqG521L3yjihJ8_SqyNKZ5T6lRbLj34MO2oGzXbNuITZ-yAg",
    description: "Authentic South Indian silver kolusu payal anklet pair with delicate tinkling bells and detailed filigree peacock feather mesh pattern.",
    inStock: true,
    featured: true,
    isBestSeller: true,
    style: ["Traditional", "Temple"],
    collection: "Royal Silver Heritage",
    occasions: ["Wedding", "Festival", "Anniversary"],
    tags: ["Anklet", "Kolusu", "Peacock", "Payal"],
    story: "Handcrafted anklets designed with classic ghungroo bells that emit a harmonious musical chime with every step.",
    careInstructions: "Avoid direct contact with water and domestic cleaners. Use warm water with mild soap for deep cleaning if needed.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Hallmark",
      dimensions: "10.5 inches standard",
      finish: "Chased Antique Beadwork"
    }
  },
  {
    id: "p3",
    name: "Handcrafted Heritage Silver Chain",
    category: "chains",
    categoryLabel: "Silver Chains",
    price: 4900,
    formattedPrice: "₹4,900",
    netWeight: "24.50g",
    purityBadge: "92.5 SILVER",
    badgeType: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnAWXenGMkuIi1rhgJFkonE9TInAa4M3HLsd3XoJPWhZEMpsKnziGQaKOPilpaC_F1TsL5cNPKL_l8VdJjC61d06D3Vjh9FS3arJKEAltdvVsRL1Vk9h0cxAb8cMVlrE3OKQMdPe-5VJ7xisMe7YLc_NUtibZnhaxvQuPc70DmX3rnSPiPWHU485XuGGOceOKUCMDmYpob590P2mmespkHSDuFbBOP3RIWWkdTnhDCZmrUBDVPvnr",
    description: "Solid silver handcrafted heritage link chain with ornate clasps, showing authentic silver sheen and heavy gauge links.",
    inStock: true,
    featured: true,
    style: ["Minimal", "Traditional"],
    collection: "Royal Silver Heritage",
    occasions: ["Gifting", "Festival", "Anniversary"],
    tags: ["Chain", "Sterling Silver", "Link Chain"],
    story: "Engineered with interlocking gauge links that balance strength with fluid drape across the neckline.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Stamped",
      dimensions: "22 inches length",
      finish: "High-Polish Silver"
    }
  },
  {
    id: "p4",
    name: "Pure Silver Lakshmi Pooja Coin",
    category: "coins",
    categoryLabel: "Silver Coins & Bullion",
    price: 2450,
    formattedPrice: "₹2,450",
    netWeight: "20.00g",
    purityBadge: "99.9 FINE SILVER",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMHNOlGI0dreKAMQAhRm7fEfRH-T9d157VYXs_7K--58_vo74cwDu9wIuJPNseR-dxeE7XB_PpuufVNK9oP03jenxjctjaVL1YHOCXZ7cVd75VAh40EWBDRdhfjkQKGW9vYR9A5gBL_Zh_09F32yCENYhVgGM15-0CXfO6s6uslwLn5Hry_yfVxLDh_7j9b3_coKy-WA6A4xkAxp-HUFA_3o9Vpg6IefBlDZ_XfGVgE77KHpu66wl",
    description: "Pure silver 999 fine Goddess Lakshmi embossed pooja coin in velvet gift casing with official purity assay certificate.",
    inStock: true,
    featured: true,
    style: ["Divine", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Pooja", "Housewarming", "Festival", "Gifting", "Baby"],
    tags: ["Coin", "999 Silver", "Lakshmi", "Bullion"],
    story: "Minted in pure 999 fine silver with high-relief embossing of Goddess Lakshmi, ideal for Deepavali, Varalakshmi Vratham, and auspicious family blessings.",
    specs: {
      metal: "999 Fine Bullion Silver",
      hallmark: "Assay Certified",
      finish: "Proof Quality Embossed"
    }
  },
  {
    id: "p5",
    name: "Sri Lakshmi Kasu Mala Choker",
    category: "necklaces",
    categoryLabel: "Silver Necklaces",
    price: 8400,
    formattedPrice: "₹8,400",
    netWeight: "36.80g",
    purityBadge: "NEW RELEASE",
    badgeType: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz1IRM1yCDzdU7AK_pwkQOPxzqZKYu-x-p2iIGUCNt6hoRKIaRzxWLH5XzuEhJMVzLtatSojNm63kN3rRw-A145i7MD94S3F7-RJ84O39AacDLRjJvA85xTEUPUfvheJVXNTNGOj5sWXb7tdwcLOZA5jHy3aE5Oao4kgc0HcBFk5I7vZNtW5EMyzBwj_QOE-Se2MvicqD6l0xg2rKDd7hH7bi_pgZFdYrY5sNxMq_HM86tWWwtrqrH",
    description: "Traditional silver Kasu mala coin necklace featuring detailed stamped Lakshmi coins in pure 925 sterling silver.",
    inStock: true,
    isNewArrival: true,
    style: ["Temple", "Traditional", "Divine"],
    collection: "Sanctum & Temple",
    occasions: ["Wedding", "Festival", "Pooja"],
    tags: ["Necklace", "Kasu Mala", "Temple Jewellery"],
    story: "The quintessential Kasu Mala featuring coin motifs of Gajalakshmi, representing wealth and prosperity across generations.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Stamped",
      finish: "Temple Gold Accent & Antique Silver"
    }
  },
  {
    id: "p6",
    name: "Infant Nazariya Silver Bangles",
    category: "bracelets",
    categoryLabel: "Silver Bracelets",
    price: 2900,
    formattedPrice: "₹2,900",
    netWeight: "16.20g",
    purityBadge: "KIDS HERITAGE",
    badgeType: "accent",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfYg9OibdgI7Rz7QFmKIjs-s5pzetgcW9L7JBEFoMT438c_YhKwTBw7m5dNd3-LPq_7LrH0jhKsuKjwwPJ7FiOcgNjHCEu_jXxkOkK2NCofY6B5-M6NvfLDiZSflyDCHeq04S1sdfgi9_jRlDasS2MyzSobhShOjW8ZBW4FXYpSmpNXSVocQme1bYaj0nCQiRgthBo7uuLstBfFsvdIwU0uxajEjIvoh4NG1ELp8dGN4DNpahJtgP0",
    description: "Handmade pure silver baby bangles valayal with delicate protective evil-eye nazariya black and silver beads.",
    inStock: true,
    isNewArrival: true,
    style: ["Minimal", "Traditional"],
    collection: "Royal Silver Heritage",
    occasions: ["Baby", "Gifting"],
    tags: ["Baby Bangles", "Nazariya", "Silver Valayal"],
    story: "Smooth, skin-friendly solid silver bangles created specifically for infants with protective traditional black beads.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Hallmark",
      dimensions: "Adjustable size for infants"
    }
  },
  {
    id: "p7",
    name: "Royal Kamakshi Vilakku Deepam",
    category: "pooja",
    categoryLabel: "Pooja Collection",
    price: 18200,
    formattedPrice: "₹18,200",
    netWeight: "145.00g",
    purityBadge: "POOJA ARTICLE",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
    description: "Pure silver intricate Kamakshi deepam pooja lamp standing tall with engraved floral base and polished silver oil well.",
    inStock: true,
    isNewArrival: true,
    style: ["Divine", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Pooja", "Housewarming", "Wedding"],
    tags: ["Kamakshi Lamp", "Pooja", "Silver Deepam"],
    story: "Cast in heavy gauge silver featuring Goddess Kamakshi enthroned above a polished oil reservoir, invoking divine light into sacred spaces.",
    specs: {
      metal: "92.5 Fine Silver",
      hallmark: "BIS 925 Assayed",
      dimensions: "7.5 inches height"
    }
  },
  {
    id: "p8",
    name: "Engraved Temple Motif Kada",
    category: "bracelets",
    categoryLabel: "Silver Bracelets",
    price: 5450,
    formattedPrice: "₹5,450",
    netWeight: "28.10g",
    purityBadge: "LIMITED",
    badgeType: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv-tVt6EWKA0OHCaG8yW-bEMau95yLtPSGyZMCSs5YLlZ_MDSOj1Q725mAPfl0oWaOtibFJjCYCBhiaG1hrcEbqpP0rq1aXOp0w_EbnCaSNeZ6bRPoTXGk2jSfdfMj5GLCxcCyEHAHwPRh0x-rk-Ql8zaKtTfSL7GCQXzCkfG1kNI3u1nQtIzN_jX1wxr2v8fP6SOR2TswKtV6cU2mO3tzPSUKbEZJe1gtq4B9mawgHZ-3wA18wQv0",
    description: "Contemporary yet traditional 925 sterling silver cuff bracelet featuring embossed temple carving motifs.",
    inStock: true,
    isNewArrival: true,
    style: ["Contemporary", "Temple"],
    collection: "Modern Silver",
    occasions: ["Anniversary", "Gifting", "Festival"],
    tags: ["Kada", "Cuff", "Sterling Silver"],
    story: "An open cuff sculpted with relief architecture inspired by South Indian temple pillars and friezes.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Stamped",
      dimensions: "Free size open cuff"
    }
  },
  {
    id: "p9",
    name: "Antique Temple Jhumka Earrings",
    category: "earrings",
    categoryLabel: "Silver Earrings (Jhumkas)",
    price: 7200,
    formattedPrice: "₹7,200",
    netWeight: "32.50g",
    purityBadge: "92.5 SILVER",
    badgeType: "primary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ68rs5lWru0g6Ae2-YX9vCd6ySFpZYP0PRWUA4CobH6d0hPpUlCDf6URLGUluaGXTN1-AmOlxEHuuY4vbsFt0T6F7APW21vm_Fc3pWUJjGU0-FLbNqD_Xmng_rhlx-S4_E2dyqgCK7EtZDAaYxchQw43mYOjgQsmUZG6I5kuYVmqpRp4-Hl_hAUU_xnks5_ffIHHLZuiXBuMctHPuvP-QQZWWbByQ8r5BcDqulYS3StODtz2HhlP",
    description: "Grand traditional silver temple jhumkas with ruby red stone cabochon studs and hanging tiny pearl drops.",
    inStock: true,
    isBestSeller: true,
    style: ["Temple", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Wedding", "Festival", "Anniversary"],
    tags: ["Jhumka", "Temple Earrings", "Kemp Stone"],
    story: "Classic bell-shaped jhumkas studded with ruby-hued kemp stones and finished with delicate pearl clusters.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Hallmarked",
      finish: "Temple Kemp Stone & Pearls"
    }
  },
  {
    id: "p10",
    name: "Royal Silver Thali & Dinner Set",
    category: "articles",
    categoryLabel: "Silver Articles & Dining",
    price: 42500,
    formattedPrice: "₹42,500",
    netWeight: "320.00g",
    purityBadge: "HERITAGE HEIRLOOM",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
    description: "High-polish pure silver dining plate thali, silver tumbler, silver katori bowls and spoon set placed on royal cream silk table setting.",
    inStock: true,
    isBestSeller: true,
    style: ["Traditional", "Minimal"],
    collection: "Royal Silver Heritage",
    occasions: ["Wedding", "Housewarming", "Gifting", "Baby"],
    tags: ["Thali Set", "Silver Plate", "Dining Set", "Heirloom"],
    story: "A magnificent 5-piece silver dining set handcrafted in high-shine mirror polish for ceremonial dining and family heirlooms.",
    specs: {
      metal: "92.5 Fine Silver",
      hallmark: "BIS 925 Stamped",
      finish: "Mirror Polish Finish"
    }
  },
  {
    id: "p11",
    name: "Sanctum Silver Kalash Pot",
    category: "pooja",
    categoryLabel: "Pooja Collection",
    price: 22800,
    formattedPrice: "₹22,800",
    netWeight: "185.00g",
    purityBadge: "99.9 FINE SILVER",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJsJNjsfhqhYNiIY5kHFh5KqLUR1YdNJ2QA7P9EQi66BrSBPly29FOcKEBq4uARR1bSkJu3dM39RazWYcD8_1m9JGadeMHT0DFJDf2WezwBG5EQ-4eibd0CyPz8vb6umVlgsuoAhmQCCyPMBLEkX8qLuo-2acGSfi_KODdOj3kMX3GNB0THjMJiRAGB4rG5grn1kcXQLNNWcMaXsaimAr5Wx6J6ssLmLxF8Jy9M8LjcLhNtpwaEOZs",
    description: "Consecrated pure silver kalash pot with traditional engraved peacock motifs for Varalakshmi and housewarming poojas.",
    inStock: true,
    style: ["Divine", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Pooja", "Housewarming", "Wedding"],
    tags: ["Kalash", "Silver Pot", "Pooja Article"],
    story: "Replete with auspicious engravings, this sacred silver kalash forms the spiritual focal point of housewarming and ritual ceremonies.",
    specs: {
      metal: "999 Fine Silver",
      hallmark: "Purity Assayed",
      finish: "Traditional Hand Chased"
    }
  },
  {
    id: "p12",
    name: "Statement Guttapusalu Choker",
    category: "necklaces",
    categoryLabel: "Silver Necklaces",
    price: 16500,
    formattedPrice: "₹16,500",
    netWeight: "78.40g",
    purityBadge: "ANTIQUE FINISH",
    badgeType: "secondary",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJyu9qHf2J-Gw9OeDt_7fCNL94J--jtz3vFBA4HiKAAUG6FiyfcZ-B0-L4iMvh_rPjMVczNTiMMnb9x_IrrUvlYsga_e_vbUoOzQ7DI4CivgNt9YWv0jhWnRTbVzOr-J1xL2vA0x3nZP9l7tGVa7h-0VLNzpPASN8-FHICujb5TxrU3Z7aU0D2ha3TQ0P5AhFDyPowBKsPLG-Anj3504dAdRNMVNItGOt_sHfYIeiFZ81aNo4yKXrr",
    description: "Statement antique South Indian silver necklace guttapusalu pattern choker resting on a dark velvet jewelry bust with silver patina.",
    inStock: true,
    style: ["Temple", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Wedding", "Anniversary"],
    tags: ["Guttapusalu", "Choker", "Heritage Necklace"],
    story: "Featuring fringe clusters of natural seed pearls suspended from handcrafted silver kalasam motifs.",
    specs: {
      metal: "925 Sterling Silver",
      hallmark: "BIS 925 Stamped",
      finish: "Guttapusalu Pearl Clusters"
    }
  },
  {
    id: "p13",
    name: "Pure 999 Silver Investment Bar 50g",
    category: "coins",
    categoryLabel: "Silver Coins & Bullion",
    price: 5200,
    formattedPrice: "₹5,200",
    netWeight: "50.00g",
    purityBadge: "99.9 BULLION",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtMHNOlGI0dreKAMQAhRm7fEfRH-T9d157VYXs_7K--58_vo74cwDu9wIuJPNseR-dxeE7XB_PpuufVNK9oP03jenxjctjaVL1YHOCXZ7cVd75VAh40EWBDRdhfjkQKGW9vYR9A5gBL_Zh_09F32yCENYhVgGM15-0CXfO6s6uslwLn5Hry_yfVxLDh_7j9b3_coKy-WA6A4xkAxp-HUFA_3o9Vpg6IefBlDZ_XfGVgE77KHpu66wl",
    description: "Certified 50 gram pure silver bullion ingot bar with serial number and tampering seal, perfect for gifting and wealth reservation.",
    inStock: true,
    isNewArrival: true,
    style: ["Minimal", "Divine"],
    collection: "Royal Silver Heritage",
    occasions: ["Gifting", "Festival", "Housewarming", "Baby"],
    tags: ["Bullion", "50g Bar", "999 Silver"],
    story: "Individually serial-numbered and sealed in tamper-evident protective assay casing for enduring value.",
    specs: {
      metal: "999 Pure Fine Silver",
      hallmark: "Assay Certified Serialized",
      finish: "Mint Proof Finish"
    }
  },
  {
    id: "p14",
    name: "Silver Lakshmi Ganesha Idol Pair",
    category: "pooja",
    categoryLabel: "Pooja Collection",
    price: 12500,
    formattedPrice: "₹12,500",
    netWeight: "95.00g",
    purityBadge: "SANCTUM IDOL",
    badgeType: "gold",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebFltOEMAcE6R6mZ6Z1TBZfH4-TijfaIpJ__GrkTG0O29yBaY3abO2Jol3K4nvXyBF1AS-Hez068b7KSVSZYh1KHRXCPQwTUJMAFDani3kGocj-Rz6LWGSXwaVjigaazw-JBmCfAzeQF_u8vBFv0zzFLYnAWTCAT0DeXBM6RE6t2ztp-hodot759T_d38hxC__x7oD3TNdK6TKvh9n4bcwrvRqfAF3wIXdUrrMHuDswNK1MH68jTz",
    description: "Sculpted pure silver Lord Ganesha and Goddess Lakshmi statues for home altar worship and Deepavali blessings.",
    inStock: true,
    featured: true,
    style: ["Divine", "Traditional"],
    collection: "Sanctum & Temple",
    occasions: ["Pooja", "Housewarming", "Festival", "Gifting"],
    tags: ["Idol", "Ganesha", "Lakshmi", "Silver Statue"],
    story: "Directly modeled after classical South Indian temple icons, bringing auspicious harmony and removal of obstacles.",
    specs: {
      metal: "999 Fine Silver",
      hallmark: "BIS Hallmarked",
      dimensions: "3.5 inches height"
    }
  }
];
