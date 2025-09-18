"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

interface RegisterFormProps {
  onSwitchToLogin: () => void
  onRegisterSuccess: () => void
}

const districts = ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"]
const mandals = {
  Ludhiana: ["Ludhiana East", "Ludhiana West", "Ludhiana Central"],
  Amritsar: ["Amritsar East", "Amritsar West", "Amritsar Central"],
  Jalandhar: ["Jalandhar East", "Jalandhar West", "Jalandhar Central"],
  Patiala: ["Patiala East", "Patiala West", "Patiala Central"],
  Bathinda: ["Bathinda East", "Bathinda West", "Bathinda Central"],
  Mohali: ["Mohali East", "Mohali West", "Mohali Central"],
}
const villages = {
  "Ludhiana East": ["Model Town", "Civil Lines", "Sarabha Nagar"],
  "Ludhiana West": ["BRS Nagar", "Dugri", "Pakhowal Road"],
  "Ludhiana Central": ["Ghumar Mandi", "Clock Tower", "Chaura Bazaar"],
}

export function RegisterForm({ onSwitchToLogin, onRegisterSuccess }: RegisterFormProps) {
  const { t } = useLanguage()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phoneNumber: "",
    sex: "",
    district: "",
    mandal: "",
    village: "",
    bloodType: "",
    userType: "",
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await register({
        name: formData.name,
        age: Number.parseInt(formData.age),
        phoneNumber: formData.phoneNumber,
        sex: formData.sex as "male" | "female" | "other",
        district: formData.district,
        mandal: formData.mandal,
        village: formData.village,
        bloodType: formData.bloodType,
        userType: formData.userType as "patient" | "doctor" | "medical-store",
        email: formData.email || undefined,
        password: formData.password,
      })

      if (success) {
        onRegisterSuccess()
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <CardTitle className="text-2xl font-bold text-primary">{t("register")}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")} *</Label>
              <Input className="border-2 border-foreground"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">{t("age")} *</Label>
              <Input className="border-foreground border-2"
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">{t("phoneNumber")} *</Label>
              <Input className="border-foreground border-2"
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Gender">{t("Gender")} *</Label>
              <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                <SelectTrigger className="border-0">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-0">
              <Label htmlFor="district">{t("district")} *</Label>
              <Select
                value={formData.district}
                onValueChange={(value) => setFormData({ ...formData, district: value, mandal: "", village: "" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mandal">{t("mandal")} *</Label>
              <Select
                value={formData.mandal}
                onValueChange={(value) => setFormData({ ...formData, mandal: value, village: "" })}
                disabled={!formData.district}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mandal" />
                </SelectTrigger>
                <SelectContent>
                  {formData.district &&
                    mandals[formData.district as keyof typeof mandals]?.map((mandal) => (
                      <SelectItem key={mandal} value={mandal}>
                        {mandal}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="village">{t("village")} *</Label>
              <Select
                value={formData.village}
                onValueChange={(value) => setFormData({ ...formData, village: value })}
                disabled={!formData.mandal}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select village" />
                </SelectTrigger>
                <SelectContent>
                  {formData.mandal &&
                    villages[formData.mandal as keyof typeof villages]?.map((village) => (
                      <SelectItem key={village} value={village}>
                        {village}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">{t("bloodType")} *</Label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => setFormData({ ...formData, bloodType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="userType">{t("userType")} *</Label>
              <Select
                value={formData.userType}
                onValueChange={(value) => setFormData({ ...formData, userType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="medical-store">Medical Store</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input className="border-foreground border-2"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2 rounded-md border-0 border-background">
              <Label className="border-0" htmlFor="password">Password *</Label>
              <Input className="border-2 border-foreground"
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>
          {error && <div className="text-destructive text-sm text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : t("register")}
          </Button>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">
              {"Already have an account? "}
              <button type="button" onClick={onSwitchToLogin} className="text-primary hover:underline">
                {t("login")}
              </button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
