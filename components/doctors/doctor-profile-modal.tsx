"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Doctor } from "@/lib/doctors-data"

interface DoctorProfileModalProps {
  doctor: Doctor | null
  isOpen: boolean
  onClose: () => void
  onBookAppointment: (doctor: Doctor) => void
}

export function DoctorProfileModal({ doctor, isOpen, onClose, onBookAppointment }: DoctorProfileModalProps) {
  if (!doctor) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Doctor Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-card-foreground">{doctor.name}</h2>
              <p className="text-lg text-primary font-medium">{doctor.specialty}</p>
              <p className="text-muted-foreground">{doctor.qualification}</p>

              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{doctor.rating}/5</span>
                </div>
                <Badge variant="secondary">{doctor.experience} years experience</Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Hospital</h3>
                <p className="text-muted-foreground">{doctor.hospital}</p>
              </div>

              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">{doctor.location}</p>
              </div>

              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Consultation Fee</h3>
                <p className="text-2xl font-bold text-primary">₹{doctor.consultationFee}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Available Time Slots</h3>
              <div className="grid grid-cols-3 gap-2">
                {doctor.availableSlots.map((slot) => (
                  <Badge key={slot} variant="outline" className="justify-center py-1">
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className=" flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
            <Button onClick={() => onBookAppointment(doctor)} className="flex-1">
              Book Appointment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
