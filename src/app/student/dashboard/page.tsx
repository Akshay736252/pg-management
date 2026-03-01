// src/app/student/dashboard/page.tsx
"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Home,
  IndianRupee,
  AlertCircle,
  Package,
  Utensils,
  Phone,
  Calendar,
  Clock,
  User,
  Bell,
  CreditCard,
  MapPin,
  Users,
  Wifi,
  Coffee,
  Shield,
  Sun,
  Moon
} from 'lucide-react';
import BeautifulCard from '@/components/ui/BeautifulCard';
import MessMenu from '@/components/student/MessMenu';
import ComplaintForm from '@/components/student/ComplaintForm';
import LostFound from '@/components/student/LostFound';
import PaymentCard from '@/components/student/PaymentCard';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/login?role=student');
    return null;
  }

  const student = {
    name: session?.user?.name || 'Rahul Sharma',
    roomNo: '101',
    bedNo: 'A',
    uid: 'STU001',
    floor: '2nd Floor',
    joiningDate: '15 Jan 2024',
    rentAmount: 8500,
    dueDate: '2024-04-05'
  };

  const quickStats = [
    { icon: Home, label: 'Room', value: `${student.roomNo} - ${student.bedNo}`, color: 'blue', gradient: true },
    { icon: IndianRupee, label: 'Rent Due', value: `₹${student.rentAmount}`, subValue: `Due: ${student.dueDate}`, color: 'green', gradient: true },
    { icon: AlertCircle, label: 'Complaints', value: '2 Active', subValue: '1 In Progress', color: 'orange', gradient: true },
    { icon: Calendar, label: 'Days Left', value: '15 Days', subValue: 'for next rent', color: 'purple', gradient: true },
  ];

  const amenities = [
    { icon: Wifi, label: 'High-Speed WiFi', available: true },
    { icon: Coffee, label: 'Breakfast', available: true },
    { icon: Users, label: 'Common Room', available: true },
    { icon: Shield, label: '24/7 Security', available: true },
  ];

  const recentActivities = [
    { icon: Bell, text: 'Complaint #123 resolved', time: '2 hours ago', color: 'green' },
    { icon: Utensils, text: 'Sunday Special: Chole Bhature', time: '5 hours ago', color: 'orange' },
    { icon: Package, text: 'Lost item claimed: Water Bottle', time: '1 day ago', color: 'blue' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    {/* Header with Greeting */}
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-b-3xl"> 
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      <div className="relative flex justify-between items-center">
        <div>
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Welcome back, {student.name}! 👋
          </motion.h1>
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Room {student.roomNo} • {student.floor} • Bed {student.bedNo}
          </motion.p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-3 bg-white/20 backdrop-blur-lg rounded-full text-white hover:bg-white/30 transition"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>
      </div>
    </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass rounded-2xl p-2 flex flex-wrap gap-2 shadow-xl"
        >
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' },
            { id: 'menu', label: 'Mess Menu', icon: Utensils, color: 'orange' },
            { id: 'complaints', label: 'Complaints', icon: AlertCircle, color: 'red' },
            { id: 'lostfound', label: 'Lost & Found', icon: Package, color: 'green' },
            { id: 'payments', label: 'Payments', icon: IndianRupee, color: 'purple' },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-400 text-white shadow-lg`
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-8"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BeautifulCard 
                    gradient={stat.gradient}
                    glass={!stat.gradient}
                    className="h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 bg-${stat.color}-600 rounded-xl`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        {stat.subValue && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.subValue}</p>
                        )}
                      </div>
                    </div>
                  </BeautifulCard>
                </motion.div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Amenities & Recent Activities */}
              <div className="lg:col-span-1 space-y-6">
                {/* Amenities */}
                <BeautifulCard glass>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Amenities
                  </h3>
                  <div className="space-y-3">
                    {amenities.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        {item.available ? (
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        ) : (
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </BeautifulCard>

                {/* Recent Activities */}
                <BeautifulCard glass>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Recent Activities
                  </h3>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition"
                      >
                        <div className={`p-2 bg-${activity.color}-100 dark:bg-${activity.color}-900/30 rounded-lg`}>
                          <activity.icon className={`w-4 h-4 text-${activity.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.text}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </BeautifulCard>
              </div>

              {/* Right Column - Today's Menu & Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Menu Preview */}
                <BeautifulCard gradient className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Utensils className="w-5 h-5" />
                      Today's Special Menu
                    </h3>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Sunday Special</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm opacity-90">Breakfast</p>
                      <p className="font-semibold">8:00 - 9:30</p>
                      <p className="text-sm mt-1">Aloo Paratha</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Lunch</p>
                      <p className="font-semibold">12:30 - 2:00</p>
                      <p className="text-sm mt-1">Chole Bhature</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-90">Dinner</p>
                      <p className="font-semibold">7:30 - 9:00</p>
                      <p className="text-sm mt-1">Paneer Butter Masala</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="mt-4 w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm transition"
                  >
                    View Full Menu →
                  </button>
                </BeautifulCard>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <BeautifulCard glass onClick={() => setShowComplaintForm(true)} className="cursor-pointer group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <h4 className="font-semibold">Raise Complaint</h4>
                      <p className="text-sm text-gray-500">Report an issue</p>
                    </div>
                  </BeautifulCard>

                  <BeautifulCard glass onClick={() => setActiveTab('lostfound')} className="cursor-pointer group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                        <Package className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold">Lost & Found</h4>
                      <p className="text-sm text-gray-500">Check lost items</p>
                    </div>
                  </BeautifulCard>

                  <BeautifulCard glass onClick={() => setActiveTab('payments')} className="cursor-pointer group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                        <IndianRupee className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="font-semibold">Pay Rent</h4>
                      <p className="text-sm text-gray-500">Clear your dues</p>
                    </div>
                  </BeautifulCard>

                  <BeautifulCard glass className="cursor-pointer group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold">Contact</h4>
                      <p className="text-sm text-gray-500">Owner/Manager</p>
                    </div>
                  </BeautifulCard>
                </div>

                {/* Important Info */}
                <BeautifulCard glass>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Food Timings</p>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          <span className="text-xs">8:00 AM</span>
                        </div>
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          <span className="text-xs">12:30 PM</span>
                        </div>
                        <div>
                          <Clock className="w-4 h-4 inline mr-1" />
                          <span className="text-xs">7:30 PM</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Emergency</p>
                      <p className="font-bold text-red-600">+91 98765 43212</p>
                    </div>
                  </div>
                </BeautifulCard>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'menu' && <MessMenu />}
        {activeTab === 'complaints' && (
          <div>
            <button
              onClick={() => setShowComplaintForm(true)}
              className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              Raise New Complaint
            </button>
            <BeautifulCard glass>
              <h3 className="text-lg font-semibold mb-4">Your Complaints</h3>
              {/* Complaint list component here */}
            </BeautifulCard>
            {showComplaintForm && (
              <ComplaintForm
                studentId={student.uid}
                studentName={student.name}
                roomNo={student.roomNo}
                onClose={() => setShowComplaintForm(false)}
              />
            )}
          </div>
        )}
        {activeTab === 'lostfound' && <LostFound />}
        {activeTab === 'payments' && (
          <PaymentCard 
            studentId={student.uid} 
            studentName={student.name} 
            roomNo={student.roomNo} 
          />
        )}
      </div>
    </div>
  );
}