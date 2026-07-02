import type { Pet, Report, Story, CommunityStats } from '@/types';

export const mockStats: CommunityStats = {
  totalPets: 1284,
  totalReports: 567,
  totalRescues: 892,
  activeVolunteers: 345
};

export const mockPets: Pet[] = [
  {
    id: 'pet1',
    petId: 'BP-000001',
    photoURL: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=400&fit=crop',
    name: 'Max',
    breed: 'Golden Retriever',
    age: '3 years',
    gender: 'Male',
    color: 'Golden',
    vaccinated: true,
    ownerName: 'Maria Santos',
    phoneNumber: '+63 912 345 6789',
    emergencyContact: '+63 917 890 1234',
    address: '123 Mabini St., Manila',
    medicalNotes: 'Up to date on all vaccinations. Microchipped.',
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now() - 86400000 * 7,
    userId: 'user1'
  },
  {
    id: 'pet2',
    petId: 'BP-000002',
    photoURL: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',
    name: 'Luna',
    breed: 'Persian Cat',
    age: '2 years',
    gender: 'Female',
    color: 'White',
    vaccinated: true,
    ownerName: 'Juan Dela Cruz',
    phoneNumber: '+63 908 765 4321',
    emergencyContact: '+63 905 432 1098',
    address: '456 Rizal Ave., Quezon City',
    medicalNotes: 'Spayed. Regular checkups.',
    createdAt: Date.now() - 86400000 * 60,
    updatedAt: Date.now() - 86400000 * 14,
    userId: 'user1'
  },
  {
    id: 'pet3',
    petId: 'BP-000003',
    photoURL: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=400&h=400&fit=crop',
    name: 'Bella',
    breed: 'Shih Tzu',
    age: '1 year',
    gender: 'Female',
    color: 'Brown & White',
    vaccinated: true,
    ownerName: 'Ana Reyes',
    phoneNumber: '+63 915 678 9012',
    emergencyContact: '+63 919 012 3456',
    address: '789 Bonifacio St., Makati',
    medicalNotes: 'Puppy vaccines complete.',
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now() - 86400000 * 3,
    userId: 'user2'
  }
];

export const mockReports: Report[] = [
  {
    id: 'rep1',
    photoURL: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
    location: { lat: 14.5995, lng: 120.9842, address: 'Near Manila City Hall' },
    condition: 'Fair',
    hungry: true,
    injured: false,
    lost: true,
    aggressive: false,
    pregnant: false,
    description: 'Friendly dog seen wandering near the park. Looks lost, wearing a red collar but no tags.',
    status: 'pending',
    createdAt: Date.now() - 86400000 * 2,
    userId: 'user1',
    userName: 'Maria Santos'
  },
  {
    id: 'rep2',
    photoURL: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
    location: { lat: 14.5547, lng: 121.0169, address: 'Bonifacio Global City' },
    condition: 'Poor',
    hungry: true,
    injured: true,
    lost: false,
    aggressive: false,
    pregnant: false,
    description: 'Injured cat with a limp on its front left paw. Very thin and appears malnourished.',
    status: 'pending',
    createdAt: Date.now() - 86400000 * 5,
    userId: 'user2',
    userName: 'Juan Dela Cruz'
  },
  {
    id: 'rep3',
    photoURL: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&h=300&fit=crop',
    location: { lat: 14.6507, lng: 121.1029, address: 'Ateneo de Manila University' },
    condition: 'Good',
    hungry: false,
    injured: false,
    lost: true,
    aggressive: false,
    pregnant: false,
    description: 'Well-groomed poodle found near the university gate. Seems to be someone\'s pet.',
    status: 'resolved',
    createdAt: Date.now() - 86400000 * 10,
    userId: 'user3',
    userName: 'Ana Reyes'
  }
];

export const mockStories: Story[] = [
  {
    id: 'story1',
    title: 'Max\'s Journey Home',
    description: 'After being missing for 3 weeks, Max was reunited with his family thanks to a kind stranger who scanned his BantayPaws QR tag. He was found 15 kilometers away from home, but his tag made identification instant.',
    beforeImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=400&fit=crop',
    likes: 142,
    createdAt: Date.now() - 86400000 * 45
  },
  {
    id: 'story2',
    title: 'Luna Found Safe',
    description: 'Luna the Persian cat was spotted by a concerned citizen who reported her through the app. Within hours, the local rescue team was able to safely bring her back to her worried family.',
    beforeImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop',
    likes: 98,
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'story3',
    title: 'Community Rescue Mission',
    description: 'A coordinated effort by 12 volunteers rescued a litter of 5 puppies from an abandoned building. All puppies were vaccinated, spayed/neutered, and found loving forever homes.',
    beforeImage: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=600&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=600&h=400&fit=crop',
    likes: 256,
    createdAt: Date.now() - 86400000 * 60
  }
];