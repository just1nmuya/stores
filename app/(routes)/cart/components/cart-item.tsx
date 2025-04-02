// "use client"

// import type React from "react"

// import Image from "next/image"
// import { X } from "lucide-react"
// import { motion, AnimatePresence } from "framer-motion"

// import IconButton from "@/components/ui/icon-button"
// import Currency from "@/components/ui/currency"
// import useCart from "@/hooks/use-cart"
// import type { Product } from "@/types"

// interface CartItemProps {
//   data: Product
// }

// const CartItem: React.FC<CartItemProps> = ({ data }) => {
//   const cart = useCart()

//   const onRemove = () => {
//     cart.removeItem(data.id)
//   }

//   const itemVariants = {
//     hidden: {
//       opacity: 0,
//       x: -20,
//       height: 0,
//       marginBottom: 0,
//       marginTop: 0,
//       paddingBottom: 0,
//       paddingTop: 0,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       height: "auto",
//       marginBottom: "auto",
//       marginTop: "auto",
//       paddingBottom: "auto",
//       paddingTop: "auto",
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//         duration: 0.3,
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: -20,
//       height: 0,
//       marginBottom: 0,
//       marginTop: 0,
//       paddingBottom: 0,
//       paddingTop: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut",
//       },
//     },
//   }

//   const imageVariants = {
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.3 },
//     },
//   }

//   const buttonVariants = {
//     hover: {
//       scale: 1.1,
//       backgroundColor: "rgba(255, 0, 0, 0.1)",
//       transition: { duration: 0.2 },
//     },
//     tap: {
//       scale: 0.95,
//     },
//   }

//   const textVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: 0.2,
//         duration: 0.3,
//       },
//     },
//   }

//   return (
//     <AnimatePresence mode="wait">
//       <motion.li
//         className="flex py-6 border-b"
//         variants={itemVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         layout
//       >
//         <motion.div
//           className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48 mt-5"
//           whileHover="hover"
//           variants={imageVariants}
//         >
//           <Image fill src={data.images[0].url || "/placeholder.svg"} alt="" className="object-cover object-center" />
//         </motion.div>
//         <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6 ">
//           <div className="absolute z-10 right-0 top-0">
//             <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap" className="mt-4">
//               <IconButton onClick={onRemove} icon={<X size={15} />} />
//             </motion.div>
//           </div>
//           <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0 mt-5">
//             <div className="flex justify-between">
//               <motion.p
//                 className="text-lg font-semibold text-black"
//                 variants={textVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 {data.name}
//               </motion.p>
//             </div>
//             <motion.div className="mt-1 flex text-sm" variants={textVariants} initial="hidden" animate="visible">
//               <p className="text-gray-500"> {data.color.name} </p>
//               <p className="ml-2 mr-2">|</p>
//               <p className="text-gray-500 border-gray-200">{data.size.name}</p>
//             </motion.div>
//             <motion.div variants={textVariants} initial="hidden" animate="visible">
//               <Currency value={data.price} />
//             </motion.div>
//           </div>
//         </div>
//       </motion.li>
//     </AnimatePresence>
//   )
// }

// export default CartItem

"use client"

import type React from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import IconButton from "@/components/ui/icon-button"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import type { Product } from "@/types"

interface CartItemProps {
  data: Product
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart()

  const onRemove = () => {
    cart.removeItem(data.id)
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      height: 0,
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.li
        className="flex border-b border-border pb-6"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        <div className="relative h-24 w-24 overflow-hidden bg-transparent">
          <Image fill src={data.images[0].url || "/placeholder.svg"} alt="" className="object-cover object-center" />
        </div>

        <div className="relative ml-4 flex flex-1 flex-col justify-between ">
          <div className="absolute z-10 right-0 top-0 h-9 w-9 ">
            <IconButton onClick={onRemove} icon={<X size={15} />} />
          </div>

          <div className="pr-10">
            <h3 className="text-xs uppercase tracking-wider font-normal">{data.name}</h3>

            <div className="mt-1 flex text-xs text-muted-foreground">
              {data.color && <p>{data.color.name}</p>}
              {data.color && data.size && <span className="mx-2">|</span>}
              {data.size && <p>{data.size.name}</p>}
            </div>

            <div className="mt-2">
              <Currency value={data.price} />
            </div>
          </div>
        </div>
      </motion.li>
    </AnimatePresence>
  )
}

export default CartItem

