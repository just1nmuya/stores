// "use client";

// import Button from "@/components/ui/buttons";
// import { cn } from "@/lib/utils";
// import { Color, Size } from "@/types";
// import { useRouter, useSearchParams } from "next/navigation";
// import qs from "query-string";

// interface FilterProps {
//   data: (Size | Color)[];
//   name: string;
//   valueKey: string;
// }

// const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const selectValue = searchParams.get(valueKey);

//   const onClick = (id: string) => {
//     const current = qs.parse(searchParams.toString());

//     const query = {
//       ...current,
//       [valueKey]: id,
//     };

//     if (current[valueKey] === id) {
//       query[valueKey] = null;
//     }

//     const url = qs.stringifyUrl(
//       {
//         url: window.location.href,
//         query,
//       },
//       { skipNull: true }
//     );

//     router.push(url);
//   };
//   return (
//     <div className="mb-8">
//       <h3 className="text-lg font-semibold">{name}</h3>
//       <hr className="my-4" />
//       <div className="flex flex-wrap gap-2">
//         {data.map((filter) => (
//           <div key={filter.id} className="flex items-center">
//             <Button
//               className={cn(
//                 "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
//                 selectValue === filter.id && "bg-black text-white"
//               )}
//               onClick={() => onClick(filter.id)}
//             >
//               {filter.name}
//             </Button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Filter;

"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import type { Color, Size } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface FilterProps {
  data: (Size | Color)[]
  name: string
  valueKey: string
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedValue = searchParams.get(valueKey)

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString())

    const query = {
      ...current,
      [valueKey]: id,
    }

    if (current[valueKey] === id) {
      query[valueKey] = null
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    )

    router.push(url)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{name}</h3>
      <div className="flex flex-wrap gap-2">
        {data.map((filter) => (
          <Badge
            key={filter.id}
            variant={selectedValue === filter.id ? "default" : "outline"}
            className={cn(
              "cursor-pointer px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors",
              selectedValue === filter.id && "pl-2",
            )}
            onClick={() => onClick(filter.id)}
          >
            {selectedValue === filter.id && <Check className="mr-1 h-3 w-3" />}
            {filter.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default Filter

