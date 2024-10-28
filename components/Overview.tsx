"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    bookings: 145,
  },
  {
    name: "Feb",
    bookings: 139,
  },
  {
    name: "Mar",
    bookings: 198,
  },
  {
    name: "Apr",
    bookings: 178,
  },
  {
    name: "May",
    bookings: 232,
  },
  {
    name: "Jun",
    bookings: 267,
  },
  {
    name: "Jul",
    bookings: 298,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="bookings"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}