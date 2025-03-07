"use client"

import type React from "react"

import Image from "next/image"
import { Expand, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { type MouseEventHandler, useRef } from "react"
import { motion, useInView } from "framer-motion"

import type { Product } from "@/types"
import IconButton from "./icon-button"
import Currency from "@/components/ui/currency"
import usePreviewModal from "@/hooks/use-preview-modal"
import useCart from "@/hooks/use-cart"

interface ProductCard {
  data: Product
  index?: number
}

const ProductCard: React.FC<ProductCard> = ({ data, index = 0 }) => {
  const cart = useCart()
  const previewModal = usePreviewModal()
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  const handleClick = () => {
    router.push(`/product/${data?.id}`)
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    previewModal.onOpen(data)
  }

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    cart.addItem(data)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth animation
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col"
    >
      {/* Image container with overlay */}
      <div className="aspect-square w-full relative overflow-hidden bg-gray-100">
        <Image
          src={data?.images?.[0]?.url || "/placeholder.svg"}
          fill
          alt={data.name || "Product image"}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 4}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons container */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-700" />}
              className="bg-white shadow-lg hover:bg-gray-50 transition-colors"
            />
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-700" />}
              className="bg-white shadow-lg hover:bg-gray-50 transition-colors"
            />
          </motion.div>
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col flex-grow p-4 space-y-2" onClick={handleClick}>
        {data.category?.name && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="text-xs uppercase tracking-wider text-gray-500 font-medium"
          >
            {data.category.name}
          </motion.span>
        )}

        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
          className="font-medium text-gray-900 group-hover:text-black transition-colors line-clamp-1"
        >
          {data.name}
        </motion.h3>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="text-lg font-semibold text-gray-900"
          >
            <Currency value={data?.price} />
          </motion.div>

          {/* {data.size?.value && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-800"
            >
              {data.size.value}
            </motion.span>
          )} */}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard

