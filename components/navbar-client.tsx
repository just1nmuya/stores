"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import MainNav from "@/components/main-nav"
import NavbarActions from "./navbar-actions"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavbarClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[]
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-black/95 shadow-lg backdrop-blur-sm" : "bg-black", "h-16 md:h-16"
      )}
    >
      <div className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Store Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-start md:justify-center md:absolute md:left-0 w-full md:w-auto"
        >
          <Link href="/" className="flex gap-x-2 items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-bold text-xl sm:ml-3 lg:ml-5 text-white lg:mb-4"
            >
              STORE
            </motion.div>
          </Link>
        </motion.div>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex flex-grow justify-center lg:mb-4">
          <MainNav data={categories} />
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full relative z-50"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            className="block w-6 h-0.5 bg-white mb-1.5"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
              x: isMobileMenuOpen ? -20 : 0,
            }}
            className="block w-6 h-0.5 bg-white mb-1.5"
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            className="block w-6 h-0.5 bg-white"
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Cart (Navbar Actions) - Mobile */}
        <div className="md:hidden absolute right-16">
          <NavbarActions />
        </div>

        {/* Navbar Actions - Desktop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center lg:mb-4"
        >
          <NavbarActions />
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="md:hidden fixed top-16 right-0 w-4/5 max-w-sm h-[calc(100vh-4rem)] bg-white shadow-2xl z-50 overflow-y-auto rounded-l-xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="px-6 py-8"
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="h-0.5 w-12 bg-black mb-6"></div>
                <MainNav data={categories} isMobile={true} />
              </div>

              {/* Additional mobile menu items can go here */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {/* {["About", "Contact", "FAQ", "Shipping"].map((item) => (
                    <motion.div
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <Link href="#" className="block py-2 text-gray-600 hover:text-black transition-colors">
                        {item}
                      </Link>
                    </motion.div>
                  ))} */}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default NavbarClient

