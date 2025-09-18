"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddStoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (storeData: any) => void
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

const availableServices = [
  "Prescription Medicines",
  "OTC Drugs",
  "Medical Equipment",
  "Home Delivery",
  "24/7 Emergency",
  "Baby Care",
  "Elderly Care",
  "Health Supplements",
  "Ayurvedic Medicines",
  "Homeopathic Medicines",
  "Surgical Items",
  "Cosmetics",
  "Diagnostic Services",
  "Health Checkup",
]

export function AddStoreModal({ isOpen, onClose, onSubmit }: AddStoreModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    phoneNumber: "",
    address: "",
    district: "",
    mandal: "",
    village: "",
    licenseNumber: "",
    openingHours: "",
    services: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] })
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock submission - in real app, this would call an API
    setTimeout(() => {
      onSubmit({
        ...formData,
        id: Date.now().toString(),
        rating: 0,
        isVerified: false,
      })
      setIsLoading(false)
      onClose()
      // Reset form
      setFormData({
        name: "",
        ownerName: "",
        phoneNumber: "",
        address: "",
        district: "",
        mandal: "",
        village: "",
        licenseNumber: "",
        openingHours: "",
        services: [],
      })
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">Add New Medical Store</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name *</Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number *</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="district">District *</Label>
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
              <Label htmlFor="mandal">Mandal *</Label>
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
              <Label htmlFor="village">Village/Area *</Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder="Enter village/area"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="openingHours">Opening Hours *</Label>
            <Input
              id="openingHours"
              value={formData.openingHours}
              onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
              placeholder="e.g., 8:00 AM - 10:00 PM"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Services Available *</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-lg p-3">
              {availableServices.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">
                    {service}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">Select at least one service</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={formData.services.length === 0 || isLoading}>
              {isLoading ? "Adding Store..." : "Add Store"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
