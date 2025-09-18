"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QRCodeGenerator } from "./qr-code-generator"
import { PrescriptionCard } from "./prescription-card"
import { useAuth } from "@/lib/auth-context"
import { useLanguage } from "@/lib/language-context"
import { generateHealthCardId, generateQRCodeData, mockPrescriptions } from "@/lib/health-card-data"

interface HealthCardProps {
  onBack: () => void
}

export function HealthCardComponent({ onBack }: HealthCardProps) {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [healthCard, setHealthCard] = useState<any | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    // Check if health card exists in localStorage
    const savedCard = localStorage.getItem(`healthCard_${user?.id}`)
    if (savedCard) {
      setHealthCard(JSON.parse(savedCard))
    }
  }, [user?.id])

  const generateQRCode = async () => {
    if (!user) return

    setIsGenerating(true)

    // Simulate QR generation process
    setTimeout(() => {
      const healthCardId = generateHealthCardId(user.id)
      const qrData = generateQRCodeData(user, healthCardId)

      const newHealthCard = {
        id: healthCardId,
        patientId: user.id,
        qrCode: qrData,
        isReady: true,
        generatedAt: new Date().toISOString(),
        prescriptions: mockPrescriptions,
      }

      setHealthCard(newHealthCard)
      localStorage.setItem(`healthCard_${user.id}`, JSON.stringify(newHealthCard))

      // Simulate SMS sending
      alert(
        `Health Card generated successfully!\n\nYour Health Card ID: ${healthCardId}\n\nSMS sent to ${user.phoneNumber} with QR code details.`,
      )

      setIsGenerating(false)
    }, 2000)
  }

  const downloadQR = () => {
    if (!healthCard) return

    // In a real app, this would generate and download the QR code image
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = `health-card-${healthCard.id}.png`
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  if (!user) return null

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
          <h1 className="text-xl font-bold text-primary">{t("healthCard")}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Health Card Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Digital Health Card</span>
                  {healthCard?.isReady ? (
                    <Badge className="bg-green-100 text-green-800">Ready</Badge>
                  ) : (
                    <Badge variant="outline">Not Generated</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!healthCard ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 2v20M14 2v20M4 7h16M4 17h16"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Health Card Not Generated</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate your digital health card to access all features
                    </p>
                    <Button onClick={generateQRCode} disabled={isGenerating}>
                      {isGenerating ? "Generating..." : "Generate Health Card"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-primary">Punjab Health Card</h3>
                          <p className="text-sm text-muted-foreground">ID: {healthCard.id}</p>
                        </div>
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-primary-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Name</p>
                          <p className="font-medium">{user.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Age</p>
                          <p className="font-medium">{user.age} years</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sex</p>
                          <p className="font-medium capitalize">{user.sex}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Blood Type</p>
                          <p className="font-medium">{user.bloodType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="font-medium">{user.phoneNumber}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{user.village}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="font-semibold text-card-foreground mb-3">Your QR Code</h4>
                      <div className="flex justify-center mb-4">
                        <QRCodeGenerator data={healthCard.qrCode} size={200} />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={downloadQR} className="flex-1 bg-transparent">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download
                        </Button>
                        <Button
                          onClick={() => alert(`SMS sent to ${user.phoneNumber} with QR code details.`)}
                          className="flex-1"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          Send SMS
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Prescriptions Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Prescriptions</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {healthCard
                    ? `${healthCard.prescriptions.length} prescriptions found`
                    : "Generate health card to view prescriptions"}
                </p>
              </CardHeader>
              <CardContent>
                {healthCard ? (
                  <div className="max-h-96 overflow-y-auto space-y-4">
                    {healthCard.prescriptions.length > 0 ? (
                      healthCard.prescriptions.map((prescription) => (
                        <PrescriptionCard key={prescription.id} prescription={prescription} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                        <p className="text-muted-foreground">No prescriptions found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg
                        className="w-6 h-6 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">Generate your health card first</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export { HealthCardComponent as HealthCard }
