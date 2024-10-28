"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const bookings = [
  {
    guest: "John Smith",
    room: "Matrimonial 24",
    checkIn: "Oct 28",
    checkOut: "Oct 30",
    status: "Confirmed",
  },
  {
    guest: "Maria Garcia",
    room: "Cuádruple 27",
    checkIn: "Oct 29",
    checkOut: "Nov 2",
    status: "Pending",
  },
  {
    guest: "Robert Johnson",
    room: "Familiar 20",
    checkIn: "Oct 30",
    checkOut: "Nov 1",
    status: "Confirmed",
  },
];

export function RecentBookings() {
  return (
    <div className="space-y-8">
      {bookings.map((booking) => (
        <div key={booking.guest} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {booking.guest.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{booking.guest}</p>
            <p className="text-sm text-muted-foreground">
              {booking.room} • {booking.checkIn} - {booking.checkOut}
            </p>
          </div>
          <div className="ml-auto">
            <span className={`text-sm ${
              booking.status === "Confirmed" 
                ? "text-green-500" 
                : "text-yellow-500"
            }`}>
              {booking.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}