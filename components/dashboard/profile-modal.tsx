"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age.toString() || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    district: user?.district || "",
    mandal: user?.mandal || "",
    village: user?.village || "",
  })

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">{t("profile")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("name")}</Label>
                {isEditing ? (
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                ) : (
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                )}
              </div>
              <div>
                <Label>{t("age")}</Label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{user.age}</p>
                )}
              </div>
            </div>

            <div>
              <Label>{t("phoneNumber")}</Label>
              {isEditing ? (
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.phoneNumber}</p>
              )}
            </div>

            <div>
              <Label>{t("email")}</Label>
              {isEditing ? (
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{user.email || "Not provided"}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label>{t("district")}</Label>
                <p className="text-sm text-muted-foreground">{user.district}</p>
              </div>
              <div>
                <Label>{t("mandal")}</Label>
                <p className="text-sm text-muted-foreground">{user.mandal}</p>
              </div>
              <div>
                <Label>{t("village")}</Label>
                <p className="text-sm text-muted-foreground">{user.village}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t("bloodType")}</Label>
                <p className="text-sm text-muted-foreground">{user.bloodType}</p>
              </div>
              <div>
                <Label>{t("userType")}</Label>
                <p className="text-sm text-muted-foreground capitalize">{user.userType}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
