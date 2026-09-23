export interface InstagramPost {
  id: string;
  url: string;
  type: "post" | "reel";
  title: string;
  caption: string;
  thumbnail: string;
  likes: string;
  comments: string;
  date: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    url: "https://www.instagram.com/p/C3x9Y0SL8mX/",
    type: "post",
    title: "Royal Kasu Mala & Temple Kemp Choker",
    caption: "Sacred South Indian heritage hand-stamped Lakshmi kasu coins in 925 sterling silver. Crafted for wedding trousseaus and sacred temple vows.",
    thumbnail: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85",
    likes: "3.4K",
    comments: "142",
    date: "18 Sep 2026",
  },
  {
    id: "post-2",
    url: "https://www.instagram.com/reel/C4A1XbSL9pY/",
    type: "reel",
    title: "Master Silversmith At Work — Kamakshi Lamp",
    caption: "Behind the scenes at our Coimbatore workshop: Hand-chasing pure 999 fine silver Kamakshi deepams for Griha Pravesam ceremonies.",
    thumbnail: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85",
    likes: "8.9K",
    comments: "320",
    date: "16 Sep 2026",
  },
  {
    id: "post-3",
    url: "https://www.instagram.com/p/C2v8MmSL7qZ/",
    type: "post",
    title: "Infant Nazariya Protection Kolusu",
    caption: "Skin-friendly 925 silver baby bangles with protective black obsidian beads and musical ghungroo chimes. Made with love for cradle ceremonies.",
    thumbnail: "/baby_silver_nazariya.jpg",
    likes: "2.1K",
    comments: "98",
    date: "12 Sep 2026",
  },
  {
    id: "post-4",
    url: "https://www.instagram.com/p/C1n6KkSL5xW/",
    type: "post",
    title: "999 Fine Silver Lakshmi Pooja Coins",
    caption: "High-relief minted pure silver Lakshmi & Ganesha coins in velvet gift casing with assay hallmark purity certificates.",
    thumbnail: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1000&q=85",
    likes: "4.7K",
    comments: "215",
    date: "08 Sep 2026",
  },
  {
    id: "post-5",
    url: "https://www.instagram.com/p/C0m4JjSL3vU/",
    type: "post",
    title: "Bridal Silver Anklet (Payal Kolusu) Collection",
    caption: "Ornate South Indian peacock filigree anklets designed to chime gracefully with every step of the bride.",
    thumbnail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    likes: "5.2K",
    comments: "189",
    date: "04 Sep 2026",
  },
];
