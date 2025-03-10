"use client"

import type React from "react"

import type { Color, Size } from "@/types"
import FiltersSidebar from "@/components/ui/filters-sidebar"
import ActiveFilters from "@/components/ui/active-filters"

interface ProductFiltersProps {
  sizes: Size[]
  colors: Color[]
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ sizes, colors }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 -mt-5">
        <h2 className="text-xl font-bold">All Products</h2>
        <div className="flex-shrink-0">
          <FiltersSidebar sizes={sizes} colors={colors} />
        </div>
      </div>
      <ActiveFilters sizes={sizes} colors={colors} />
    </div>
  )
}

export default ProductFilters

