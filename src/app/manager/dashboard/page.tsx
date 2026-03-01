// src/app/manager/dashboard/page.tsx
"use client";

import RoomGrid from '@/components/manager/RoomGrid';

export default function ManagerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Room Management</h1>
      <RoomGrid />
    </div>
  );
}