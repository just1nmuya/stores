"use client"

import type React from "react"

import type { Product } from "@/types"
import Currency from "./ui/currency"
import Button from "./ui/buttons"
import { ShoppingCart } from "lucide-react"
import useCart from "@/hooks/use-cart"
import { motion } from "framer-motion"
import ExpandableText from "./expandable-text"

interface InfoProps {
  data: Product
  showDescription?: boolean
  isCompact?: boolean
}

const Info: React.FC<InfoProps> = ({ data, showDescription = true, isCompact = false }) => {
  const cart = useCart()

  const onAddToCart = () => {
    cart.addItem(data)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white ${isCompact ? "p-4" : "p-8"} rounded-xl shadow-md ${!isCompact}`}
    >
      <h1 className={`${isCompact ? "text-xl" : "text-3xl"} font-bold text-gray-900 mb-2`}>{data.name}</h1>
      <div className="mt-2 flex items-end justify-between">
        <div className={`${isCompact ? "text-lg" : "text-2xl"} text-gray-900`}>
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-3" />
      <div className={`flex flex-col ${isCompact ? "gap-y-3" : "gap-y-6"}`}>
        {data?.size && (
          <div className="flex items-center gap-x-3">
            <h3 className="font-semibold text-black">Size:</h3>
            <div className="px-3 py-1 bg-gray-100 rounded-full text-gray-800">{data.size.value}</div>
          </div>
        )}
        {data?.color && (
          <div className="flex items-center gap-x-3">
            <h3 className="font-semibold text-black">Color:</h3>
            <div className="flex items-center gap-x-2">
              <div
                className="h-6 w-6 rounded-full border border-gray-600"
                style={{ backgroundColor: data.color.value }}
              />
              <span>{data.color.name}</span>
            </div>
          </div>
        )}
        {showDescription && data.description && <ExpandableText text={data.description} limit={150} />}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onAddToCart}
            className={`w-full ${isCompact ? "py-2" : "py-3"} flex items-center justify-center gap-x-2`}
          >
            Add to Cart
            <ShoppingCart size={isCompact ? 18 : 20} />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Info

