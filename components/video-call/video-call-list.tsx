"use client"

import { useState } from "react"
import { ArrowLeft, Search, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoCallSlotCard } from "./video-call-slot-card"
import { VideoCallBookingModal } from "./video-call-booking-modal"
import { videoCallSlots, type VideoCallSlot } from "@/lib/video-call-data"
import { useLanguage } from "@/lib/language-context"

interface VideoCallListProps {
  onBack: () => void
}

export function VideoCallList({ onBack }: VideoCallListProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedSlot, setSelectedSlot] = useState<VideoCallSlot | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const specialties = Array.from(new Set(videoCallSlots.map((slot) => slot.specialty)))
  const dates = Array.from(new Set(videoCallSlots.map((slot) => slot.date)))

  const filteredSlots = videoCallSlots.filter((slot) => {
    const matchesSearch =
      slot.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      slot.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "all" || slot.specialty === selectedSpecialty
    const matchesDate = selectedDate === "all" || slot.date === selectedDate

    return matchesSearch && matchesSpecialty && matchesDate && slot.available
  })

  const handleBookSlot = (slot: VideoCallSlot) => {
    setSelectedSlot(slot)
    setIsBookingModalOpen(true)
  }

  const handleBookingConfirm = (bookingData: any) => {
    // In a real app, this would save to backend
    console.log("Video call booked:", bookingData)

    // Show success message
    alert(
      `Video call booked successfully!\n\nDoctor: ${bookingData.doctorName}\nDate: ${bookingData.date} at ${bookingData.time}\n\nMeeting link will be sent via SMS before the appointment.`,
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Video Consultations</h1>
            <p className="text-sm opacity-90">Book online video calls with doctors</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background text-foreground"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="flex-1 bg-background text-foreground">
                <SelectValue placeholder="All Specialties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="flex-1 bg-background text-foreground">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                {dates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 bg-green-50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-green-700">
            <Video className="w-4 h-4 mr-1" />
            {filteredSlots.length} available slots
          </div>
          <div className="flex items-center text-green-700">
            <Clock className="w-4 h-4 mr-1" />
            Starting from ₹500
          </div>
        </div>
      </div>

      {/* Video Call Slots */}
      <div className="p-4 space-y-4">
        {filteredSlots.length === 0 ? (
          <div className="text-center py-8">
            <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No video call slots available</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search filters or check back later</p>
          </div>
        ) : (
          filteredSlots.map((slot) => <VideoCallSlotCard key={slot.id} slot={slot} onBook={handleBookSlot} />)
        )}
      </div>

      {/* Booking Modal */}
      <VideoCallBookingModal
        slot={selectedSlot}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBook={handleBookingConfirm}
      />
    </div>
  )
}
