// src/components/student/ComplaintForm.tsx
"use client";

import { useState } from 'react';
import { useComplaintStore } from '@/store/complaintStore';
import { X } from 'lucide-react';

interface Props {
  studentId: string;
  studentName: string;
  roomNo: string;
  onClose: () => void;
}

export default function ComplaintForm({ studentId, studentName, roomNo, onClose }: Props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as const
  });
  
  const addComplaint = useComplaintStore((state) => state.addComplaint);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      ...formData,
      studentId,
      studentName,
      roomNo,
      status: 'pending'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Raise New Complaint</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Fan not working"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              rows={4}
              className="w-full p-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the issue in detail..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}