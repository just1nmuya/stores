// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { forwardRef } from "react";

// import { cn } from "@/lib/utils";

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, children, disabled, type = "button", ...props }, ref) => {
//     return (
//       <button
//         className={cn(
//           `
//           w-auto
//           rounded-full
//           bg-black
//           border-transparent
//           px-5
//           py-3
//           disabled:cursor-not-allowed
//           disabled:opacity-50
//           text-white
//           font-semibold
//           hover:opacity-75
//           transition
//             `,
//           className
//         )}
//         disabled={disabled}
//         ref={ref}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = "Button";

// export default Button;

import type React from "react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        className={cn(
          `
          w-auto
          uppercase
          tracking-wider
          text-xs
          font-normal
          bg-black
          text-white
          border-transparent
          px-4
          py-2
          disabled:cursor-not-allowed
          disabled:opacity-50
          hover:opacity-90
          transition-all
          duration-200
          `,
          className,
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export default Button

