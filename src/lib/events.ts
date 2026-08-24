import event1 from "@/assets/event-1.jpg";
import event2 from "@/assets/event-2.jpg";
import event3 from "@/assets/event-3.jpg";
import event4 from "@/assets/event-4.jpg";

export type EventCategory =
  | "Movies"
  | "Concerts"
  | "Live Events"
  | "Theater"
  | "Stand-up Comedy"
  | "Local Passes";

export type TicketEvent = {
  id: string;
  title: string;
  venue: string;
  city: string;
  date: string;
  time: string;
  /** Local datetime in `YYYY-MM-DDTHH:mm` form — feeds the date & time picker. */
  startsAt: string;
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
    startsAt: "2026-08-29T23:45",
    price: 420,
    faceValue: 450,
    poster: event1,
    category: "Movies",
    source: "B2C Official",
    seatsRemaining: 12,
    sellerRating: 4.9,
    sellerName: "Grand Marquee Box Office",
  },
  {
    id: "amber-lights-live",
    title: "Amber Lights Live Tour",
    venue: "Riverside Arena",
    city: "Bangalore",
    date: "Fri, 04 Sep",
    time: "7:30 PM",
    startsAt: "2026-09-04T19:30",
    price: 1850,
    faceValue: 1900,
    poster: event2,
    category: "Concerts",
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
    date: "Fri, 11 Sep",
    time: "9:00 PM",
    startsAt: "2026-09-11T21:00",
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
    date: "Mon, 14 Sep",
    time: "4:00 PM",
    startsAt: "2026-09-14T16:00",
    price: 260,
    faceValue: 300,
    poster: event4,
    category: "Local Passes",
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
    startsAt: "2026-08-30T14:15",
    price: 310,
    faceValue: 350,
    poster: event1,
    category: "Movies",
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
    date: "Sun, 20 Sep",
    time: "6:00 PM",
    startsAt: "2026-09-20T18:00",
    price: 1290,
    faceValue: 1290,
    poster: event2,
    category: "Concerts",
    source: "B2C Official",
    seatsRemaining: 21,
    sellerRating: 4.9,
    sellerName: "Hilltop Live",
  },
  {
    id: "the-glass-menagerie",
    title: "The Glass Menagerie — Stage Play",
    venue: "Curtain Call Theatre",
    city: "Coimbatore",
    date: "Sun, 06 Sep",
    time: "7:00 PM",
    startsAt: "2026-09-06T19:00",
    price: 550,
    faceValue: 600,
    poster: event3,
    category: "Theater",
    source: "B2C Official",
    seatsRemaining: 18,
    sellerRating: 4.8,
    sellerName: "Curtain Call Theatre",
  },
  {
    id: "skyline-electronic-nights",
    title: "Skyline Electronic Nights",
    venue: "Bangalore Arena Grounds",
    city: "Bangalore",
    date: "Sat, 19 Sep",
    time: "8:00 PM",
    startsAt: "2026-09-19T20:00",
    price: 1490,
    faceValue: 1600,
    poster: event2,
    category: "Live Events",
    source: "C2C Verified Seller",
    seatsRemaining: 9,
    sellerRating: 4.7,
    sellerName: "Divya M.",
  },
];

export const FILTER_TABS = [
  "All",
  "Movies",
  "Concerts",
  "Live Events",
  "Theater",
  "Stand-up Comedy",
  "Local Passes",
] as const;

export const EVENT_CATEGORIES: EventCategory[] = [
  "Movies",
  "Concerts",
  "Live Events",
  "Theater",
  "Stand-up Comedy",
  "Local Passes",
];

export const ALL_CITIES = "All Cities";

export const CITIES = [
  ALL_CITIES,
  "Coimbatore",
  "Chennai",
  "Bangalore",
  "Mumbai",
  "Hyderabad",
  "Pune",
  "Kochi",
] as const;

export const getEvent = (id: string) => EVENTS.find((e) => e.id === id);

export const currency = (n: number) =>
  `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
