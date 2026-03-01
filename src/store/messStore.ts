import { create } from 'zustand';

export interface Meal {
  breakfast: string;
  lunch: string;
  dinner: string;
  special?: string;
}

export interface WeeklyMenu {
  monday: Meal;
  tuesday: Meal;
  wednesday: Meal;
  thursday: Meal;
  friday: Meal;
  saturday: Meal;
  sunday: Meal & { special: string };
}

interface MessStore {
  menu: WeeklyMenu;
  updateMenu: (day: keyof WeeklyMenu, meal: Partial<Meal>) => void;
}

export const useMessStore = create<MessStore>((set) => ({
  menu: {
    monday: { breakfast: 'Aloo Paratha, Dahi, Tea', lunch: 'Rajma Chawal, Salad', dinner: 'Dal Makhani, Roti' },
    tuesday: { breakfast: 'Poha, Jalebi', lunch: 'Chole Bhature', dinner: 'Kadhi Pakora, Rice' },
    wednesday: { breakfast: 'Sandwich, Juice', lunch: 'Mix Veg, Roti', dinner: 'Paneer Do Pyaza, Naan' },
    thursday: { breakfast: 'Idli, Sambhar', lunch: 'Soya Chaap, Roti', dinner: 'Kadhai Chicken, Roti' },
    friday: { breakfast: 'Chole Kulche', lunch: 'Veg Biryani, Raita', dinner: 'Fish Curry, Rice' },
    saturday: { breakfast: 'Masala Dosa', lunch: 'Aloo Gobi, Roti', dinner: 'Butter Chicken, Naan' },
    sunday: { 
      breakfast: 'Puri Bhaji, Halwa', 
      lunch: 'Special Thali', 
      dinner: 'Chicken Biryani', 
      special: '🍛 Sunday Special: Egg Curry + Biryani + Ice Cream' 
    }
  },

  updateMenu: (day, meal) => {
    set((state) => ({
      menu: {
        ...state.menu,
        [day]: { ...state.menu[day], ...meal }
      }
    }));
  }
}));