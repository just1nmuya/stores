// // "use client";

// // import Button from "@/components/ui/buttons";
// // import { cn } from "@/lib/utils";
// // import { Color, Size } from "@/types";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import qs from "query-string";

// // interface FilterProps {
// //   data: (Size | Color)[];
// //   name: string;
// //   valueKey: string;
// // }

// // const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
// //   const searchParams = useSearchParams();
// //   const router = useRouter();

// //   const selectValue = searchParams.get(valueKey);

// //   const onClick = (id: string) => {
// //     const current = qs.parse(searchParams.toString());

// //     const query = {
// //       ...current,
// //       [valueKey]: id,
// //     };

// //     if (current[valueKey] === id) {
// //       query[valueKey] = null;
// //     }

// //     const url = qs.stringifyUrl(
// //       {
// //         url: window.location.href,
// //         query,
// //       },
// //       { skipNull: true }
// //     );

// //     router.push(url);
// //   };
// //   return (
// //     <div className="mb-8">
// //       <h3 className="text-lg font-semibold">{name}</h3>
// //       <hr className="my-4" />
// //       <div className="flex flex-wrap gap-2">
// //         {data.map((filter) => (
// //           <div key={filter.id} className="flex items-center">
// //             <Button
// //               className={cn(
// //                 "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
// //                 selectValue === filter.id && "bg-black text-white"
// //               )}
// //               onClick={() => onClick(filter.id)}
// //             >
// //               {filter.name}
// //             </Button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Filter;

// "use client"

// import type React from "react"

// import { cn } from "@/lib/utils"
// import type { Color, Size } from "@/types"
// import { useRouter, useSearchParams } from "next/navigation"
// import qs from "query-string"
// import { Badge } from "@/components/ui/badge"
// import { Check } from "lucide-react"

// interface FilterProps {
//   data: (Size | Color)[]
//   name: string
//   valueKey: string
// }

// const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const selectedValue = searchParams.get(valueKey)

//   const onClick = (id: string) => {
//     const current = qs.parse(searchParams.toString())

//     const query = {
//       ...current,
//       [valueKey]: id,
//     }

//     if (current[valueKey] === id) {
//       query[valueKey] = null
//     }

//     const url = qs.stringifyUrl(
//       {
//         url: window.location.href,
//         query,
//       },
//       { skipNull: true },
//     )

//     router.push(url)
//   }

//   return (
//     <div className="space-y-3">
//       <h3 className="text-sm font-medium text-foreground">{name}</h3>
//       <div className="flex flex-wrap gap-2">
//         {data.map((filter) => (
//           <Badge
//             key={filter.id}
//             variant={selectedValue === filter.id ? "default" : "outline"}
//             className={cn(
//               "cursor-pointer px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors",
//               selectedValue === filter.id && "pl-2",
//             )}
//             onClick={() => onClick(filter.id)}
//           >
//             {selectedValue === filter.id && <Check className="mr-1 h-3 w-3" />}
//             {filter.name}
//           </Badge>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Filter

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Color, Size } from "@/types";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string;
}

/**
 * This Filter component:
 * - Renders a “Sizes” or “Colors” section as a bordered card.
 * - Shows a list of checkboxes (multi-select).
 * - Updates the URL on each check/uncheck (sizeId=small&sizeId=medium, etc.).
 * - Provides a “Clear” button in the header if any options are selected.
 */
const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get all currently selected values for this key from the URL.
  // query-string’s parse returns arrays if multiple entries exist.
  const raw = qs.parse(searchParams.toString());
  const selectedRaw = raw[valueKey];
  // Normalize to an array of strings
  let selectedValues: string[] = [];
  if (Array.isArray(selectedRaw)) {
    selectedValues = selectedRaw as string[];
  } else if (typeof selectedRaw === "string") {
    selectedValues = [selectedRaw];
  }

  // Toggle a single checkbox (add or remove from selectedValues array)
  const onToggle = (id: string) => {
    // Re-parse current query string into a JS object
    const current = qs.parse(searchParams.toString());

    // Build a new array of values for this key
    let nextValues: string[];
    if (selectedValues.includes(id)) {
      // If already selected, remove it
      nextValues = selectedValues.filter((v) => v !== id);
    } else {
      // Otherwise, add it
      nextValues = [...selectedValues, id];
    }

    // Build the next query object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextQuery: Record<string, any> = { ...current };

    if (nextValues.length > 0) {
      // query-string wants an array for multi-values
      nextQuery[valueKey] = nextValues;
    } else {
      // If no values left, remove that key entirely
      delete nextQuery[valueKey];
    }

    // Keep other keys intact; stringifyUrl will drop nulls/undefined
    const nextUrl = qs.stringifyUrl(
      {
        url: window.location.origin + window.location.pathname,
        query: nextQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(nextUrl);
  };

  // Clear all selections in this section
  const clearSection = () => {
    const current = qs.parse(searchParams.toString());
    delete current[valueKey];

    const nextUrl = qs.stringifyUrl(
      { url: window.location.origin + window.location.pathname, query: current },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(nextUrl);
  };

  // If there is no data or no items, render nothing
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-6 border border-gray-200 rounded-md bg-gray-50">
      {/* Header: Title + Clear button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <h4 className="text-sm font-medium uppercase text-gray-700 tracking-wide">{name}</h4>
        {selectedValues.length > 0 && (
          <button
            onClick={clearSection}
            className="flex items-center text-xs text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
            aria-label={`Clear all ${name.toLowerCase()} filters`}
          >
            <X size={12} className="mr-1" />
            Clear
          </button>
        )}
      </div>

      {/* Body: List of checkboxes */}
      <div className="px-4 py-3 flex flex-col space-y-2 max-h-[250px] overflow-y-auto">
        {data.map((filterItem) => {
          const isChecked = selectedValues.includes(filterItem.id);

          return (
            <label
              key={filterItem.id}
              className="relative flex items-center cursor-pointer select-none"
            >
              {/* Hidden native checkbox */}
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(filterItem.id)}
                className="sr-only"
              />

              {/* Custom checkbox box */}
              <span
                className={cn(
                  "h-5 w-5 flex-shrink-0 border-2 rounded border-gray-300 flex items-center justify-center transition-colors",
                  isChecked
                    ? "bg-black border-black"
                    : "bg-white hover:border-black"
                )}
              >
                {isChecked && <Check className="h-3 w-3 text-white" />}
              </span>

              {/* Label text */}
              <span className="ml-2 text-sm text-gray-800">{filterItem.name}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
