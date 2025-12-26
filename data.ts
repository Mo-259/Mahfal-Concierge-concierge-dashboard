import { Coffee, Camera, Hexagon, Music, Lightbulb, Info } from 'lucide-react';
import React from 'react';

export interface DemoSpace {
  id: number;
  name: string;
  area: string;
  cap: string;
  price: string;
  tags: string[];
  img: string;
}

export const demoSpaces: DemoSpace[] = [
  { id: 1, name: "The Glass Atrium", area: "Downtown", cap: "120 Guests", price: "$2,500+", tags: ["Modern", "Light"], img: "https://picsum.photos/600/400?random=10" },
  { id: 2, name: "Villa Serenity", area: "Coastal", cap: "200 Guests", price: "$5,000+", tags: ["Outdoor", "Luxury"], img: "https://picsum.photos/600/400?random=11" },
  { id: 3, name: "Industrial Loft 404", area: "Art District", cap: "80 Guests", price: "$1,200+", tags: ["Raw", "Edgy"], img: "https://picsum.photos/600/400?random=12" },
  { id: 4, name: "Secret Garden", area: "Suburbs", cap: "50 Guests", price: "$900+", tags: ["Green", "Intimate"], img: "https://picsum.photos/600/400?random=13" },
  { id: 5, name: "Onyx Banquet Hall", area: "North Side", cap: "350 Guests", price: "$4,000+", tags: ["Grand", "Formal"], img: "https://picsum.photos/600/400?random=14" },
  { id: 6, name: "Skyline Terrace", area: "Downtown", cap: "40 Guests", price: "$3,000+", tags: ["View", "Premium"], img: "https://picsum.photos/600/400?random=15" },
];

export const demoStories = [
  { title: "An engagement curated in 24 hours", cat: "Celebration", desc: "How we turned a panic request into a sunset masterpiece.", img: "https://picsum.photos/800/600?random=20" },
  { title: "A rooftop birthday, fully styled", cat: "Social", desc: "Neon lights, custom cocktails, and zero stress.", img: "https://picsum.photos/400/400?random=21" },
  { title: "A corporate dinner that felt effortless", cat: "Business", desc: "Hosting 50 executives without the usual headache.", img: "https://picsum.photos/400/400?random=22" },
];

export const demoSuppliers = [
  { label: "Catering", icon: Coffee },
  { label: "Photography", icon: Camera },
  { label: "Decoration", icon: Hexagon },
  { label: "Entertainment", icon: Music },
];

export const demoTestimonials = [
  { quote: "I didn't think a service like this existed. They found a venue I couldn't find on Google in 2 hours.", author: "James R.", type: "Engagement", loc: "Downtown" },
  { quote: "The curated shortlist saved me days of calling around. The prices were actually transparent.", author: "Layla M.", type: "Corporate", loc: "North Side" },
];