// app/components/HotelCalendar.tsx
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface Reservation {
  id: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'checkout';
  roomType: string;
  roomNumber: string;
}

interface Room {
  id: string;
  name: string;
  type: string;
  category: string;
}

const HotelCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Generate array of dates for the calendar
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  // Generate column headers (dates)
  const renderDateHeaders = () => {
    const days = getDaysInMonth();
    return (
      <tr className="border-b">
        <th className="p-2 border-r bg-gray-100 min-w-40">Room</th>
        {days.map((date) => (
          <th key={date.toString()} className="p-2 border-r bg-gray-100 min-w-24">
            <div className="text-xs">{date.toLocaleDateString('default', { weekday: 'short' })}</div>
            <div>{date.getDate()}</div>
          </th>
        ))}
      </tr>
    );
  };

  // Sample room data
  const rooms: Room[] = [
    { id: '1', name: 'Matrimonial 24', type: 'Matrimonial', category: 'Standard' },
    { id: '2', name: 'Matrimonial 18', type: 'Matrimonial', category: 'Standard' },
    { id: '3', name: 'Cuádruple 27', type: 'Cuádruple', category: 'Family' },
  ];

  // Sample reservations data
  const reservations: Reservation[] = [
    {
      id: '1',
      guestName: 'John Doe',
      checkIn: new Date(2024, 9, 1),
      checkOut: new Date(2024, 9, 3),
      status: 'confirmed',
      roomType: 'Matrimonial',
      roomNumber: '24'
    },
    // Add more sample reservations as needed
  ];

  const renderReservationCell = (room: Room, date: Date) => {
    const reservation = reservations.find(r => 
      r.roomNumber === room.id &&
      date >= r.checkIn &&
      date <= r.checkOut
    );

    if (reservation) {
      return (
        <div className="h-full w-full bg-blue-500 text-white p-1 text-xs">
          {reservation.guestName}
        </div>
      );
    }

    return null;
  };

  // Render room rows with reservations
  const renderRoomRows = () => {
    return rooms.map((room) => (
      <tr key={room.id} className="border-b">
        <td className="p-2 border-r">
          <div className="font-medium">{room.name}</div>
          <div className="text-xs text-gray-500">{room.category}</div>
        </td>
        {getDaysInMonth().map((date) => (
          <td key={date.toString()} className="border-r p-0 h-16">
            {renderReservationCell(room, date)}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium">
            {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-2">
          <select className="border p-1 rounded">
            <option>Todos</option>
            <option>Standard</option>
            <option>Family</option>
          </select>
          <select className="border p-1 rounded">
            <option>Todos</option>
            <option>Matrimonial</option>
            <option>Cuádruple</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            {renderDateHeaders()}
          </thead>
          <tbody>
            {renderRoomRows()}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default HotelCalendar;