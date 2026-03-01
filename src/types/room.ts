// src/types/room.ts
export type BedStatus = 'available' | 'occupied' | 'maintenance' | 'moving';

export interface Student {
  id: string;
  name: string;
  uid: string;
  phone: string;
  joiningDate: string;
  rentAmount: number;
  dueDate: string;
}

export interface Bed {
  id: string;
  bedNumber: string;
  status: BedStatus;
  student?: Student;
}

export interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  type: 'single' | 'double' | 'triple';
  totalBeds: number;
  beds: Bed[];
  rentPerBed: number;
}