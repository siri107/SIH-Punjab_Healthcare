"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
  onClick: () => void
  className?: string
}

export function DashboardCard({ title, description, icon, onClick, className = "" }: DashboardCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`} onClick={onClick}>
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button variant="outline" size="sm" className="mt-4 bg-transparent">
            Open
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
