'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar as CalendarIcon, Edit, Printer, Star } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

interface Reservation {
  id: string
  guestName: string
  checkIn: Date
  checkOut: Date
  status: 'confirmed' | 'pending' | 'checkedIn' | 'checkedOut'
  roomType: string
  roomNumber: string
}

interface Room {
  id: string
  name: string
  type: string
  category: string
}

const rooms: Room[] = [
  { id: '1', name: 'Matrimonial 24', type: 'Matrimonial', category: 'Standard' },
  { id: '2', name: 'Matrimonial 18', type: 'Matrimonial', category: 'Standard' },
  { id: '3', name: 'Matrimonial 17', type: 'Matrimonial', category: 'Standard' },
  { id: '4', name: 'Matrimonial 02', type: 'Matrimonial', category: 'Standard' },
  { id: '5', name: 'Familiar 20', type: 'Familiar', category: 'Family' },
  { id: '6', name: 'Cuádruple 27', type: 'Cuádruple', category: 'Family' },
  { id: '7', name: 'Cuádruple 26', type: 'Cuádruple', category: 'Family' },
  { id: '8', name: 'Cuádruple 23', type: 'Cuádruple', category: 'Family' },
  { id: '9', name: 'Cuádruple 19', type: 'Cuádruple', category: 'Family' },
  { id: '10', name: 'Cuádruple 14', type: 'Cuádruple', category: 'Family' },
  { id: '11', name: 'Cuádruple 12', type: 'Cuádruple', category: 'Family' },
]

const reservations: Reservation[] = [
  {
    id: '40045',
    guestName: 'Ximena Medrano A',
    checkIn: new Date(2024, 9, 28),
    checkOut: new Date(2024, 9, 31),
    status: 'confirmed',
    roomType: 'Cuádruple',
    roomNumber: '12'
  },
  {
    id: '40046',
    guestName: 'Pedro Oma',
    checkIn: new Date(2024, 10, 1),
    checkOut: new Date(2024, 10, 5),
    status: 'confirmed',
    roomType: 'Matrimonial',
    roomNumber: '24'
  },
  {
    id: '40047',
    guestName: 'Micaela Val',
    checkIn: new Date(2024, 10, 6),
    checkOut: new Date(2024, 10, 9),
    status: 'confirmed',
    roomType: 'Matrimonial',
    roomNumber: '18'
  },
  {
    id: '40048',
    guestName: 'Ruth Rebe',
    checkIn: new Date(2024, 10, 2),
    checkOut: new Date(2024, 10, 7),
    status: 'checkedIn',
    roomType: 'Matrimonial',
    roomNumber: '17'
  },
  {
    id: '40049',
    guestName: 'Ingeniera J',
    checkIn: new Date(2024, 10, 10),
    checkOut: new Date(2024, 10, 15),
    status: 'pending',
    roomType: 'Matrimonial',
    roomNumber: '02'
  },
  {
    id: '40050',
    guestName: 'Diana Karina Alcántara Gar',
    checkIn: new Date(2024, 10, 3),
    checkOut: new Date(2024, 10, 6),
    status: 'confirmed',
    roomType: 'Familiar',
    roomNumber: '20'
  },
]

const statusColors = {
  confirmed: 'bg-yellow-200',
  pending: 'bg-blue-200',
  checkedIn: 'bg-green-200',
  checkedOut: 'bg-gray-200',
}

