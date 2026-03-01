// src/store/paymentStore.ts
import { create } from 'zustand';

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  roomNo: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  paymentMethod?: 'cash' | 'upi' | 'card';
}

interface PaymentStore {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  markAsPaid: (id: string, method: Payment['paymentMethod']) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'Rahul Sharma',
      roomNo: '101',
      amount: 8500,
      dueDate: '2024-04-05',
      status: 'pending'
    },
    {
      id: '2',
      studentId: 'STU002',
      studentName: 'Priya Singh',
      roomNo: '102',
      amount: 12000,
      dueDate: '2024-04-05',
      status: 'paid',
      paidDate: '2024-03-30',
      paymentMethod: 'upi'
    }
  ],

  addPayment: (paymentData) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString()
    };
    set((state) => ({
      payments: [...state.payments, newPayment]
    }));
  },

  markAsPaid: (id, method) => {
    set((state) => ({
      payments: state.payments.map(p =>
        p.id === id
          ? { ...p, status: 'paid', paidDate: new Date().toISOString().split('T')[0], paymentMethod: method }
          : p
      )
    }));
  }
}));