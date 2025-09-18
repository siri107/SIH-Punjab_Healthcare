export interface Prescription {
  id: string
  doctorName: string
  doctorSpecialty: string
  hospital: string
  date: string
  medicines: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  diagnosis: string
  notes?: string
}

export interface HealthCard {
  id: string
  patientId: string
  qrCode: string
  isReady: boolean
  generatedAt: string
  prescriptions: Prescription[]
}

export const mockPrescriptions: Prescription[] = [
  {
    id: "1",
    doctorName: "Dr. Rajesh Kumar",
    doctorSpecialty: "Cardiologist",
    hospital: "Punjab Heart Institute",
    date: "2024-01-15",
    medicines: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "30 days",
      },
      {
        name: "Metoprolol",
        dosage: "50mg",
        frequency: "Twice daily",
        duration: "30 days",
      },
    ],
    diagnosis: "Hypertension and High Cholesterol",
    notes: "Follow up after 1 month. Maintain low sodium diet.",
  },
  {
    id: "2",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialty: "General Physician",
    hospital: "City Hospital",
    date: "2024-01-10",
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "5 days",
      },
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "7 days",
      },
    ],
    diagnosis: "Viral Fever and Allergic Rhinitis",
    notes: "Take plenty of rest and fluids.",
  },
  {
    id: "3",
    doctorName: "Dr. Harpreet Singh",
    doctorSpecialty: "Orthopedic",
    hospital: "Bone & Joint Clinic",
    date: "2024-01-05",
    medicines: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Twice daily",
        duration: "10 days",
      },
      {
        name: "Calcium + Vitamin D3",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "30 days",
      },
    ],
    diagnosis: "Lower Back Pain",
    notes: "Avoid heavy lifting. Do prescribed exercises.",
  },
]

export function generateHealthCardId(userId: string): string {
  return `PH-${userId.slice(0, 4).toUpperCase()}-${Date.now().toString().slice(-6)}`
}

export function generateQRCodeData(user: any, healthCardId: string): string {
  return JSON.stringify({
    id: healthCardId,
    name: user.name,
    age: user.age,
    sex: user.sex,
    bloodType: user.bloodType,
    phoneNumber: user.phoneNumber,
    village: user.village,
    mandal: user.mandal,
    district: user.district,
    generatedAt: new Date().toISOString(),
  })
}
