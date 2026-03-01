// src/components/student/PaymentCard.tsx
"use client";

import { usePaymentStore } from '@/store/paymentStore';
import { IndianRupee, Calendar, CreditCard } from 'lucide-react';
import { useState, useMemo } from 'react';

interface Props {
  studentId: string;
  studentName: string;
  roomNo: string;
}

export default function PaymentCard({ studentId, studentName, roomNo }: Props) {
  // Get payments array directly
  const payments = usePaymentStore((state) => state.payments);
  const markAsPaid = usePaymentStore((state) => state.markAsPaid);
  const [showPayment, setShowPayment] = useState(false);

  // Compute student dues with useMemo
  const studentDues = useMemo(() => {
    return payments.filter(p => p.studentId === studentId);
  }, [payments, studentId]);

  // Compute pending dues with useMemo
  const pendingDues = useMemo(() => {
    return studentDues.filter(d => d.status === 'pending' || d.status === 'overdue');
  }, [studentDues]);

  const totalDue = useMemo(() => {
    return pendingDues.reduce((sum, d) => sum + d.amount, 0);
  }, [pendingDues]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Rent Dues</h3>

      {pendingDues.length > 0 ? (
        pendingDues.map((due) => (
          <div key={due.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Room {due.roomNo}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                due.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {due.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" />
                <span className="text-xl font-bold">₹{due.amount}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Due: {due.dueDate}</span>
              </div>
            </div>

            <button
              onClick={() => setShowPayment(true)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-green-600">
          <p className="text-lg">🎉 No pending dues!</p>
          <p className="text-sm mt-2">All payments are up to date</p>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Make Payment</h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-3xl font-bold text-blue-600">₹{totalDue}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <button className="p-3 border rounded-lg hover:bg-gray-50 flex flex-col items-center">
                <CreditCard className="w-5 h-5 mb-1" />
                <span className="text-xs">Card</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50 flex flex-col items-center">
                <span className="text-sm font-bold mb-1">UPI</span>
                <span className="text-xs">PhonePe</span>
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50 flex flex-col items-center">
                <span className="text-sm font-bold mb-1">Cash</span>
                <span className="text-xs">At Office</span>
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  pendingDues.forEach(due => markAsPaid(due.id, 'upi'));
                  setShowPayment(false);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}