// "use client"

// import type React from "react"
// import type { Product } from "@/types"
// import Currency from "./ui/currency"
// import Button from "./ui/buttons"
// // import { Plus } from "lucide-react"
// import useCart from "@/hooks/use-cart"
// import { motion } from "framer-motion"
// import { useState } from "react"

// interface InfoProps {
//   data: Product
// }

// const Info: React.FC<InfoProps> = ({ data }) => {
//   const cart = useCart()
//   const [selectedSize, setSelectedSize] = useState(data.size?.id || "")

//   const onAddToCart = () => {
//     cart.addItem(data)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <div className="space-y-2">
//         <h1 className="text-xs uppercase tracking-wider font-normal">{data.name}</h1>
//         <div className="text-xs ">
//           <Currency value={data.price} />
//         </div>
//       </div>

//       <div className="space-y-6">
//         {data?.size && (
//           <div>
//             <h3 className="text-xs uppercase tracking-wider font-normal mb-4">Size</h3>
//             <div className="grid grid-cols-4 gap-2">
//               {[data.size].map((size) => (
//                 <button
//                   key={size.id}
//                   onClick={() => setSelectedSize(size.id)}
//                   className={`
//                     border py-2 text-xs uppercase tracking-wider
//                     ${selectedSize === size.id ? "border-white bg-black text-white" : "border-black hover:border-white"}
//                   `}
//                 >
//                   {size.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {data?.color && (
//           <div>
//             <h3 className="text-xs uppercase tracking-wider font-normal mb-4">Color</h3>
//             <div className="flex items-center gap-2">
//               <div className="h-5 w-5 rounded-full border border-black" style={{ backgroundColor: data.color.value }} />
//               <span className="text-xs uppercase">{data.color.name}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {data.description && (
//         <div className="space-y-2">
//           <h3 className="text-xs uppercase tracking-wider font-normal">Details</h3>
//           <p className="text-xs leading-relaxed text-muted-foreground">{data.description}</p>
//         </div>
//       )}

//       <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//         <Button onClick={onAddToCart} className="w-full flex items-center justify-center">

//           Add to Cart
//         </Button>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Info

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type React from "react"
import type { Product } from "@/types"
import Currency from "./ui/currency"
import Button from "./ui/buttons"
import useCart from "@/hooks/use-cart"

interface InfoProps {
  data: Product
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart()
  const [selectedSize, setSelectedSize] = useState(data.size?.id || "")

  const onAddToCart = () => {
    cart.addItem(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-xs uppercase tracking-wider font-normal">{data.name}</h1>
        <div className="text-xs">
          <Currency value={data.price} />
        </div>
      </div>

      <div className="space-y-6">
        {data?.size && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-normal mb-4">Size</h3>
            <div className="grid grid-cols-4 gap-2">
              {[data.size].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size.id)}
                  className={`border py-2 text-xs uppercase tracking-wider transition-colors ${
                    selectedSize === size.id
                      ? "border-white bg-black text-white"
                      : "border-black hover:border-white"
                  }`}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {data?.color && (
          <div>
            <h3 className="text-xs uppercase tracking-wider font-normal mb-4">Color</h3>
            <div className="flex items-center gap-2">
              <div
                className="h-5 w-5 rounded-full border border-black"
                style={{ backgroundColor: data.color.value }}
              />
              <span className="text-xs uppercase">{data.color.name}</span>
            </div>
          </div>
        )}
      </div>

      {data.description && (
        <div className="space-y-2">
          <h3 className="text-xs uppercase tracking-wider font-normal">Details</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">{data.description}</p>
        </div>
      )}

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button onClick={onAddToCart} className="w-full flex items-center justify-center">
          Add to Cart
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default Info
