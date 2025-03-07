/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MainNavProps {
  data: any[]
  isMobile?: boolean
}

const MainNav: React.FC<MainNavProps> = ({ data, isMobile = false }) => {
  const pathname = usePathname()

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }))

  if (isMobile) {
    return (
      <motion.div
        className="grid grid-cols-1 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {routes.map((route) => (
          <motion.div
            key={route.href}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href={route.href}
              className={cn(
                "text-base font-medium transition-colors text-white hover:text-black",
                route.active ? "text-black" : "text-gray-600",
              )}
            >
              {route.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <nav className="mx-6 flex items-center space-x-8">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className="relative group">
          <span
            className={cn(
              "text-sm font-medium transition-colors group-hover:text-white/90",
              route.active ? "text-purple-500" : "text-white",
            )}
          >
            {route.label}
          </span>
          {/* Animated underline */}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-white origin-left"
            initial={{ scaleX: route.active ? 1 : 0 }}
            animate={{ scaleX: route.active ? 1 : 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      ))}
    </nav>
  )
}

export default MainNav

