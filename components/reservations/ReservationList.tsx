"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface SearchParams {
  text: string;
  checkIn: string;
  checkOut: string;
  status: string;
  roomType: string;
}

interface ReservationListProps {
  searchParams: SearchParams;
}

const mockReservations = [
  {
    id: "RES-001",
    guestName: "John Doe",
    roomNumber: "M24",
    roomType: "Matrimonial",
    checkIn: "2024-10-28",
    checkOut: "2024-10-30",
    status: "confirmed",
    totalAmount: 250.00,
  },
  {
    id: "RES-002",
    guestName: "Jane Smith",
    roomNumber: "C27",
    roomType: "Cuádruple",
    checkIn: "2024-10-29",
    checkOut: "2024-11-02",
    status: "pending",
    totalAmount: 480.00,
  },
];

export function ReservationList({ searchParams }: ReservationListProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reservation ID</TableHead>
            <TableHead>Guest Name</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Check-in</TableHead>
            <TableHead>Check-out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.guestName}</TableCell>
              <TableCell>
                {reservation.roomNumber}
                <span className="text-xs text-muted-foreground ml-1">
                  ({reservation.roomType})
                </span>
              </TableCell>
              <TableCell>{reservation.checkIn}</TableCell>
              <TableCell>{reservation.checkOut}</TableCell>
              <TableCell>
                <Badge variant={reservation.status === "confirmed" ? "success" : "warning"}>
                  {reservation.status}
                </Badge>
              </TableCell>
              <TableCell>${reservation.totalAmount.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}