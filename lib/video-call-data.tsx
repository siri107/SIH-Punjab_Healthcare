export interface VideoCallSlot {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  duration: number
  price: number
  available: boolean
}

export interface VideoCallBooking {
  id: string
  doctorId: string
  doctorName: string
  specialty: string
  patientName: string
  patientPhone: string
  date: string
  time: string
  duration: number
  price: number
  symptoms?: string
  status: "scheduled" | "completed" | "cancelled"
  meetingLink?: string
  bookedAt: string
}

export const videoCallSlots: VideoCallSlot[] = [
  {
    id: "vc1",
    doctorId: "doc1",
    doctorName: "Dr. Rajesh Kumar",
    specialty: "General Medicine",
    date: "2024-01-15",
    time: "10:00",
    duration: 30,
    price: 500,
    available: true,
  },
  {
    id: "vc2",
    doctorId: "doc2",
    doctorName: "Dr. Priya Sharma",
    specialty: "Pediatrics",
    date: "2024-01-15",
    time: "11:00",
    duration: 30,
    price: 600,
    available: true,
  },
  {
    id: "vc3",
    doctorId: "doc3",
    doctorName: "Dr. Amit Singh",
    specialty: "Cardiology",
    date: "2024-01-15",
    time: "14:00",
    duration: 45,
    price: 800,
    available: true,
  },
  {
    id: "vc4",
    doctorId: "doc4",
    doctorName: "Dr. Sunita Patel",
    specialty: "Dermatology",
    date: "2024-01-16",
    time: "09:00",
    duration: 30,
    price: 700,
    available: true,
  },
  {
    id: "vc5",
    doctorId: "doc5",
    doctorName: "Dr. Vikram Reddy",
    specialty: "Orthopedics",
    date: "2024-01-16",
    time: "15:00",
    duration: 30,
    price: 750,
    available: true,
  },
]

export const mockVideoCallBookings: VideoCallBooking[] = [
  {
    id: "vb1",
    doctorId: "doc1",
    doctorName: "Dr. Rajesh Kumar",
    specialty: "General Medicine",
    patientName: "John Doe",
    patientPhone: "+91 9876543210",
    date: "2024-01-10",
    time: "10:00",
    duration: 30,
    price: 500,
    symptoms: "Fever and headache",
    status: "completed",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    bookedAt: "2024-01-08T10:00:00Z",
  },
]
