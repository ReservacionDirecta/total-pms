"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { Calendar } from "@/components/calendar/Calendar";
import { RoomFilter } from "@/components/calendar/RoomFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Reservation {
  date: Date;
  name: string;
  room: string;
}

const reservations: Reservation[] = [
  { date: new Date(2024, 9, 27), name: "Pedro G", room: "Matrimonial 24" },
  // Agrega más reservas aquí
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (days: number) => {
    setCurrentDate((prevDate) => addDays(prevDate, days));
  };

  const renderReservations = (date: Date) => {
    return reservations
      .filter((res) => format(res.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
      .map((res, index) => (
        <div key={index} className="bg-yellow-200 p-1 rounded">
          {res.name} - {res.room}
        </div>
      ));
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            Calendar {format(currentDate, "dd/MM/yyyy")}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDateChange(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDateChange(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <RoomFilter />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }).map((_, index) => {
          const date = addDays(currentDate, index);
          return (
            <div key={index} className="border p-2">
              <div>{format(date, "dd/MM")}</div>
              {renderReservations(date)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
