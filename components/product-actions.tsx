"use client"

import { Plus } from "lucide-react"
import useCart from "@/hooks/use-cart"

interface ProductActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any
  isCompact?: boolean
}

const ProductActions = ({ product, isCompact = false }: ProductActionsProps) => {
  const cart = useCart()

  return (
    <button
      onClick={() => cart.addItem(product)}
      className={`w-full bg-black text-white py-2 text-xs uppercase tracking-wider flex items-center justify-center ${
        isCompact ? "absolute bottom-2 right-2 p-1" : ""
      }`}
    >
      <Plus className={`h-${isCompact ? 3 : 4} w-${isCompact ? 3 : 4}`} />
    </button>
  )
}

export default ProductActions
