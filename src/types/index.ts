export interface Pet {
  id: string;
  petId: string;
  photoURL: string;
  name: string;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  color: string;
  vaccinated: boolean;
  ownerName: string;
  phoneNumber: string;
  emergencyContact: string;
  address: string;
  medicalNotes: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
}

export interface Report {
  id: string;
  photoURL: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  condition: string;
  hungry: boolean;
  injured: boolean;
  lost: boolean;
  aggressive: boolean;
  pregnant: boolean;
  description: string;
  status: 'pending' | 'resolved';
  createdAt: number;
  userId: string;
  userName: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  likes: number;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  registeredPets: string[];
  submittedReports: string[];
  volunteerBadge: boolean;
  createdAt: number;
}

export interface CommunityStats {
  totalPets: number;
  totalReports: number;
  totalRescues: number;
  activeVolunteers: number;
}

export type PageTransitionDirection = 'forward' | 'backward';