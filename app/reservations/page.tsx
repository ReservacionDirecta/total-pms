"use client";

// app/reservations/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface Reservation {
  id: number;
  guestName: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: 1,
      guestName: "John Doe",
      roomNumber: "101",
      checkInDate: "2023-10-01",
      checkOutDate: "2023-10-05",
    },
    {
      id: 2,
      guestName: "Jane Smith",
      roomNumber: "102",
      checkInDate: "2023-10-02",
      checkOutDate: "2023-10-06",
    },
    // Agrega más reservas aquí
  ]);

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Reservas</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                {reservation.guestName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Room: {reservation.roomNumber}</p>
              <p className="text-sm">Check-in: {reservation.checkInDate}</p>
              <p className="text-sm">Check-out: {reservation.checkOutDate}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}