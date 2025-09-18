"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Prescription } from "@/lib/health-card-data"

interface PrescriptionCardProps {
  prescription: Prescription
}

export function PrescriptionCard({ prescription }: PrescriptionCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-primary">{prescription.doctorName}</CardTitle>
            <p className="text-sm text-muted-foreground">{prescription.doctorSpecialty}</p>
            <p className="text-sm text-muted-foreground">{prescription.hospital}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {new Date(prescription.date).toLocaleDateString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-card-foreground mb-2">Diagnosis</h4>
          <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
        </div>

        <div>
          <h4 className="font-semibold text-card-foreground mb-2">Prescribed Medicines</h4>
          <div className="space-y-3">
            {prescription.medicines.map((medicine, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="font-medium text-card-foreground">{medicine.name}</h5>
                    <p className="text-sm text-muted-foreground">Dosage: {medicine.dosage}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{medicine.frequency}</p>
                    <p>for {medicine.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {prescription.notes && (
          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Doctor's Notes</h4>
            <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
              {prescription.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
