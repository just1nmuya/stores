"use client"

import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import useCart from "@/hooks/use-cart"
import { Button } from "./ui/button"

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const cart = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => router.push("/cart")}
          className="flex items-center rounded-full bg-black px-4 py-2 border border-white/20"
        >
          <ShoppingBag size={20} color="white" />
          <AnimatePresence mode="wait">
            {cart.items.length > 0 && (
              <motion.span
                key="cart-count"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="ml-2 text-sm font-medium text-white"
              >
                {cart.items.length}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  )
}

export default NavbarActions

