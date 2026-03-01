// src/store/complaintStore.ts
import { create } from 'zustand';

export type ComplaintStatus = 'pending' | 'in-progress' | 'resolved';
export type ComplaintPriority = 'low' | 'medium' | 'high';

export interface Complaint {
  id: string;
  title: string;
  description: string;
  studentId: string;
  studentName: string;
  roomNo: string;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}

interface ComplaintStore {
  complaints: Complaint[];
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateStatus: (id: string, status: ComplaintStatus) => void;
  getStudentComplaints: (studentId: string) => Complaint[];
  getAllComplaints: () => Complaint[];
}

export const useComplaintStore = create<ComplaintStore>((set, get) => ({
  complaints: [
    {
      id: '1',
      title: 'Fan not working',
      description: 'Ceiling fan is making noise and not working properly',
      studentId: 'STU001',
      studentName: 'Rahul Sharma',
      roomNo: '101',
      status: 'in-progress',
      priority: 'high',
      createdAt: '2024-03-28T10:00:00Z',
      updatedAt: '2024-03-28T10:00:00Z'
    },
    {
      id: '2',
      title: 'WiFi issue',
      description: 'Internet is very slow in room',
      studentId: 'STU002',
      studentName: 'Priya Singh',
      roomNo: '102',
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-03-29T09:30:00Z',
      updatedAt: '2024-03-29T09:30:00Z'
    }
  ],

  addComplaint: (complaintData) => {
    const newComplaint: Complaint = {
      ...complaintData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    set((state) => ({
      complaints: [newComplaint, ...state.complaints]
    }));
  },

  updateStatus: (id, status) => {
    set((state) => ({
      complaints: state.complaints.map(c =>
        c.id === id ? { ...c, status, updatedAt: new Date().toISOString() } : c
      )
    }));
  },

  getStudentComplaints: (studentId) => {
    return get().complaints.filter(c => c.studentId === studentId);
  },

  getAllComplaints: () => {
    return get().complaints;
  }
}));