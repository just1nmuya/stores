"use client"

import type React from "react"

import type { Color, Size } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Filter from "@/app/(routes)/category/[categoryId]/components/filter"

interface FiltersSidebarProps {
  sizes: Size[]
  colors: Color[]
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const hasActiveFilters = searchParams.has("sizeId") || searchParams.has("colorId")

  const clearFilters = () => {
    router.push(window.location.pathname)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-x-2 whitespace-nowrap"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 rounded-full bg-primary-foreground text-primary w-5 h-5 text-xs flex items-center justify-center">
              {(searchParams.has("sizeId") ? 1 : 0) + (searchParams.has("colorId") ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your product selection</SheetDescription>
        </SheetHeader>
        <div className="space-y-6">
          <Filter valueKey="sizeId" name="Sizes" data={sizes} />
          <Filter valueKey="colorId" name="Colors" data={colors} />
        </div>
        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default FiltersSidebar

