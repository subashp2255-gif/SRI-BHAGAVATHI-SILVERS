/**
 * Centralized Single Source of Truth for Sri Bhagavathi Silvers Store Location & Business Data.
 * 
 * Verified Address:
 * 714, Vasavi Towers, Raja St, Town Hall, Coimbatore, Tamil Nadu 641001, India
 */

export const STORE_CONFIG = {
  name: "Sri Bhagavathi Silvers",
  tagline: "Flagship Silver Showroom & Craft Salon",
  address: {
    building: "Vasavi Towers",
    doorNo: "714",
    street: "Raja St",
    area: "Town Hall",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641001",
    country: "India",
    shortFormatted: "714, Vasavi Towers, Raja St, Town Hall, Coimbatore – 641001",
    fullFormatted: "714, Vasavi Towers, Raja St, Town Hall, Coimbatore, Tamil Nadu 641001, India",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=714+Vasavi+Towers+Raja+St+Town+Hall+Coimbatore+Tamil+Nadu+641001",
  embedMapUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || "https://maps.google.com/maps?q=714,+Vasavi+Towers,+Raja+St,+Town+Hall,+Coimbatore,+Tamil+Nadu+641001&t=&z=16&ie=UTF8&iwloc=&output=embed",
  phone: "+91 422 234 5678",
  phoneRaw: "+914222345678",
  email: "boutique@bhagavathisilvers.com",
  hours: "Monday – Sunday: 10:00 AM – 8:30 PM (Open All 7 Days)",
  landmarks: "Located near Town Hall Heritage Zone on Raja Street, Vasavi Towers.",
};

export const STORE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  "name": STORE_CONFIG.name,
  "image": "https://bhagavathisilvers.com/logo-emblem.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": `${STORE_CONFIG.address.doorNo}, ${STORE_CONFIG.address.building}, ${STORE_CONFIG.address.street}, ${STORE_CONFIG.address.area}`,
    "addressLocality": STORE_CONFIG.address.city,
    "addressRegion": "TN",
    "postalCode": STORE_CONFIG.address.pincode,
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.9972,
    "longitude": 76.9606,
  },
  "url": "https://bhagavathisilvers.com",
  "telephone": STORE_CONFIG.phoneRaw,
  "openingHours": "Mo-Su 10:00-20:30",
  "priceRange": "₹₹-₹₹₹",
};
