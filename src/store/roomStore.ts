// src/store/roomStore.ts
import { create } from 'zustand';
import { Room, BedStatus } from '@/types/room';

// Mock data for 25 rooms
const generateMockRooms = (): Room[] => {
  const rooms: Room[] = [];
  
  for (let i = 1; i <= 25; i++) {
    const roomNumber = (100 + i).toString();
    const floor = Math.ceil(i / 5);
    const type = i % 3 === 0 ? 'single' : i % 3 === 1 ? 'double' : 'triple';
    const totalBeds = type === 'single' ? 1 : type === 'double' ? 2 : 3;
    
    const beds = Array.from({ length: totalBeds }, (_, bedIndex) => {
      const bedNumber = `${roomNumber}${String.fromCharCode(65 + bedIndex)}`;
      const isOccupied = Math.random() > 0.3;
      
      return {
        id: `bed-${roomNumber}-${bedIndex}`,
        bedNumber,
        status: isOccupied ? 'occupied' : ('available' as BedStatus),
        ...(isOccupied && {
          student: {
            id: `STU${i}${bedIndex}`,
            name: `Student ${bedIndex + 1} Room ${roomNumber}`,
            uid: `PG${i}${bedIndex}23`,
            phone: `+91 98765 4321${bedIndex}`,
            joiningDate: '2024-01-15',
            rentAmount: type === 'single' ? 12000 : type === 'double' ? 8000 : 6000,
            dueDate: '2024-04-05'
          }
        })
      };
    });
    
    rooms.push({
      id: `room-${roomNumber}`,
      roomNumber,
      floor,
      type,
      totalBeds,
      beds,
      rentPerBed: type === 'single' ? 12000 : type === 'double' ? 8000 : 6000
    });
  }
  
  return rooms;
};

interface RoomStore {
  rooms: Room[];
  selectedRoom: Room | null;
  filterFloor: number | 'all';
  filterStatus: string | 'all';
  setSelectedRoom: (room: Room | null) => void;
  setFilterFloor: (floor: number | 'all') => void;
  setFilterStatus: (status: string | 'all') => void;
  updateBedStatus: (roomId: string, bedId: string, status: BedStatus) => void;
  getFilteredRooms: () => Room[];
  getStats: () => { total: number; available: number; occupied: number; maintenance: number };
}

export const useRoomStore = create<RoomStore>((set, get) => ({
  rooms: generateMockRooms(),
  selectedRoom: null,
  filterFloor: 'all',
  filterStatus: 'all',
  
  setSelectedRoom: (room) => set({ selectedRoom: room }),
  
  setFilterFloor: (floor) => set({ filterFloor: floor }),
  
  setFilterStatus: (status) => set({ filterStatus: status }),
  
  updateBedStatus: (roomId, bedId, status) => {
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              beds: room.beds.map((bed) =>
                bed.id === bedId ? { ...bed, status } : bed
              )
            }
          : room
      )
    }));
  },
  
  getFilteredRooms: () => {
    const { rooms, filterFloor, filterStatus } = get();
    return rooms.filter((room) => {
      if (filterFloor !== 'all' && room.floor !== filterFloor) return false;
      if (filterStatus !== 'all') {
        return room.beds.some((bed) => bed.status === filterStatus);
      }
      return true;
    });
  },
  
  getStats: () => {
    const rooms = get().rooms;
    let total = 0, available = 0, occupied = 0, maintenance = 0;
    
    rooms.forEach((room) => {
      room.beds.forEach((bed) => {
        total++;
        if (bed.status === 'available') available++;
        else if (bed.status === 'occupied') occupied++;
        else maintenance++;
      });
    });
    
    return { total, available, occupied, maintenance };
  }
}));