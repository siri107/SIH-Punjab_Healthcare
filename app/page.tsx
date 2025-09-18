"use client"

import { useState, useEffect } from "react"
import { LanguageSelection } from "@/components/language-selection"
import { AuthScreen } from "@/components/auth/auth-screen"
import { Dashboard } from "@/components/dashboard/dashboard"
import { DoctorsList } from "@/components/doctors/doctors-list"
import { MedicalStoresList } from "@/components/medical-stores/medical-stores-list"
import { HealthCard } from "@/components/health-card/health-card"
import { VideoCallList } from "@/components/video-call/video-call-list"
import { LanguageProvider } from "@/lib/language-context"
import { AuthProvider, useAuth } from "@/lib/auth-context"

function AppContent() {
  const [showLanguageSelection, setShowLanguageSelection] = useState(true)
  const [currentSection, setCurrentSection] = useState("dashboard")
  const { user } = useAuth()

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem("language")
    if (hasSelectedLanguage) {
      setShowLanguageSelection(false)
    }
  }, [])

  const handleLanguageSelected = () => {
    setShowLanguageSelection(false)
  }

  const handleAuthSuccess = () => {
    // Authentication successful, will show dashboard
  }

  const handleBackToLanguageSelection = () => {
    setShowLanguageSelection(true)
  }

  const handleNavigate = (section: string) => {
    setCurrentSection(section)
  }

  const handleBack = () => {
    setCurrentSection("dashboard")
  }

  if (showLanguageSelection) {
    return <LanguageSelection onContinue={handleLanguageSelected} />
  }

  if (!user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} onBack={handleBackToLanguageSelection} />
  }

  if (currentSection === "doctors") {
    return <DoctorsList onBack={handleBack} />
  }

  if (currentSection === "medical-store") {
    return <MedicalStoresList onBack={handleBack} />
  }

  if (currentSection === "health-card") {
    return <HealthCard onBack={handleBack} />
  }

  if (currentSection === "video-call") {
    return <VideoCallList onBack={handleBack} />
  }

  if (currentSection === "dashboard") {
    return <Dashboard onNavigate={handleNavigate} />
  }

  // Placeholder for other sections - will be implemented in next tasks
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
        </h1>
        <p className="text-muted-foreground mb-4">This section is coming soon...</p>
        <button onClick={() => setCurrentSection("dashboard")} className="text-primary hover:underline">
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}
