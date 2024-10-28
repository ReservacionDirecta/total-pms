"use client";

import { useState } from "react";
import { ReservationFilters } from "@/components/reservations/ReservationFilters";
import { ReservationList } from "@/components/reservations/ReservationList";
import { ReservationStats } from "@/components/reservations/ReservationStats";

export default function ReservationsPage() {
  const [searchParams, setSearchParams] = useState({
    text: "",
    checkIn: "",
    checkOut: "",
    status: "all",
    roomType: "all",
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">Reservations</h1>
        <ReservationStats />
      </div>
      
      <ReservationFilters 
        searchParams={searchParams} 
        onSearchChange={(params) => setSearchParams(params)} 
      />
      
      <ReservationList searchParams={searchParams} />
    </div>
  );
}