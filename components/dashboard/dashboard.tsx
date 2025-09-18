"use client"

import { useState } from "react"
import { Header } from "./header"
import { DashboardCard } from "./dashboard-card"
import { ProfileModal } from "./profile-modal"
import { useLanguage } from "@/lib/language-context"

interface DashboardProps {
  onNavigate: (section: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage()
  const [showProfile, setShowProfile] = useState(false)

  const dashboardItems = [
    {
      id: "doctors",
      title: t("doctors"),
      description: "Find and view doctor profiles",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      id: "appointments",
      title: t("appointments"),
      description: "Book appointments with doctors",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "medical-store",
      title: t("medicalStore"),
      description: "Find medical stores in your area",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      id: "health-card",
      title: t("healthCard"),
      description: "Access your digital health card",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 2v20M14 2v20M4 7h16M4 17h16" />
        </svg>
      ),
    },
    {
      id: "video-call",
      title: t("videoCall"),
      description: "Schedule video consultations",
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header onProfileClick={() => setShowProfile(true)} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">{t("dashboard")}</h2>
          <p className="text-muted-foreground">Access all healthcare services from one place</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.id}
              title={item.title}
              description={item.description}
              icon={item.icon}
              onClick={() => onNavigate(item.id)}
              className="hover:scale-105"
            />
          ))}
        </div>

        <div className="mt-12 bg-card rounded-lg p-6 border">
          <h3 className="text-xl font-semibold text-card-foreground mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-foreground">11</div>
              <div className="text-sm text-muted-foreground">Available Doctors</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <div className="text-2xl font-bold text-foreground">24/7</div>
              <div className="text-sm text-muted-foreground">Emergency Support</div>
            </div>
            <div className="text-center p-4 bg-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-foreground">100+</div>
              <div className="text-sm text-muted-foreground">Medical Stores</div>
            </div>
          </div>
        </div>
      </main>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </div>
  )
}
