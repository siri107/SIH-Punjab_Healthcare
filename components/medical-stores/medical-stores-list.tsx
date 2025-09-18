"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { MedicalStoreCard } from "./medical-store-card"
import { StoreDetailsModal } from "./store-details-modal"
import { AddStoreModal } from "./add-store-modal"
import { mockMedicalStores, type MedicalStore } from "@/lib/medical-stores-data"
import { useLanguage } from "@/lib/language-context"

interface MedicalStoresListProps {
  onBack: () => void
}

export function MedicalStoresList({ onBack }: MedicalStoresListProps) {
  const { t } = useLanguage()
  const [stores, setStores] = useState<MedicalStore[]>(mockMedicalStores)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedMandal, setSelectedMandal] = useState("all")
  const [selectedStore, setSelectedStore] = useState<MedicalStore | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showAddStore, setShowAddStore] = useState(false)

  const districts = [...new Set(stores.map((store) => store.district))]
  const mandals =
    selectedDistrict === "all"
      ? [...new Set(stores.map((store) => store.mandal))]
      : [...new Set(stores.filter((store) => store.district === selectedDistrict).map((store) => store.mandal))]

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || store.district === selectedDistrict
    const matchesMandal = selectedMandal === "all" || store.mandal === selectedMandal

    return matchesSearch && matchesDistrict && matchesMandal
  })

  const handleViewDetails = (store: MedicalStore) => {
    setSelectedStore(store)
    setShowDetails(true)
  }

  const handleCall = (phoneNumber: string) => {
    // In a real app, this would initiate a phone call
    window.open(`tel:${phoneNumber}`)
  }

  const handleAddStore = (storeData: any) => {
    setStores([...stores, storeData])
    alert("Medical store added successfully! It will be verified within 24 hours.")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Button>
            <h1 className="text-xl font-bold text-primary">{t("medicalStore")}</h1>
          </div>
          <Button onClick={() => setShowAddStore(true)} size="sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Store
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />

            <Select
              value={selectedDistrict}
              onValueChange={(value) => {
                setSelectedDistrict(value)
                setSelectedMandal("all")
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMandal} onValueChange={setSelectedMandal}>
              <SelectTrigger>
                <SelectValue placeholder="All Mandals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mandals</SelectItem>
                {mandals.map((mandal) => (
                  <SelectItem key={mandal} value={mandal}>
                    {mandal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredStores.length} stores found</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("")
                setSelectedDistrict("all")
                setSelectedMandal("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <MedicalStoreCard key={store.id} store={store} onViewDetails={handleViewDetails} onCall={handleCall} />
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-card-foreground mb-2">No medical stores found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or add a new store</p>
          </div>
        )}
      </div>

      <StoreDetailsModal
        store={selectedStore}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        onCall={handleCall}
      />

      <AddStoreModal isOpen={showAddStore} onClose={() => setShowAddStore(false)} onSubmit={handleAddStore} />
    </div>
  )
}
