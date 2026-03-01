// src/components/owner/StatsCards.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  IndianRupee, 
  Home,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import CountUp from 'react-countup';

export default function StatsCards() {
  const stats = [
    {
      title: "Total Revenue",
      value: 845000,
      prefix: "₹",
      icon: IndianRupee,
      change: 12.5,
      trend: "up",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Total Students",
      value: 18,
      icon: Users,
      change: 8.3,
      trend: "up",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Occupancy Rate",
      value: 72,
      suffix: "%",
      icon: Home,
      change: 5.2,
      trend: "up",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Pending Dues",
      value: 25500,
      prefix: "₹",
      icon: TrendingUp,
      change: 3.1,
      trend: "down",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Monthly Growth",
      value: 18.7,
      suffix: "%",
      icon: ArrowUpRight,
      change: 2.4,
      trend: "up",
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Avg. Rent/Student",
      value: 8333,
      prefix: "₹",
      icon: IndianRupee,
      change: 4.2,
      trend: "up",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className={`bg-gradient-to-br ${stat.color} text-white overflow-hidden relative`}>
          <CardContent className="p-6">
            <div className="absolute right-0 top-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute right-0 bottom-0 w-16 h-16 bg-white/10 rounded-full -mr-6 -mb-6"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">
                  {stat.prefix && <span>{stat.prefix}</span>}
                  <CountUp end={stat.value} duration={2} separator="," />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </p>
              </div>
              <stat.icon className="w-8 h-8 opacity-80" />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-300" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-300" />
              )}
              <span className="text-sm opacity-90">{stat.change}% from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}