// src/store/lostFoundStore.ts
import { create } from 'zustand';

export interface LostItem {
  id: string;
  title: string;
  description: string;
  category: 'electronics' | 'books' | 'clothing' | 'accessories' | 'other';
  location: string;
  dateFound: string;
  image?: string;
  status: 'unclaimed' | 'claimed' | 'returned';
  claimedBy?: string;
}

interface LostFoundStore {
  items: LostItem[];
  addItem: (item: Omit<LostItem, 'id' | 'status'>) => void;
  claimItem: (itemId: string, studentId: string) => void;
  returnItem: (itemId: string) => void;
}

export const useLostFoundStore = create<LostFoundStore>((set) => ({
  items: [
    {
      id: '1',
      title: 'Black Water Bottle',
      description: 'Milton steel bottle with blue cap',
      category: 'other',
      location: 'Dining Hall',
      dateFound: '2024-03-29',
      status: 'unclaimed'
    },
    {
      id: '2',
      title: 'Physics Textbook',
      description: 'Class 11 NCERT Physics',
      category: 'books',
      location: 'Study Room',
      dateFound: '2024-03-28',
      status: 'unclaimed'
    },
    {
      id: '3',
      title: 'Wireless Earphones',
      description: 'Boat Airdopes 131',
      category: 'electronics',
      location: 'Common Room',
      dateFound: '2024-03-27',
      status: 'claimed',
      claimedBy: 'STU003'
    }
  ],

  addItem: (itemData) => {
    const newItem: LostItem = {
      ...itemData,
      id: Date.now().toString(),
      status: 'unclaimed'
    };
    set((state) => ({
      items: [newItem, ...state.items]
    }));
  },

  claimItem: (itemId, studentId) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === itemId ? { ...item, status: 'claimed', claimedBy: studentId } : item
      )
    }));
  },

  returnItem: (itemId) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === itemId ? { ...item, status: 'returned' } : item
      )
    }));
  }
}));