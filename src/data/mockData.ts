export interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
}

export interface SportCategory {
  name: string;
  count: string;
}

export const MOCK_COURTS: Court[] = [
  {
    id: "1",
    name: "Grand Slam Tennis Center",
    location: "Downtown Metro, Westside",
    sport: "Tennis",
    price: 45,
    rating: 4.9,
    reviews: 128,
    imageUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
  {
    id: "2",
    name: "Urban Hoops Arena",
    location: "Brooklyn Heights",
    sport: "Basketball",
    price: 35,
    rating: 4.8,
    reviews: 94,
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    id: "3",
    name: "Sunset Padel Club",
    location: "Marina Bay",
    sport: "Padel",
    price: 55,
    rating: 4.9,
    reviews: 215,
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
  },
  {
    id: "4",
    name: "City Center Pitch",
    location: "Financial District",
    sport: "Football",
    price: 80,
    rating: 4.7,
    reviews: 67,
    imageUrl:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80",
  },
  {
    id: "5",
    name: "Pro Smash Badminton",
    location: "Eastside Complex",
    sport: "Badminton",
    price: 25,
    rating: 4.6,
    reviews: 42,
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80",
  },
  {
    id: "6",
    name: "Beachside Volley",
    location: "Santa Monica",
    sport: "Volleyball",
    price: 30,
    rating: 4.8,
    reviews: 156,
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
  },
  {
    id: "7",
    name: "Riverside Tennis Courts",
    location: "Downtown Metro",
    sport: "Tennis",
    price: 40,
    rating: 4.5,
    reviews: 89,
    imageUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
  {
    id: "8",
    name: "Highland Park Hoops",
    location: "Westside",
    sport: "Basketball",
    price: 20,
    rating: 4.3,
    reviews: 56,
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    id: "9",
    name: "Elite Padel Indoor",
    location: "Financial District",
    sport: "Padel",
    price: 65,
    rating: 4.9,
    reviews: 312,
    imageUrl:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
  },
];

export const SPORT_CATEGORIES: SportCategory[] = [
  { name: "Tennis", count: "124 courts" },
  { name: "Basketball", count: "86 courts" },
  { name: "Padel", count: "45 courts" },
  { name: "Football", count: "92 courts" },
  { name: "Badminton", count: "38 courts" },
  { name: "Volleyball", count: "24 courts" },
];

export const FAVORITE_COURT_IDS = ["1", "3", "4"];

export const FAVORITE_COURTS: Court[] = MOCK_COURTS.filter((court) =>
  FAVORITE_COURT_IDS.includes(court.id),
);
