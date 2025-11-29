// Type definitions for itinerary data
export interface ItineraryItem {
  time: string;
  activity: string;
  details: string;
  icon?: string;
  address?: string;
  needsReservation?: boolean;
  warning?: string;
}

export interface DayItinerary {
  id: number;
  date: string;
  day: string;
  weekday: string;
  title: string;
  items: ItineraryItem[];
}

// Type definitions for reservations data
export interface ReservationMethod {
  name: string;
  description: string;
  url?: string;
}

export interface BackupPlan {
  name: string;
  description: string;
  url?: string;
}

export interface Reservation {
  id: string;
  name: string;
  category: string;
  priority: number;
  type: string;
  when: string;
  day: string;
  address?: string;
  methods: ReservationMethod[];
  backups?: BackupPlan[];
  notes?: string;
}

