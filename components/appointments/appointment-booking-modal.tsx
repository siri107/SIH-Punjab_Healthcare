"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Doctor } from "@/lib/doctors-data"
import { useAuth } from "@/lib/auth-context"

interface AppointmentBookingModalProps {
  doctor: Doctor | null
  isOpen: boolean
  onClose: () => void
  onBookingSuccess: () => void
}

export function AppointmentBookingModal({ doctor, isOpen, onClose, onBookingSuccess }: AppointmentBookingModalProps) {
  const { user } = useAuth()
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!doctor || !user) return null

  const today = new Date()
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

  const generateDateOptions = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
      dates.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      })
    }
    return dates
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedSlot) return

    setIsLoading(true)

    // Mock booking - in real app, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      onBookingSuccess()
      onClose()
      // Reset form
      setSelectedDate("")
      setSelectedSlot("")
      setSymptoms("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Book Appointment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">{doctor.name}</h3>
                <p className="text-sm text-primary">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">₹{doctor.consultationFee}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Patient Details</Label>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
              <p className="text-sm text-muted-foreground">
                {user.age} years, {user.sex}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose appointment date" />
              </SelectTrigger>
              <SelectContent>
                {generateDateOptions().map((date) => (
                  <SelectItem key={date.value} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slot">Select Time Slot</Label>
            <div className="grid grid-cols-3 gap-2">
              {doctor.availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    selectedSlot === slot
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-muted border-border"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms/Reason (Optional)</Label>
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms or reason for visit..."
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleBookAppointment}
              className="flex-1"
              disabled={!selectedDate || !selectedSlot || isLoading}
            >
              {isLoading ? "Booking..." : "Book Appointment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
