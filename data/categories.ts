export interface Category {
  id: string;
  name: string;
  count?: number;
  image: string;
  alt: string;
  href: string;
  description?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "rings",
    name: "Silver Rings",
    count: 18,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW7_d9BeF9-rkPp7KgexqRyKdBpMQCDz3AWVUEkvMyjrGpcGTq29MtqyB1K1yUmFgZUphYCEqqa-LO_WQ-Jz1gMWCbcT1dCVGWHigjiseuyPScOr8dRn1_UVnP-0Qk1hehK7Z8Wid4sTnzCCA8mpZtS1t3wNWr5KLuqVZChLB4GzN5HPDszV4-1POIwGptQHw2xyO5EVcKy2XcSZfu97kwjHRZc_D1o93WzDNbzDcfWR73CNVK5G4U",
    alt: "Silver Cocktail Ring",
    href: "/shop?category=rings",
    description: "Intricate filigree and gemstone rings"
  },
  {
    id: "chains",
    name: "Silver Chains",
    count: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC391dVUb9VKN9XL5Ni1pXV8gA83tuP2Kh5YE_fnE7nphugOjqSPOUD9dnnqv-LHAVq9vhQTa1FfM-ZACcABhs4HxtAES8B6TBliuHFWebM6yPQ242RPszoTC16RLChEm_NQWYqHpBtqr31W1zHIeEwPHB7etn3inQG80_iFOXpl0O4FimOVJJ4HDH_W6r2fHC7GYAFU4iQUPdCSfneR6LJbeHarrtFTb5-nIlpZPbQvsrIS_CgCexm",
    alt: "Hand-linked silver chains",
    href: "/shop?category=chains",
    description: "Traditional thali kodi rope & link chains"
  },
  {
    id: "bracelets",
    name: "Silver Bracelets",
    count: 16,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbXypM2o-iMt66bq_FxXbhJdEaEAgS8HaqnjJafYr9cKOnP1yvbe1uQDYP9dZMZLtTmwJeP4VcA-a13xcFf7SefDor9QEhFLRO6NGcZEXBK__J2fjdqbiOwuIKcRtSoAglg4mWQg63VznK_JRBygsVBW7_vFD7c_9XQf1zx-wigoG8SN7pn7DSsfFjsy5iycUa0d-7ogqerakCYiFsZdJOwwWEr0qmLcBlN0Gwb6eb6MrnSVn-s_cQ",
    alt: "Sterling silver kada bracelet",
    href: "/shop?category=bracelets",
    description: "Makara finial kadas & carved cuffs"
  },
  {
    id: "anklets",
    name: "Silver Anklets (Kolusu)",
    count: 14,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI0NoTylHu4iB5ipmHsdS-YFAArrw-uCcgxqTRzW65doaUSSwAhdoGhQl28kcCA84D86TbV_YxHmPzlZH5HnsgMh4ifMZydBvTfj-1GUz61DOYqfzsdYp73YLRbMCDe06tdKDtPZLYSMxG5Bk96B7Dm662U0xZD6BXmoYvZKxNB7BE6eKEbD_6aPd_WEZUvGbfqXuxjueDbtlsK3sbk_ornO6DrMo0RMRhGVVB5K3uIh9oNZtx1-MF",
    alt: "South Indian silver kolusu anklet",
    href: "/shop?category=anklets",
    description: "Authentic tinkling payal anklets"
  },
  {
    id: "earrings",
    name: "Silver Earrings (Jhumkas)",
    count: 14,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgJ68rs5lWru0g6Ae2-YX9vCd6ySFpZYP0PRWUA4CobH6d0hPpUlCDf6URLGUluaGXTN1-AmOlxEHuuY4vbsFt0T6F7APW21vm_Fc3pWUJjGU0-FLbNqD_Xmng_rhlx-S4_E2dyqgCK7EtZDAaYxchQw43mYOjgQsmUZG6I5kuYVmqpRp4-Hl_hAUU_xnks5_ffIHHLZuiXBuMctHPuvP-QQZWWbByQ8r5BcDqulYS3StODtz2HhlP",
    alt: "Traditional silver temple jhumkas",
    href: "/shop?category=earrings",
    description: "Temple kemp & pearl jhumka drops"
  },
  {
    id: "necklaces",
    name: "Silver Necklaces",
    count: 9,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJyu9qHf2J-Gw9OeDt_7fCNL94J--jtz3vFBA4HiKAAUG6FiyfcZ-B0-L4iMvh_rPjMVczNTiMMnb9x_IrrUvlYsga_e_vbUoOzQ7DI4CivgNt9YWv0jhWnRTbVzOr-J1xL2vA0x3nZP9l7tGVa7h-0VLNzpPASN8-FHICujb5TxrU3Z7aU0D2ha3TQ0P5AhFDyPowBKsPLG-Anj3504dAdRNMVNItGOt_sHfYIeiFZ81aNo4yKXrr",
    alt: "Guttapusalu silver necklace",
    href: "/shop?category=necklaces",
    description: "Heritage chokers & Kasu malas"
  },
  {
    id: "articles",
    name: "Silver Articles & Dining",
    count: 15,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL4ZHJballUMddbhgvJ07QygDrNZxq2vQ-msqoHsNhByUh7jbOpM6vrXsxNPn-bv3etyswE4p5D8FlXWIbkXViizn276ukWrMdMVxvTG3kc6ZN2GM4abAixgMDSG4cW7A3B1EQm5ZX--xTLPQLPh4PDvu8Lomk5lAERZylDSVs0cLlKYCg_jSlE2K0JyQFBXi1mCnz-IqFnOJTC9no3pXWc_zdYfU4wz3yk8Q2SbiVh8D5bPZIhxD7",
    alt: "Pure silver dining plate set",
    href: "/pooja-and-articles",
    description: "Dining thalis, tumblers & tableware"
  },
  {
    id: "pooja",
    name: "Pooja Collection",
    count: 22,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJsJNjsfhqhYNiIY5kHFh5KqLUR1YdNJ2QA7P9EQi66BrSBPly29FOcKEBq4uARR1bSkJu3dM39RazWYcD8_1m9JGadeMHT0DFJDf2WezwBG5EQ-4eibd0CyPz8vb6umVlgsuoAhmQCCyPMBLEkX8qLuo-2acGSfi_KODdOj3kMX3GNB0THjMJiRAGB4rG5grn1kcXQLNNWcMaXsaimAr5Wx6J6ssLmLxF8Jy9M8LjcLhNtpwaEOZs",
    alt: "Silver Kamakshi lamp and kalash",
    href: "/pooja-and-articles",
    description: "Kamakshi deepams & sanctum idols"
  }
];
