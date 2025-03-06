"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Define the Category type
interface Category {
  id: string
  name: string
  image: string
}


interface CategoryCarouselProps {
  categories: Category[]
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div className="py-24 bg-gradient-to-b from-white to-purple-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block"
            variants={titleVariants}
          >
            Explore Categories
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform translate-y-2"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.span>
          </motion.h2>
          <motion.p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto" variants={titleVariants}>
            Discover our curated collection of premium products
          </motion.p>
        </motion.div>
        {categories.length > 0 ? (
          <Carousel opts={{ align: "start", loop: true }} className="w-full -mb-10 group">
            <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={containerVariants}>
              <CarouselContent>
                {categories.map((category, index) => (
                  <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <motion.div className="p-2" variants={itemVariants} custom={index}>
                      <Link href={`/category/${category.id}`}>
                        <Card className="relative w-full h-80 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-xl border-0 overflow-hidden group">
                          <Image
                            fill
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            className="object-cover transform transition duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                          <CardContent className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0">
                            <h3 className="text-2xl font-bold text-white text-center drop-shadow-md">
                              {category.name}
                            </h3>
                            <div className="mt-3 overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-300">
                              <Button
                                variant="outline"
                                className="w-full bg-white/10 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                              >
                                Shop Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </motion.div>
            <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-2 h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
            <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-2 h-12 w-12 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No categories available</p>
        )}
      </div>
    </div>
  )
}


