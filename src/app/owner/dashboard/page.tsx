// src/app/owner/dashboard/page.tsx
"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StatsCards from '@/components/owner/StatsCards';
import RevenueChart from '@/components/owner/RevenueChart';
import ExportReports from '@/components/owner/ExportReports';
import ConfettiCelebration from '@/components/ui/Confetti';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, TrendingUp, Calendar, Download } from 'lucide-react';
import CountUp from 'react-countup';

export default function OwnerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New student joined Room 105', time: '2 min ago' },
    { id: 2, text: 'Rent received from Room 101', time: '1 hour ago' },
    { id: 3, text: 'Maintenance request in Room 203', time: '3 hours ago' },
  ]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?role=owner');
    }
    // Show celebration on first load
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 5000);
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ConfettiCelebration active={showCelebration} />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Owner Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Welcome back, {session?.user?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div className="space-y-6">
            {/* Export Reports */}
            <ExportReports />

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <p className="text-sm">{notif.text}</p>
                      <span className="text-xs text-gray-500">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100">
                    Add Staff
                  </button>
                  <button className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                    Send Notice
                  </button>
                  <button className="p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                    Generate Bill
                  </button>
                  <button className="p-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100">
                    View Reports
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Revenue/Student</p>
                <p className="text-2xl font-bold">₹8,333</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profit Margin</p>
                <p className="text-2xl font-bold text-green-600">64%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-600">92%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Stay</p>
                <p className="text-2xl font-bold">8.5 months</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}