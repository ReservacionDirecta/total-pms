"use client";

import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarCellProps {
  date: Date;
  room: {
    id: string;
    name: string;
    type: string;
  };
  booking?: {
    id: string;
    guestName: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

export function CalendarCell({ date, room, booking }: CalendarCellProps) {
  const isWeekend = format(date, "eee") === "Sun" || format(date, "eee") === "Sat";

  return (
    <div
      className={cn(
        "p-1 border-r min-h-[50px] group cursor-pointer hover:bg-muted/50 relative",
        isWeekend && "bg-muted/5",
        booking && "bg-blue-100 hover:bg-blue-200"
      )}
    >
      {booking && (
        <div className="absolute inset-0 flex items-center justify-center text-xs">
          <span className="truncate px-1">{booking.guestName}</span>
        </div>
      )}
    </div>
  );
}