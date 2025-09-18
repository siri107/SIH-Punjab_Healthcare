"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "hindi" | "english" | "punjabi" | "telugu"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  hindi: {
    selectLanguage: "भाषा चुनें",
    continue: "जारी रखें",
    login: "लॉगिन",
    register: "पंजीकरण",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    forgotPassword: "पासवर्ड भूल गए?",
    name: "नाम",
    age: "उम्र",
    phoneNumber: "फोन नंबर",
    sex: "लिंग",
    district: "जिला",
    mandal: "मंडल",
    village: "गांव",
    bloodType: "रक्त समूह",
    userType: "उपयोगकर्ता प्रकार",
    email: "ईमेल",
    dashboard: "डैशबोर्ड",
    doctors: "डॉक्टर",
    appointments: "अपॉइंटमेंट",
    medicalStore: "मेडिकल स्टोर",
    healthCard: "स्वास्थ्य कार्ड",
    videoCall: "वीडियो कॉल",
    profile: "प्रोफाइल",
    welcome: "स्वागत है",
  },
  english: {
    selectLanguage: "Select Language",
    continue: "Continue",
    login: "Login",
    register: "Register",
    username: "Username",
    password: "Password",
    forgotPassword: "Forgot Password?",
    name: "Name",
    age: "Age",
    phoneNumber: "Phone Number",
    sex: "Sex",
    district: "District",
    mandal: "Mandal",
    village: "Village",
    bloodType: "Blood Type",
    userType: "User Type",
    email: "Email",
    dashboard: "Dashboard",
    doctors: "Doctors",
    appointments: "Appointments",
    medicalStore: "Medical Store",
    healthCard: "Health Card",
    videoCall: "Video Call",
    profile: "Profile",
    welcome: "Welcome",
  },
  punjabi: {
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    continue: "ਜਾਰੀ ਰੱਖੋ",
    login: "ਲਾਗਇਨ",
    register: "ਰਜਿਸਟਰ",
    username: "ਯੂਜ਼ਰਨੇਮ",
    password: "ਪਾਸਵਰਡ",
    forgotPassword: "ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?",
    name: "ਨਾਮ",
    age: "ਉਮਰ",
    phoneNumber: "ਫੋਨ ਨੰਬਰ",
    sex: "ਲਿੰਗ",
    district: "ਜ਼ਿਲ੍ਹਾ",
    mandal: "ਮੰਡਲ",
    village: "ਪਿੰਡ",
    bloodType: "ਖੂਨ ਦਾ ਗਰੁੱਪ",
    userType: "ਯੂਜ਼ਰ ਕਿਸਮ",
    email: "ਈਮੇਲ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    doctors: "ਡਾਕਟਰ",
    appointments: "ਮੁਲਾਕਾਤਾਂ",
    medicalStore: "ਮੈਡੀਕਲ ਸਟੋਰ",
    healthCard: "ਸਿਹਤ ਕਾਰਡ",
    videoCall: "ਵੀਡੀਓ ਕਾਲ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    welcome: "ਜੀ ਆਇਆਂ ਨੂੰ",
  },
  telugu: {
    selectLanguage: "భాషను ఎంచుకోండి",
    continue: "కొనసాగించు",
    login: "లాగిన్",
    register: "రిజిస్టర్",
    username: "యూజర్‌నేమ్",
    password: "పాస్‌వర్డ్",
    forgotPassword: "పాస్‌వర్డ్ మర్చిపోయారా?",
    name: "పేరు",
    age: "వయస్సు",
    phoneNumber: "ఫోన్ నంబర్",
    sex: "లింగం",
    district: "జిల్లా",
    mandal: "మండలం",
    village: "గ్రామం",
    bloodType: "రక్త వర్గం",
    userType: "యూజర్ రకం",
    email: "ఇమెయిల్",
    dashboard: "డాష్‌బోర్డ్",
    doctors: "వైద్యులు",
    appointments: "అపాయింట్‌మెంట్‌లు",
    medicalStore: "మెడికల్ స్టోర్",
    healthCard: "ఆరోగ్య కార్డ్",
    videoCall: "వీడియో కాల్",
    profile: "ప్రొఫైల్",
    welcome: "స్వాగతం",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("english")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[Language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
