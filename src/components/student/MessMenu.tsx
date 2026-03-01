// src/components/student/MessMenu.tsx
"use client";

import { useMessStore } from '@/store/messStore';
import { Calendar, Clock, Star } from 'lucide-react';
import { useMemo } from 'react';

export default function MessMenu() {
  // Get the entire menu object instead of calling functions
  const menu = useMessStore((state) => state.menu);
  
  // Use useMemo to compute derived values
  const todayMenu = useMemo(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return { ...menu[today as keyof typeof menu], day: today };
  }, [menu]);

  const sundaySpecial = menu.sunday.special;

  return (
    <div className="space-y-6">
      {/* Today's Menu */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold capitalize">Today's Menu ({todayMenu.day})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-orange-600">Breakfast (8-9:30 AM)</h3>
            </div>
            <p className="mt-2">{todayMenu.breakfast}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-green-600">Lunch (12:30-2 PM)</h3>
            </div>
            <p className="mt-2">{todayMenu.lunch}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-blue-600">Dinner (7:30-9 PM)</h3>
            </div>
            <p className="mt-2">{todayMenu.dinner}</p>
          </div>
        </div>

        {/* Sunday Special */}
        {todayMenu.day === 'sunday' && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-600 fill-purple-600" />
              <p className="text-purple-700 font-medium">{sundaySpecial}</p>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Menu Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(menu).map(([day, meals]) => (
            <div key={day} className="border-b pb-2">
              <p className="font-medium capitalize mb-1">{day}</p>
              <p className="text-sm text-gray-600">B: {meals.breakfast}</p>
              <p className="text-sm text-gray-600">L: {meals.lunch}</p>
              <p className="text-sm text-gray-600">D: {meals.dinner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}