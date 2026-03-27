// API Base URL - json-server will run on port 3001
const API_BASE = "http://localhost:3001";

interface User {
  id?: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  avatar: string;
}

interface Court {
  id: string;
  name: string;
  location: string;
  sport: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  amenities?: string[];
  facilities?: string[];
  operatingHours?: string;
  maxPlayers?: number;
  surfaceType?: string;
  availability?: string;
  cancellationPolicy?: string;
  images?: string[];
}

// ===== AUTH ENDPOINTS =====

// Get all users
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.email === email) || null;
}

// Login user
export async function loginUser(
  email: string,
  password: string,
): Promise<User> {
  const users = await getAllUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
}

// Register new user
export async function registerUser(userData: User): Promise<User> {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Generate new ID
  const allUsers = await getAllUsers();
  const newId = (
    Math.max(...allUsers.map((u) => parseInt(u.id || "0"))) + 1
  ).toString();

  const newUser: User = {
    ...userData,
    id: newId,
  };

  // POST new user to db.json
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}

// ===== COURT ENDPOINTS =====

// Get all courts
export async function getAllCourts(): Promise<Court[]> {
  const response = await fetch(`${API_BASE}/courts`);
  if (!response.ok) throw new Error("Failed to fetch courts");
  return response.json();
}

// Get court by ID
export async function getCourtById(id: string): Promise<Court | null> {
  const response = await fetch(`${API_BASE}/courts/${id}`);
  if (!response.ok) return null;
  return response.json();
}

// Get courts by sport
export async function getCourtsBySport(sport: string): Promise<Court[]> {
  const courts = await getAllCourts();
  return courts.filter((c) => c.sport === sport);
}

// Search courts
export async function searchCourts(
  searchTerm: string,
  filters?: any,
): Promise<Court[]> {
  const courts = await getAllCourts();

  return courts.filter((court) => {
    const matches = searchTerm
      ? court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.sport.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    if (!matches) return false;

    if (filters?.sports && filters.sports.length > 0) {
      if (!filters.sports.includes(court.sport)) return false;
    }

    if (filters?.maxPrice) {
      if (court.price > filters.maxPrice) return false;
    }

    if (filters?.minRating) {
      if (court.rating < filters.minRating) return false;
    }

    return true;
  });
}

// ===== FAVORITES ENDPOINTS =====

// Get all favorites
export async function getFavorites(): Promise<string[]> {
  const response = await fetch(`${API_BASE}/favorites`);
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

// Add to favorites
export async function addToFavorites(courtId: string): Promise<string[]> {
  const favorites = await getFavorites();
  if (!favorites.includes(courtId)) {
    favorites.push(courtId);
    const response = await fetch(`${API_BASE}/favorites`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favorites),
    });

    if (!response.ok) throw new Error("Failed to add to favorites");
    return response.json();
  }
  return favorites;
}

// Remove from favorites
export async function removeFromFavorites(courtId: string): Promise<string[]> {
  const favorites = await getFavorites();
  const updated = favorites.filter((id) => id !== courtId);
  const response = await fetch(`${API_BASE}/favorites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updated),
  });

  if (!response.ok) throw new Error("Failed to remove from favorites");
  return response.json();
}

// ===== BOOKINGS ENDPOINTS (for future use) =====

// Get user bookings
export async function getUserBookings(userId: string): Promise<any[]> {
  const response = await fetch(`${API_BASE}/bookings?userId=${userId}`);
  if (!response.ok) throw new Error("Failed to fetch bookings");
  return response.json();
}

// Create new booking
export async function createBooking(bookingData: any): Promise<any> {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!response.ok) throw new Error("Failed to create booking");
  return response.json();
}

// Cancel booking
export async function cancelBooking(bookingId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to cancel booking");
}
