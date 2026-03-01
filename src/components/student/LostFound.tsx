// src/components/student/LostFound.tsx
"use client";

import { useLostFoundStore } from '@/store/lostFoundStore';
import { Package, Search, Camera } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function LostFound() {
  // Get items array directly
  const items = useLostFoundStore((state) => state.items);
  const claimItem = useLostFoundStore((state) => state.claimItem);
  const [searchTerm, setSearchTerm] = useState('');

  // Compute unclaimed items with useMemo
  const unclaimedItems = useMemo(() => {
    return items.filter(item => item.status === 'unclaimed');
  }, [items]);

  // Filter items based on search
  const filteredItems = useMemo(() => {
    return unclaimedItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [unclaimedItems, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lost & Found</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Camera className="w-4 h-4" />
          Report Found Item
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search items..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {item.category}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            
            <div className="text-xs text-gray-500 mb-3">
              <p>📍 Found at: {item.location}</p>
              <p>📅 Date: {item.dateFound}</p>
            </div>

            <button
              onClick={() => claimItem(item.id, 'STU001')}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Claim Item
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No lost items found
        </div>
      )}
    </div>
  );
}