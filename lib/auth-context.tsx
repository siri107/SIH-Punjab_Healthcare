"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { collection, query, where, getDocs, addDoc } from "firebase/firestore"
import { db } from "@/components/firebase"

interface User {
  id: string
  name: string
  age: number
  phoneNumber: string
  sex: "male" | "female" | "other"
  district: string
  mandal: string
  village: string
  bloodType: string
  userType: "patient" | "doctor" | "medical-store"
  email?: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  register: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  logout: () => void
  sendOTP: (phoneNumber: string) => Promise<boolean>
  verifyOTP: (phoneNumber: string, otp: string) => Promise<boolean>
  resetPassword: (phoneNumber: string, newPassword: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock data for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    age: 35,
    phoneNumber: "9876543210",
    sex: "male",
    district: "Ludhiana",
    mandal: "Ludhiana East",
    village: "Model Town",
    bloodType: "B+",
    userType: "patient",
    email: "rajesh@example.com",
    password: "password123",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    // Firestore login
    try {
      const usersRef = collection(db, "users")
      const q = query(
        usersRef,
        where("email", "==", username), // or phoneNumber/email if that's your schema
        where("password", "==", password)  // ⚠️ insecure — for demo only
      )
      console.log(username, password);
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
        const userData = { id: userDoc.id, ...userDoc.data() } as User

        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }


  const register = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    try {
      const usersRef = collection(db, "users")
      const docRef = await addDoc(usersRef, userData)

      const userWithId: User = { ...userData, id: docRef.id }
      setUser(userWithId)
      localStorage.setItem("user", JSON.stringify(userWithId))

      return true
    } catch (error) {
      console.error("Register error:", error)
      return false
    }
  }


  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const sendOTP = async (phoneNumber: string): Promise<boolean> => {
    // Mock OTP sending - in real app, this would call SMS API
    console.log(`Sending OTP to ${phoneNumber}: 123456`)
    return true
  }

  const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
    // Mock OTP verification - in real app, this would verify with backend
    return otp === "123456"
  }

  const resetPassword = async (phoneNumber: string, newPassword: string): Promise<boolean> => {
    // Mock password reset - in real app, this would call an API
    const userIndex = mockUsers.findIndex((u) => u.phoneNumber === phoneNumber)
    if (userIndex !== -1) {
      mockUsers[userIndex].password = newPassword
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        sendOTP,
        verifyOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
