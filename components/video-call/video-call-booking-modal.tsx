"use client"

import type React from "react"

import { useState } from "react"
import type { VideoCallSlot } from "@/lib/video-call-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { Video, Clock, IndianRupee, User, Phone, FileText } from "lucide-react"

interface VideoCallBookingModalProps {
  slot: VideoCallSlot | null
  isOpen: boolean
  onClose: () => void
  onBook: (bookingData: any) => void
}

export function VideoCallBookingModal({ slot, isOpen, onClose, onBook }: VideoCallBookingModalProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    patientName: user?.name || "",
    patientPhone: user?.phone || "",
    symptoms: "",
    emergencyContact: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  if (!slot) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const bookingData = {
      ...formData,
      slotId: slot.id,
      doctorId: slot.doctorId,
      doctorName: slot.doctorName,
      specialty: slot.specialty,
      date: slot.date,
      time: slot.time,
      duration: slot.duration,
      price: slot.price,
      meetingLink: `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
      status: "scheduled",
    }

    onBook(bookingData)
    setIsLoading(false)
    onClose()
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-primary">
            <Video className="w-5 h-5 mr-2" />
            Book Video Consultation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Doctor Info */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-primary">{slot.doctorName}</h3>
            <p className="text-sm text-muted-foreground">{slot.specialty}</p>
            <div className="flex items-center justify-between mt-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(slot.date)} at {slot.time}
              </div>
              <div className="flex items-center font-semibold text-primary">
                <IndianRupee className="w-4 h-4" />
                {slot.price}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="patientName" className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                Patient Name
              </Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="patientPhone" className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number
              </Label>
              <Input
                id="patientPhone"
                type="tel"
                value={formData.patientPhone}
                onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                placeholder="Emergency contact number"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="symptoms" className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                Symptoms / Reason for Consultation
              </Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                placeholder="Describe your symptoms or reason for consultation..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
