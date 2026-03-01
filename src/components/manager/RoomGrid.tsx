// src/components/manager/RoomGrid.tsx
"use client";

import { useRoomStore } from '@/store/roomStore';
import { useState } from 'react';
import { Bed, Users, Wrench, Move, X } from 'lucide-react';

export default function RoomGrid() {
  const { 
    rooms, 
    getFilteredRooms, 
    getStats, 
    setSelectedRoom,
    filterFloor,
    setFilterFloor,
    filterStatus,
    setFilterStatus
  } = useRoomStore();
  
  const [showModal, setShowModal] = useState(false);
  const stats = getStats();
  const filteredRooms = getFilteredRooms();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'moving': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'occupied': return <Users className="w-3 h-3" />;
      case 'maintenance': return <Wrench className="w-3 h-3" />;
      case 'moving': return <Move className="w-3 h-3" />;
      default: return <Bed className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Total Beds</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Available</p>
          <p className="text-3xl font-bold">{stats.available}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Occupied</p>
          <p className="text-3xl font-bold">{stats.occupied}</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-lg">
          <p className="text-sm opacity-90">Maintenance</p>
          <p className="text-3xl font-bold">{stats.maintenance}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterFloor('all')}
            className={`px-4 py-2 rounded-lg ${filterFloor === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            All Floors
          </button>
          {[1, 2, 3, 4, 5].map(floor => (
            <button
              key={floor}
              onClick={() => setFilterFloor(floor)}
              className={`px-4 py-2 rounded-lg ${filterFloor === floor ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 rounded-lg border"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            onClick={() => {
              setSelectedRoom(room);
              setShowModal(true);
            }}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold">Room {room.roomNumber}</h3>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">F{room.floor}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-1 mb-2">
              {room.beds.map((bed) => (
                <div
                  key={bed.id}
                  className={`${getStatusColor(bed.status)} text-white p-1 rounded text-center text-xs flex items-center justify-center gap-1`}
                  title={`Bed ${bed.bedNumber}`}
                >
                  {getStatusIcon(bed.status)}
                  <span>{bed.bedNumber.slice(-1)}</span>
                </div>
              ))}
            </div>

            <div className="text-xs text-gray-500">
              <p>Type: {room.type}</p>
              <p className="mt-1">
                <span className="text-green-600">
                  {room.beds.filter(b => b.status === 'available').length} Available
                </span>
                {' · '}
                <span className="text-red-600">
                  {room.beds.filter(b => b.status === 'occupied').length} Occupied
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Room Details Modal */}
      {showModal && <RoomDetailsModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

// Room Details Modal Component
function RoomDetailsModal({ onClose }: { onClose: () => void }) {
  const { selectedRoom } = useRoomStore();
  
  if (!selectedRoom) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Room {selectedRoom.roomNumber}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            {selectedRoom.beds.map((bed) => (
              <div key={bed.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span className="font-medium">Bed {bed.bedNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bed.status === 'available' ? 'bg-green-100 text-green-700' :
                      bed.status === 'occupied' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {bed.status}
                    </span>
                  </div>
                </div>

                {bed.student && (
                  <div className="mt-3 pl-6 grid grid-cols-2 gap-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {bed.student.name}</p>
                    <p><span className="text-gray-500">UID:</span> {bed.student.uid}</p>
                    <p><span className="text-gray-500">Phone:</span> {bed.student.phone}</p>
                    <p><span className="text-gray-500">Rent:</span> ₹{bed.student.rentAmount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}