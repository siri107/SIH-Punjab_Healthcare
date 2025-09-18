"use client"

import type { VideoCallSlot } from "@/lib/video-call-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Video, IndianRupee } from "lucide-react"

interface VideoCallSlotCardProps {
  slot: VideoCallSlot
  onBook: (slot: VideoCallSlot) => void
}

export function VideoCallSlotCard({ slot, onBook }: VideoCallSlotCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-primary">{slot.doctorName}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{slot.specialty}</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Video className="w-3 h-3 mr-1" />
            Video Call
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {formatDate(slot.date)} at {slot.time}
          </div>
          <span className="text-xs text-muted-foreground">{slot.duration} mins</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center font-semibold text-primary">
            <IndianRupee className="w-4 h-4" />
            {slot.price}
          </div>
          <Button onClick={() => onBook(slot)} disabled={!slot.available} className="bg-primary hover:bg-primary/90">
            {slot.available ? "Book Video Call" : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
