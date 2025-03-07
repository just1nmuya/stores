"use client"

import type React from "react"

import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Image as ImageType } from "@/types"
import { Tab } from "@headlessui/react"
import { motion } from "framer-motion"
import { useState } from "react"

interface GalleryTabProps {
  image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white outline-none">
      {({ selected }) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          className="relative w-full h-full"
        >
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden rounded-md">
            <motion.div
              animate={{
                scale: isHovering ? 1.1 : 1,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Image
                fill
                src={image.url || "/placeholder.svg"}
                alt=""
                sizes="(max-width: 768px) 100vw, 33vw"
                className={cn(
                  "object-cover object-center transition-all duration-300",
                  isHovering ? "brightness-110" : "brightness-100",
                )}
                priority={selected}
              />
            </motion.div>
          </span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: selected || isHovering ? 1 : 0,
              boxShadow: selected ? "0 0 0 2px rgba(0, 0, 0, 0.9), 0 0 0 4px rgba(255, 255, 255, 0.3)" : "none",
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 rounded-md",
              selected
                ? "ring-2 ring-black ring-offset-2 shadow-md"
                : isHovering
                  ? "ring-1 ring-black/50 ring-offset-1"
                  : "ring-transparent",
            )}
          />

          {/* Loading indicator that fades out */}
          <motion.div
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 bg-gray-100 rounded-md flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.7 }}
              animate={{ scale: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"
            />
          </motion.div>
        </motion.div>
      )}
    </Tab>
  )
}

export default GalleryTab

