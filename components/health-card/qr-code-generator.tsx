"use client"

import { useEffect, useRef } from "react"

interface QRCodeGeneratorProps {
  data: string
  size?: number
  className?: string
}

export function QRCodeGenerator({ data, size = 200, className = "" }: QRCodeGeneratorProps) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current) return

    // Parse the health card data and format it properly
    let healthData
    try {
      healthData = JSON.parse(data)
    } catch {
      healthData = { error: "Invalid data format" }
    }

    // Format the data as a structured text that's easy to read when scanned
    const qrText = `PUNJAB HEALTH CARD
Name: ${healthData.name || "N/A"}
ID: ${healthData.id || "N/A"}
Age: ${healthData.age || "N/A"}
Sex: ${healthData.sex || "N/A"}
Blood Type: ${healthData.bloodType || "N/A"}
Phone: ${healthData.phoneNumber || "N/A"}
Emergency: ${healthData.emergencyContact || "N/A"}
Address: ${healthData.village || "N/A"}, ${healthData.mandal || "N/A"}, ${healthData.district || "N/A"}
Issued by: Punjab Health Department`

    // Use QR Server API to generate a proper QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrText)}&format=png&ecc=M`

    imgRef.current.src = qrUrl
    imgRef.current.alt = "Health Card QR Code"
  }, [data, size])

  return (
    <div className={`inline-block border border-border rounded-lg overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        width={size}
        height={size}
        className="block"
        style={{ width: size, height: size }}
        alt="Loading QR Code..."
      />
    </div>
  )
}
