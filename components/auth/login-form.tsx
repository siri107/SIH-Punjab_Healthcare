"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft } from "lucide-react"


import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/components/firebase";

interface LoginFormProps {
  onSwitchToRegister: () => void
  onForgotPassword: () => void
  onLoginSuccess: () => void
  onBack: () => void
}

export function LoginForm({ onSwitchToRegister, onForgotPassword, onLoginSuccess, onBack }: LoginFormProps) {
  const { t } = useLanguage()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(formData.username, formData.password)
      if (success) {
        onLoginSuccess()
      } else {
        setError("Invalid username or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="absolute -top-12 left-0 text-primary hover:text-primary/80 p-2"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        {t("back")}
      </Button>

      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">{t("login")}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("username")}</Label>
              <Input className="border-2 border-foreground"
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Phone number or email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("password")}</Label>
              <Input className="border-foreground border-2"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            {error && <div className="text-destructive text-sm text-center">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : t("login")}
            </Button>
            <div className="text-center space-y-2">
              <button type="button" onClick={onForgotPassword} className="text-primary hover:underline text-sm">
                {t("forgotPassword")}
              </button>
              <div className="text-sm text-muted-foreground">
                {"Don't have an account? "}
                <button type="button" onClick={onSwitchToRegister} className="text-primary hover:underline">
                  {t("register")}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
