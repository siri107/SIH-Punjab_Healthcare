"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Doctor } from "@/lib/doctors-data"

interface DoctorCardProps {
  doctor: Doctor
  onViewProfile: (doctor: Doctor) => void
  onBookAppointment: (doctor: Doctor) => void
}

export function DoctorCard({ doctor, onViewProfile, onBookAppointment }: DoctorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 flex-row">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div className="flex-1 min-w-0 my-0 mx-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{doctor.name}</h3>
                <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                <p className="text-xs text-muted-foreground">{doctor.qualification}</p>
              </div>
              <div className="flex items-center space-x-1 flex-row">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-medium">{doctor.rating}</span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                {doctor.hospital}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {doctor.location}
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {doctor.experience} years exp.
                </Badge>
                
              </div>
            </div>

            <div className="mt-4 flex flex-col  space-y-2">
              <Button variant="outline" size="sm" onClick={() => onViewProfile(doctor)} className="flex-1 border-0 my-1 px-4 py-2 text-base font-semibold">
                View Profile
              </Button>
              <Button size="sm" onClick={() => onBookAppointment(doctor)} className=" w flex-1 text-left py-2.5 px-8.5x.5x.5.5 mx-0 mx-0.5 mx-1 mx-0.5 mx-0 text-sm"> 
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
