"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"

interface LanguageSelectionProps {
  onContinue: () => void
}

export function LanguageSelection({ onContinue }: LanguageSelectionProps) {
  const { language, setLanguage, t } = useLanguage()
  const [selectedLanguage, setSelectedLanguage] = useState<string>(language)

  const languages = [
    { code: "hindi", name: "हिंदी", englishName: "Hindi" },
    { code: "english", name: "English", englishName: "English" },
    { code: "punjabi", name: "ਪੰਜਾਬੀ", englishName: "Punjabi" },
    { code: "telugu", name: "తెలుగు", englishName: "Telugu" },
  ]

  const handleContinue = () => {
    setLanguage(selectedLanguage as any)
    onContinue()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">{t("selectLanguage")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedLanguage === lang.code
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                <div className="font-semibold text-lg">{lang.name}</div>
                <div className="text-sm text-muted-foreground">{lang.englishName}</div>
              </button>
            ))}
          </div>
          <Button onClick={handleContinue} className="w-full mt-6 py-3 text-lg font-semibold" size="lg">
            {t("continue")}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
