// src/components/manager/RoomDetailsModal.tsx
"use client";

import { useRoomStore } from "@/store/roomStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bed, User, Phone, Calendar, IndianRupee } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RoomDetailsModal({ open, onOpenChange }: Props) {
  const { selectedRoom } = useRoomStore();

  if (!selectedRoom) return null;

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-red-100 text-red-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      moving: 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Room {selectedRoom.roomNumber} Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Room Info */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Floor</p>
              <p className="font-semibold">Floor {selectedRoom.floor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Room Type</p>
              <p className="font-semibold capitalize">{selectedRoom.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Beds</p>
              <p className="font-semibold">{selectedRoom.totalBeds}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Rent per Bed</p>
              <p className="font-semibold">₹{selectedRoom.rentPerBed}</p>
            </div>
          </div>

          {/* Beds List */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Beds</h3>
            <div className="space-y-3">
              {selectedRoom.beds.map((bed) => (
                <div key={bed.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Bed {bed.bedNumber}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(bed.status)}`}>
                        {bed.status}
                      </span>
                    </div>
                    
                    {bed.status === 'occupied' && bed.student && (
                      <button className="text-blue-600 text-sm hover:underline">
                        Transfer
                      </button>
                    )}
                  </div>

                  {bed.status === 'occupied' && bed.student && (
                    <div className="mt-3 pl-7 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>{bed.student.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{bed.student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Joined: {bed.student.joiningDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <span className="text-red-600">₹{bed.student.rentAmount}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Room
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}