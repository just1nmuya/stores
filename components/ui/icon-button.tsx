// "use client"

// import type React from "react"

// import { cn } from "@/lib/utils"
// import type { MouseEventHandler } from "react"

// interface IconButtonProps {
//   onClick?: MouseEventHandler<HTMLButtonElement> | undefined
//   icon: React.ReactElement
//   className?: string
// }

// const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "rounded-full flex items-center justify-center bg-white border border-gray-100 shadow p-2 hover:scale-110 hover:shadow-md transition",
//         className,
//       )}
//     >
//       {icon}
//     </button>
//   )
// }

// export default IconButton

"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import type { MouseEventHandler } from "react"

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  icon: React.ReactElement
  className?: string
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border border-black p-1.5 hover:scale-110 hover:shadow-sm transition",
        className,
      )}
    >
      {icon}
    </button>
  )
}

export default IconButton

