"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { ForgotPassword } from "./forgot-password"

interface AuthScreenProps {
  onAuthSuccess: () => void
  onBack: () => void
}

export function AuthScreen({ onAuthSuccess, onBack }: AuthScreenProps) {
  const [currentView, setCurrentView] = useState<"login" | "register" | "forgot">("login")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      {currentView === "login" && (
        <LoginForm
          onSwitchToRegister={() => setCurrentView("register")}
          onForgotPassword={() => setCurrentView("forgot")}
          onLoginSuccess={onAuthSuccess}
          onBack={onBack}
        />
      )}
      {currentView === "register" && (
        <RegisterForm onSwitchToLogin={() => setCurrentView("login")} onRegisterSuccess={onAuthSuccess} />
      )}
      {currentView === "forgot" && <ForgotPassword onBack={() => setCurrentView("login")} />}
    </div>
  )
}