export default function ImprovedPMSCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 9, 28))
  const [selectedBooking, setSelectedBooking] = useState<Reservation | null>(null)
  const [roomFilter, setRoomFilter] = useState('Todos')
  const [categoryFilter, setCategoryFilter] = useState('Todos')

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  }

  const renderDateHeaders = () => {
    const days = getDaysInMonth()
    return (
      <TableRow>
        <TableHead className="w-48 sticky left-0 bg-background z-10">Habitación</TableHead>
        {days.map((date) => (
          <TableHead key={date.toString()} className="p-0 text-center min-w-[40px]">
            <div>{date.getDate()}</div>
            <div className="text-xs">{date.toLocaleString('es', { weekday: 'short' })}</div>
          </TableHead>
        ))}
      </TableRow>
    )
  }

  const renderReservationCell = (room: Room, date: Date) => {
    const reservation = reservations.find(r => 
      r.roomNumber === room.id &&
      date >= r.checkIn &&
      date < r.checkOut
    )

    if (reservation) {
      return (
        <Draggable key={reservation.id} draggableId={reservation.id} index={parseInt(room.id)}>
          {(provided) => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${statusColors[reservation.status]} text-xs p-1 h-full cursor-pointer`}
                    onClick={() => setSelectedBooking(reservation)}
                  >
                    <Star className="inline-block h-3 w-3 mr-1" />
                    {reservation.guestName}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reserva: {reservation.id}</p>
                  <p>Huésped: {reservation.guestName}</p>
                  <p>Estado: {reservation.status}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Draggable>
      )
    }

    return <div className="bg-green-100 h-full">&nbsp;</div>
  }

  const renderRoomRows = () => {
    return rooms
      .filter(room => categoryFilter === 'Todos' || room.category === categoryFilter)
      .filter(room => roomFilter === 'Todos' || room.type === roomFilter)
      .map((room) => (
        <Droppable key={room.id} droppableId={`room-${room.id}`} direction="horizontal">
          {(provided) => (
            <TableRow ref={provided.innerRef} {...provided.droppableProps}>
              <TableCell className="font-medium sticky left-0 bg-background z-10">
                <div>{room.name}</div>
                <div className="text-xs text-gray-500">{room.category}</div>
              </TableCell>
              {getDaysInMonth().map((date) => (
                <TableCell key={date.toString()} className="p-0">
                  {renderReservationCell(room, date)}
                </TableCell>
              ))}
              {provided.placeholder}
            </TableRow>
          )}
        </Droppable>
      ))
  }

  const onDragEnd = (result) => {
    // Implement drag and drop logic here
    console.log('Drag ended', result)
  }

  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon"><ChevronsLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="font-medium">
              {currentDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><ChevronsRight className="h-4 w-4" /></Button>
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <option value="Todos">Categorías: Todos</option>
              <option value="Standard">Standard</option>
              <option value="Family">Family</option>
            </Select>
            <Select value={roomFilter} onValueChange={setRoomFilter}>
              <option value="Todos">Tipo de habitación: Todos</option>
              <option value="Matrimonial">Matrimonial</option>
              <option value="Familiar">Familiar</option>
              <option value="Cuádruple">Cuádruple</option>
            </Select>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {renderDateHeaders()}
              </TableHeader>
              <TableBody>
                {renderRoomRows()}
              </TableBody>
            </Table>
          </div>
        </DragDropContext>
      </CardContent>
      <BookingDetailsDialog booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </Card>
  )
}

function BookingDetailsDialog({ booking, onClose }: { booking: Reservation | null, onClose: () => void }) {
  if (!booking) return null

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Reserva #{booking.id}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="flex justify-between mb-4">
              <div>
                <Checkbox id="leida" />
                <label htmlFor="leida" className="ml-2">Leída</label>
              </div>
              <div>
                <Checkbox id="check-in" checked={booking.status === 'checkedIn'} />
                <label htmlFor="check-in" className="ml-2">Check-in realizado</label>
              </div>
              <div>
                <Checkbox id="check-out" checked={booking.status === 'checkedOut'} />
                <label htmlFor="check-out" className="ml-2">Check-out realizado</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-in:</label>
                <Input type="date" value={booking.checkIn.toISOString().split('T')[0]} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Check-out:</label>
                <Input type="date" value={booking.checkOut.toISOString().split('T')[0]} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                <Input value={booking.guestName} readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Empresa o cargo:</label>
                <Input readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección:</label>
                <Input readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad:</label>
                <Input readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Código postal:</label>
                <Input readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">País:</label>
                <Input readOnly />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono:</label>
                <Input readOnly />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Huéspedes en la reserva:</label>
              <Input type="number" defaultValue={2} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Ocupantes en esta habitación:</label>
              <Input type="number" defaultValue={2} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Origen:</label>
              <Input defaultValue="Recepción" />
            </div>
            <div className="mb-4">
              <label  className="block text-sm font-medium text-gray-700">Total:</label>
              <Input defaultValue="584,10" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Pagado:</label>
              <Input defaultValue="584,10" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Nota interna:</label>
          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={3}></textarea>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Comentarios del huésped:</label>
          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows={3}></textarea>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
          <Button><Edit className="mr-2 h-4 w-4" /> Editar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}