"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/reservations/DatePicker";

interface SearchParams {
  text: string;
  checkIn: string;
  checkOut: string;
  status: string;
  roomType: string;
}

interface ReservationFiltersProps {
  searchParams: SearchParams;
  onSearchChange: (params: SearchParams) => void;
}

export function ReservationFilters({ searchParams, onSearchChange }: ReservationFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Guest name, email, or reservation ID"
            value={searchParams.text}
            onChange={(e) => onSearchChange({ ...searchParams, text: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Check-in Date</label>
          <DatePicker
            value={searchParams.checkIn}
            onChange={(date) => onSearchChange({ ...searchParams, checkIn: date })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Check-out Date</label>
          <DatePicker
            value={searchParams.checkOut}
            onChange={(date) => onSearchChange({ ...searchParams, checkOut: date })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select
            value={searchParams.status}
            onValueChange={(value) => onSearchChange({ ...searchParams, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Room Type</label>
          <Select
            value={searchParams.roomType}
            onValueChange={(value) => onSearchChange({ ...searchParams, roomType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="matrimonial">Matrimonial</SelectItem>
              <SelectItem value="cuadruple">Cuádruple</SelectItem>
              <SelectItem value="familiar">Familiar</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}