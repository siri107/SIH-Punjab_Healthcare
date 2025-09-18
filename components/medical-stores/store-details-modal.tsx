"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { MedicalStore } from "@/lib/medical-stores-data"

interface StoreDetailsModalProps {
  store: MedicalStore | null
  isOpen: boolean
  onClose: () => void
  onCall: (phoneNumber: string) => void
}

export function StoreDetailsModal({ store, isOpen, onClose, onCall }: StoreDetailsModalProps) {
  if (!store) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Medical Store Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">{store.name}</h2>
                  <p className="text-lg text-muted-foreground">Owner: {store.ownerName}</p>
                  <p className="text-sm text-muted-foreground">License: {store.licenseNumber}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {store.isVerified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </Badge>
                  )}
                  <div className="flex items-center space-x-1">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{store.rating}/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {store.phoneNumber}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Address</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{store.address}</p>
                  <p>
                    {store.village}, {store.mandal}
                  </p>
                  <p>{store.district}, Punjab</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Opening Hours</h3>
                <p className="text-sm text-muted-foreground">{store.openingHours}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-card-foreground mb-2">Services Available</h3>
              <div className="grid grid-cols-1 gap-2">
                {store.services.map((service) => (
                  <Badge key={service} variant="outline" className="justify-start py-2">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
            <Button onClick={() => onCall(store.phoneNumber)} className="flex-1">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Store
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
