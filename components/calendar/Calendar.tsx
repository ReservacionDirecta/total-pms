"use client";

import { addDays, format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarCell } from "./CalendarCell";
import { cn } from "@/lib/utils";

interface CalendarProps {
  currentDate: Date;
}

const rooms = [
  { id: "m24", name: "Matrimonial 24", type: "matrimonial" },
  { id: "m18", name: "Matrimonial 18", type: "matrimonial" },
  { id: "m17", name: "Matrimonial 17", type: "matrimonial" },
  { id: "c27", name: "Cuádruple 27", type: "cuadruple" },
  { id: "c26", name: "Cuádruple 26", type: "cuadruple" },
  { id: "c23", name: "Cuádruple 23", type: "cuadruple" },
  { id: "f20", name: "Familiar 20", type: "familiar" },
  { id: "f09", name: "Familiar 09", type: "familiar" },
];

const bookings = [
  {
    id: "1",
    roomId: "m24",
    guestName: "Pedro Om",
    startDate: "2024-10-29",
    endDate: "2024-11-02",
    status: "confirmed",
  },
  {
    id: "2",
    roomId: "c27",
    guestName: "Mildred Carolina",
    startDate: "2024-11-15",
    endDate: "2024-11-18",
    status: "confirmed",
  },
];

export function Calendar({ currentDate }: CalendarProps) {
  const days = Array.from({ length: 30 }, (_, i) => addDays(currentDate, i));

  return (
    <ScrollArea className="h-[calc(100vh-12rem)] border rounded-lg">
      <div className="min-w-[1200px]">
        {/* Header */}
        <div className="grid grid-cols-[200px_repeat(30,_minmax(40px,_1fr))] sticky top-0 z-10 bg-background border-b">
          <div className="p-2 font-medium border-r">Room</div>
          {days.map((day, i) => (
            <div
              key={i}
              className={cn(
                "p-2 text-center text-sm border-r",
                format(day, "eee") === "Sun" && "bg-red-50"
              )}
            >
              <div>{format(day, "dd")}</div>
              <div className="text-muted-foreground">{format(day, "eee")}</div>
            </div>
          ))}
        </div>

        {/* Room rows */}
        {rooms.map((room) => (
          <div
            key={room.id}
            className="grid grid-cols-[200px_repeat(30,_minmax(40px,_1fr))] border-b"
          >
            <div className="p-2 font-medium border-r bg-muted/5">
              {room.name}
            </div>
            {days.map((day, i) => (
              <CalendarCell
                key={i}
                date={day}
                room={room}
                booking={bookings.find(
                  (b) =>
                    b.roomId === room.id &&
                    new Date(b.startDate) <= day &&
                    new Date(b.endDate) >= day
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}