"use client"

import type React from "react"

import type { Color, Size } from "@/types"
import { useSearchParams, useRouter } from "next/navigation"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ActiveFiltersProps {
  sizes: Size[]
  colors: Color[]
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ sizes, colors }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedSizeId = searchParams.get("sizeId")
  const selectedColorId = searchParams.get("colorId")

  if (!selectedSizeId && !selectedColorId) return null

  const selectedSize = selectedSizeId ? sizes.find((size) => size.id === selectedSizeId) : null

  const selectedColor = selectedColorId ? colors.find((color) => color.id === selectedColorId) : null

  const removeFilter = (key: string) => {
    // Create a new URLSearchParams object from the current one
    const params = new URLSearchParams(searchParams.toString())
    // Remove the parameter we want to clear
    params.delete(key)

    // Create the new URL with the updated search params
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`

    // Navigate to the new URL
    router.push(newUrl)
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedSize && (
        <Badge variant="secondary" className="gap-1 pl-2">
          Size: {selectedSize.name}
          <button
            onClick={() => removeFilter("sizeId")}
            className="ml-1 rounded-full hover:bg-muted p-1"
            aria-label="Remove size filter"
          >
            <X size={12} />
            <span className="sr-only">Remove size filter</span>
          </button>
        </Badge>
      )}

      {selectedColor && (
        <Badge variant="secondary" className="gap-1 pl-2">
          Color: {selectedColor.name}
          <button
            onClick={() => removeFilter("colorId")}
            className="ml-1 rounded-full hover:bg-muted p-1"
            aria-label="Remove color filter"
          >
            <X size={12} />
            <span className="sr-only">Remove color filter</span>
          </button>
        </Badge>
      )}
    </div>
  )
}

export default ActiveFilters

