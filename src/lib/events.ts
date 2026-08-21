import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";

export type EventCategory =
  | "Trending Movies"
  | "Live Concerts"
  | "Local Fairs"
  | "Stand-up Comedy";

export type TicketEvent = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  price: number;
  faceValue: number;
  poster: string;
  category: EventCategory;
  source: "B2C Official" | "C2C Verified Seller";
  seatsRemaining: number;
  sellerRating: number;
  sellerName: string;
};

export const EVENTS: TicketEvent[] = [
  {
    id: "neon-noir-premiere",
    title: "Neon Noir — Midnight Premiere",
    venue: "Grand Marquee Cinemas",
    city: "Chennai",
    date: "Sat, 29 Aug",
    time: "11:45 PM",
    price: 420,
    faceValue: 450,
    poster: event1,
    category: "Trending Movies",
    source: "B2C Official",
    seatsRemaining: 12,
    sellerRating: 4.9,
    sellerName: "Grand Marquee Box Office",
  },
  {
    id: "amber-lights-live",
    title: "Amber Lights Live Tour",
    venue: "Riverside Arena",
    city: "Bengaluru",
    date: "Fri, 04 Sep",
    time: "7:30 PM",
    price: 1850,
    faceValue: 1900,
    poster: event2,
    category: "Live Concerts",
    source: "C2C Verified Seller",
    seatsRemaining: 4,
    sellerRating: 4.7,
    sellerName: "Priya R.",
  },
  {
    id: "late-set-comedy",
    title: "The Late Set — Stand-up Night",
    venue: "Velvet Room Club",
    city: "Mumbai",
    date: "Thu, 11 Sep",
    time: "9:00 PM",
    price: 690,
    faceValue: 750,
    poster: event3,
    category: "Stand-up Comedy",
    source: "C2C Verified Seller",
    seatsRemaining: 7,
    sellerRating: 4.8,
    sellerName: "Arun K.",
  },
  {
    id: "harbour-street-fair",
    title: "Harbour Street Fair Pass",
    venue: "Old Harbour Grounds",
    city: "Kochi",
    date: "Sun, 14 Sep",
    time: "4:00 PM",
    price: 260,
    faceValue: 300,
    poster: event4,
    category: "Local Fairs",
    source: "B2C Official",
    seatsRemaining: 38,
    sellerRating: 4.6,
    sellerName: "Harbour Fair Trust",
  },
  {
    id: "neon-noir-matinee",
    title: "Neon Noir — Weekend Matinee",
    venue: "Palace 70mm",
    city: "Hyderabad",
    date: "Sun, 30 Aug",
    time: "2:15 PM",
    price: 310,
    faceValue: 350,
    poster: event1,
    category: "Trending Movies",
    source: "C2C Verified Seller",
    seatsRemaining: 2,
    sellerRating: 5,
    sellerName: "Meera S.",
  },
  {
    id: "monsoon-sessions",
    title: "Monsoon Sessions — Open Air",
    venue: "Hilltop Amphitheatre",
    city: "Pune",
    date: "Sat, 20 Sep",
    time: "6:00 PM",
    price: 1290,
    faceValue: 1290,
    poster: event2,
    category: "Live Concerts",
    source: "B2C Official",
    seatsRemaining: 21,
    sellerRating: 4.9,
    sellerName: "Hilltop Live",
  },
];

export const FILTER_TABS = [
  "All",
  "Trending Movies",
  "Live Concerts",
  "Local Fairs",
  "Stand-up Comedy",
] as const;

export const getEvent = (id: string) => EVENTS.find((e) => e.id === id);

export const currency = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
