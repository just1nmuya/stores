// "use client"

// import type React from "react"

// import type { Color, Size } from "@/types"
// import { Button } from "@/components/ui/button"
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetFooter,
// } from "@/components/ui/sheet"
// import { SlidersHorizontal } from "lucide-react"
// import { useSearchParams } from "next/navigation"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import Filter from "@/app/(routes)/category/[categoryId]/components/filter"

// interface FiltersSidebarProps {
//   sizes: Size[]
//   colors: Color[]
// }

// const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ sizes, colors }) => {
//   const [open, setOpen] = useState(false)
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const hasActiveFilters = searchParams.has("sizeId") || searchParams.has("colorId")

//   const clearFilters = () => {
//     router.push(window.location.pathname)
//     setOpen(false)
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button
//           variant={hasActiveFilters ? "default" : "outline"}
//           size="sm"
//           className="flex items-center gap-x-2 whitespace-nowrap"
//         >
//           <SlidersHorizontal size={16} />
//           Filters
//           {hasActiveFilters && (
//             <span className="ml-1 rounded-full bg-primary-foreground text-primary w-5 h-5 text-xs flex items-center justify-center">
//               {(searchParams.has("sizeId") ? 1 : 0) + (searchParams.has("colorId") ? 1 : 0)}
//             </span>
//           )}
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 overflow-y-auto">
//         <SheetHeader className="mb-5">
//           <SheetTitle>Filters</SheetTitle>
//           <SheetDescription>Refine your product selection</SheetDescription>
//         </SheetHeader>
//         <div className="space-y-6">
//           <Filter valueKey="sizeId" name="Sizes" data={sizes} />
//           <Filter valueKey="colorId" name="Colors" data={colors} />
//         </div>
//         <SheetFooter className="mt-8">
//           <Button variant="outline" onClick={clearFilters} className="w-full">
//             Clear Filters
//           </Button>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   )
// }

// export default FiltersSidebar

"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import Filter from "@/app/(routes)/category/[categoryId]/components/filter";
import type { Color, Size } from "@/types";

interface FiltersSidebarProps {
  sizes: Size[];
  colors: Color[];
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedSizeId = searchParams.get("sizeId");
  const selectedColorId = searchParams.get("colorId");
  const hasActiveFilters = Boolean(selectedSizeId || selectedColorId);

  // Remove a specific filter and keep others intact

  // Clear all filters at once
  const clearFilters = () => {
    router.push(window.location.pathname);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant={hasActiveFilters ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-x-2 whitespace-nowrap"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="ml-1 inline-flex items-center justify-center rounded-full bg-primary-foreground text-primary w-5 h-5 text-xs font-medium">
              {(selectedSizeId ? 1 : 0) + (selectedColorId ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="right" className="w-full sm:w-[350px] md:w-[400px] p-0">
        {/* Header with Close Button */}
        <SheetHeader className=" px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              Refine your product selection
            </SheetDescription>
          </div>
          
        </SheetHeader>

        {/* Filters Body */}
        <div className="px-6 py-4 space-y-6 overflow-y-auto max-h-[calc(100vh-240px)] bg-white">
          {/* Sizes Section */}
          <div className="space-y-2">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
          </div>

          <div className="border-t border-gray-200" />

          {/* Colors Section */}
          <div className="space-y-2">
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
        </div>

        {/* Footer with Actions */}
        <SheetFooter className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col gap-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="w-full"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="default"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            {hasActiveFilters ? "Apply Filters" : "Close"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersSidebar;
