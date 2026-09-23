export interface Testimonial {
  id: string;
  author: string;
  location: string;
  badge: string;
  rating: number;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Meenakshi Sundaram",
    location: "Chennai",
    badge: "Verified Heirloom Patron",
    rating: 5,
    text: "We ordered the complete Kamakshi Vilakku and pooja thali set for our daughter's housewarming in Chennai. The hallmark purity and heavy weight of the silver were beyond expectations. Truly regal work."
  },
  {
    id: "t2",
    author: "Pavitra Ramesh",
    location: "Bangalore",
    badge: "Verified Buyer",
    rating: 5,
    text: "The Peacock Kolusu (anklet) arrived via insured transit in Bangalore. The sound of the bells, the detailed chasing, and the 925 BIS stamp give complete peace of mind. Will order all festive silver from here."
  },
  {
    id: "t3",
    author: "Karthik Narayanan",
    location: "Coimbatore",
    badge: "Flagship Store Visitor",
    rating: 5,
    text: "Visited their flagship boutique directly in Coimbatore. The warm hospitality of the staff and transparency regarding silver tare and making charges is unmatched in South India."
  }
];
