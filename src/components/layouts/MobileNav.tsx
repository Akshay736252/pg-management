// src/components/layouts/MobileNav.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Utensils, AlertCircle, Package, IndianRupee, Phone, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  role: 'student' | 'manager' | 'owner';
}

export default function MobileNav({ role }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getNavItems = () => {
    switch(role) {
      case 'student':
        return [
          { href: '/student/dashboard', icon: Home, label: 'Dashboard' },
          { href: '/student/mess-menu', icon: Utensils, label: 'Mess Menu' },
          { href: '/student/complaints', icon: AlertCircle, label: 'Complaints' },
          { href: '/student/lost-found', icon: Package, label: 'Lost & Found' },
          { href: '/student/payments', icon: IndianRupee, label: 'Payments' },
          { href: '/student/contact', icon: Phone, label: 'Contact' },
        ];
      case 'manager':
        return [
          { href: '/manager/dashboard', icon: Home, label: 'Dashboard' },
          { href: '/manager/rooms', icon: Home, label: 'Rooms' },
          { href: '/manager/complaints', icon: AlertCircle, label: 'Complaints' },
          { href: '/manager/lost-found', icon: Package, label: 'Lost & Found' },
          { href: '/manager/mess-menu', icon: Utensils, label: 'Mess Menu' },
          { href: '/manager/students', icon: Users, label: 'Students' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-600">PG Life</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4">
                {getNavItems().map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1 transition"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}