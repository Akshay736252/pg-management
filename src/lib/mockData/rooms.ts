// src/lib/mockData/rooms.ts
import { Room } from "@/types/room";

export const mockRooms: Room[] = Array.from({ length: 25 }, (_, i) => {
  const roomNumber = (i + 101).toString();
  const floor = Math.floor(i / 5) + 1;
  const type = i % 3 === 0 ? 'single' : i % 3 === 1 ? 'double' : 'triple';
  const totalBeds = type === 'single' ? 1 : type === 'double' ? 2 : 3;
  
  // Generate beds
  const beds = Array.from({ length: totalBeds }, (_, bedIndex) => {
    const bedNumber = `${roomNumber}${String.fromCharCode(65 + bedIndex)}`; // 101A, 101B, etc.
    
    // Randomly assign status (for demo)
    const random = Math.random();
    let status: 'available' | 'occupied' | 'maintenance' | 'moving' = 'available';
    
    if (random < 0.4) {
      status = 'occupied';
    } else if (random < 0.5) {
      status = 'maintenance';
    } else if (random < 0.6) {
      status = 'moving';
    }
    
    // Add student if occupied
    const student = status === 'occupied' ? {
      id: `STU${bedIndex}${i}`,
      name: `Student ${bedIndex + 1} Room ${roomNumber}`,
      uid: `PG${i}${bedIndex}23`,
      phone: `+91 98765 4321${bedIndex}`,
      joiningDate: '2024-01-15',
      rentAmount: type === 'single' ? 12000 : type === 'double' ? 8000 : 6000,
      dueDate: '2024-04-05'
    } : undefined;

    return {
      id: `bed-${roomNumber}-${bedIndex}`,
      bedNumber,
      status,
      student
    };
  });

  return {
    id: `room-${roomNumber}`,
    roomNumber,
    floor,
    type,
    totalBeds,
    beds,
    rentPerBed: type === 'single' ? 12000 : type === 'double' ? 8000 : 6000,
    amenities: ['Fan', 'Light', 'Cupboard', 'Bed']
  };
});