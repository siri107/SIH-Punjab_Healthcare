"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { DoctorCard } from "./doctor-card"
import { DoctorProfileModal } from "./doctor-profile-modal"
import { AppointmentBookingModal } from "../appointments/appointment-booking-modal"
import { mockDoctors, type Doctor } from "@/lib/doctors-data"
import { useLanguage } from "@/lib/language-context"

interface DoctorsListProps {
  onBack: () => void
}

export function DoctorsList({ onBack }: DoctorsListProps) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  const specialties = [...new Set(mockDoctors.map((doctor) => doctor.specialty))]
  const locations = [...new Set(mockDoctors.map((doctor) => doctor.location))]

  const filteredDoctors = mockDoctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty
    const matchesLocation = selectedLocation === "all" || doctor.location === selectedLocation

    return matchesSearch && matchesSpecialty && matchesLocation
  })

  const handleViewProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowProfile(true)
  }

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowBooking(true)
    setShowProfile(false)
  }

  const handleBookingSuccess = () => {
    // In a real app, this would show a success message
    alert("Appointment booked successfully! You will receive a confirmation SMS.")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
          <h1 className="text-xl font-bold text-primary">{t("doctors")}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
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

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredDoctors.length} doctors found</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialty("all")
                setSelectedLocation("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewProfile={handleViewProfile}
              onBookAppointment={handleBookAppointment}
            />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No doctors found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <DoctorProfileModal
        doctor={selectedDoctor}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onBookAppointment={handleBookAppointment}
      />

      <AppointmentBookingModal
        doctor={selectedDoctor}
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  )
}
