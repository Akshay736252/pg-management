// src/components/owner/ExportReports.tsx
"use client";

import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExportReports() {
  const data = [
    { month: 'Jan', revenue: 120000, students: 18, occupancy: '72%' },
    { month: 'Feb', revenue: 135000, students: 19, occupancy: '76%' },
    { month: 'Mar', revenue: 153000, students: 20, occupancy: '80%' },
  ];

  const exportToExcel = () => {
    alert('Excel export would download here');
    // In a real app, you'd use xlsx library
  };

  const exportToPDF = () => {
    alert('PDF export would download here');
    // In a real app, you'd use jspdf library
  };

  const exportToCSV = () => {
    alert('CSV export would download here');
    // In a real app, you'd use file-saver library
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={exportToExcel}
            className="p-4 border rounded-lg hover:bg-green-50 hover:border-green-500 transition group"
          >
            <FileSpreadsheet className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm">Excel</span>
          </button>

          <button
            onClick={exportToPDF}
            className="p-4 border rounded-lg hover:bg-red-50 hover:border-red-500 transition group"
          >
            <FileText className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <span className="text-sm">PDF</span>
          </button>

          <button
            onClick={exportToCSV}
            className="p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition group"
          >
            <FileJson className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="text-sm">CSV</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}