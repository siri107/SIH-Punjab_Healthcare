"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

interface HeaderProps {
  onProfileClick: () => void
}

export function Header({ onProfileClick }: HeaderProps) {
  const { t } = useLanguage()
  const { user, logout } = useAuth()

  return (
    <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary">TeleMed</h1>
          <p className="text-muted-foreground font-mono text-justify text-sm"> Where technology meets care  </p>
        </div>
      </div>

      <div className="flex items-center flex-row justify-end space-x-0">
        <Button variant="ghost" size="sm" onClick={onProfileClick} className="flex items-center flex-row space-x-0">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm mx-0 px-0 text-right">
              {user?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">{user?.name}</span>
        </Button>
        <Button variant="outline" size="sm" onClick={logout} className="text-xs bg-transparent">
          Logout
        </Button>
      </div>
    </header>
  )
}
