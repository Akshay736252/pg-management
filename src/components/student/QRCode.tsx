// src/components/student/QRCode.tsx
"use client";

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, QrCode, Copy, Check } from 'lucide-react';

interface Props {
  studentId: string;
  name: string;
  roomNo: string;
}

export default function StudentQRCode({ studentId, name, roomNo }: Props) {
  const [copied, setCopied] = useState(false);
  
  const qrValue = JSON.stringify({
    id: studentId,
    name: name,
    room: roomNo,
    type: 'student',
    timestamp: new Date().toISOString()
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(studentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.getElementById('student-qr');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `student-${studentId}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" />
          Digital ID Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* QR Code */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <QRCode
              id="student-qr"
              value={qrValue}
              size={200}
              level="H"
              className="rounded"
            />
          </div>

          {/* Student Info */}
          <div className="text-center mb-4">
            <p className="text-xl font-bold">{name}</p>
            <p className="text-sm opacity-90">ID: {studentId}</p>
            <p className="text-sm opacity-90">Room: {roomNo}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full">
            <button
              onClick={handleCopy}
              className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg flex items-center justify-center gap-2 transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy ID'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>

          {/* Usage Info */}
          <div className="mt-4 text-xs text-center opacity-80">
            <p>Show this QR for:</p>
            <p>• Entry/Exit • Mess Access • Library</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}