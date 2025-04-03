// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import MainNav from "@/components/main-nav"
// import NavbarActions from "./navbar-actions"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"

// interface NavbarClientProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   categories: any[]
// }

// const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const pathname = usePathname()

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [pathname])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true)
//       } else {
//         setScrolled(false)
//       }
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = ""
//     }
//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isMobileMenuOpen])

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300",
//         scrolled ? "bg-black/95 shadow-lg backdrop-blur-sm" : "bg-black", "h-16 md:h-16"
//       )}
//     >
//       <div className="relative px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
//         {/* Store Logo */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-start md:justify-center md:absolute md:left-0 w-full md:w-auto"
//         >
//           <Link href="/" className="flex gap-x-2 items-center">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="font-bold text-xl sm:ml-3 lg:ml-5 text-white lg:mb-4"
//             >
//               STORE
//             </motion.div>
//           </Link>
//         </motion.div>

//         {/* Main Navigation - Desktop */}
//         <div className="hidden md:flex flex-grow justify-center lg:mb-4">
//           <MainNav data={categories} />
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full relative z-50"
//           aria-label="Toggle menu"
//         >
//           <motion.span
//             animate={{
//               rotate: isMobileMenuOpen ? 45 : 0,
//               y: isMobileMenuOpen ? 8 : 0,
//             }}
//             className="block w-6 h-0.5 bg-white mb-1.5"
//             transition={{ duration: 0.3 }}
//           />
//           <motion.span
//             animate={{
//               opacity: isMobileMenuOpen ? 0 : 1,
//               x: isMobileMenuOpen ? -20 : 0,
//             }}
//             className="block w-6 h-0.5 bg-white mb-1.5"
//             transition={{ duration: 0.3 }}
//           />
//           <motion.span
//             animate={{
//               rotate: isMobileMenuOpen ? -45 : 0,
//               y: isMobileMenuOpen ? -8 : 0,
//             }}
//             className="block w-6 h-0.5 bg-white"
//             transition={{ duration: 0.3 }}
//           />
//         </motion.button>

//         {/* Cart (Navbar Actions) - Mobile */}
//         <div className="md:hidden absolute right-16">
//           <NavbarActions />
//         </div>

//         {/* Navbar Actions - Desktop */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="hidden md:flex items-center lg:mb-4"
//         >
//           <NavbarActions />
//         </motion.div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 30, stiffness: 300 }}
//             className="md:hidden fixed top-16 right-0 w-4/5 max-w-sm h-[calc(100vh-4rem)] bg-white shadow-2xl z-50 overflow-y-auto rounded-l-xl"
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="px-6 py-8"
//             >
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
//                 <div className="h-0.5 w-12 bg-black mb-6"></div>
//                 <MainNav data={categories} isMobile={true} />
//               </div>

//               {/* Additional mobile menu items can go here */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <motion.div
//                   className="space-y-4"
//                   initial="hidden"
//                   animate="visible"
//                   variants={{
//                     hidden: { opacity: 0 },
//                     visible: {
//                       opacity: 1,
//                       transition: {
//                         staggerChildren: 0.1,
//                       },
//                     },
//                   }}
//                 >
//                   {/* {["About", "Contact", "FAQ", "Shipping"].map((item) => (
//                     <motion.div
//                       key={item}
//                       variants={{
//                         hidden: { opacity: 0, y: 20 },
//                         visible: { opacity: 1, y: 0 },
//                       }}
//                     >
//                       <Link href="#" className="block py-2 text-gray-600 hover:text-black transition-colors">
//                         {item}
//                       </Link>
//                     </motion.div>
//                   ))} */}
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }

// export default NavbarClient

// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { ShoppingBag, X, Menu } from "lucide-react"
// import useCart from "@/hooks/use-cart"

// interface NavbarClientProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   categories: any[]
// }

// const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const pathname = usePathname()
//   const cart = useCart()

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [pathname])

//   // Handle scroll effect
//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = ""
//     }
//     return () => {
//       document.body.style.overflow = ""
//     }
//   }, [isMobileMenuOpen])

//   // Filter categories to only show main ones
//   const mainCategories = categories.slice(0, 3)

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className={cn(
//         "relative -mb-20 top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8",
//         "h-16 md:h-20",
//       )}
//     >
//       <div className="max-w-[1400px] mx-auto relative flex items-center justify-between h-full">
//         {/* Left Side Navigation */}
//         <div className="hidden md:flex items-center space-x-8">
//           <Link href="/shop" className="nav-link text-white hover:opacity-70">
//             SHOP
//           </Link>
//           {mainCategories.map((category) => (
//             <Link key={category.id} href={`/category/${category.id}`} className="nav-link text-white hover:opacity-70">
//               {category.name.toUpperCase()}
//             </Link>
//           ))}
//           <Link href="/info" className="nav-link text-white hover:opacity-70">
//             INFO
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="md:hidden flex items-center justify-center w-10 h-10 relative z-50 text-white"
//           aria-label="Toggle menu"
//         >
//           {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//         </motion.button>

//         {/* Logo */}
//         <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
//           <svg className="akimbo-logo" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M20 30C25 15 35 10 45 15C55 20 65 15 70 5" stroke="white" strokeWidth="2" />
//           </svg>
//         </Link>

//         {/* Right Side Icons */}
//         <div className="flex items-center space-x-6">
//           {/* <button className="hidden md:flex text-white">
//             <Search className="w-5 h-5" />
//           </button> */}
//           <Link href="/cart" className="relative text-white">
//             <ShoppingBag className="w-5 h-5" />
//             {cart.items.length > 0 && (
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full">
//                 {cart.items.length}
//               </span>
//             )}
//           </Link>
//         </div>
//       </div>

//       {/* Mobile Menu - Simplified */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//               className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 30, stiffness: 300 }}
//               className="fixed top-0 left-0 w-full h-full bg-black z-50 p-6 pt-24"
//             >
//               <div className="space-y-8">
//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//                   <Link
//                     href="/shop"
//                     className="block text-xl uppercase tracking-wider py-2 text-white"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Shop
//                   </Link>
//                 </motion.div>

//                 {mainCategories.map((category, index) => (
//                   <motion.div
//                     key={category.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 * (index + 1) }}
//                   >
//                     <Link
//                       href={`/category/${category.id}`}
//                       className="block text-xl uppercase tracking-wider py-2 text-white"
//                       onClick={() => setIsMobileMenuOpen(false)}
//                     >
//                       {category.name}
//                     </Link>
//                   </motion.div>
//                 ))}

//                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
//                   <Link
//                     href="/info"
//                     className="block text-xl uppercase tracking-wider py-2 text-white"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Info
//                   </Link>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   )
// }

// export default NavbarClient

"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, X, Menu } from "lucide-react";
import useCart from "@/hooks/use-cart";
// import MainNav from "./main-nav"

interface NavbarClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const cart = useCart();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Filter categories to only show main ones (removed unused variable)

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8 h-16",
        scrolled && "bg-white shadow-md"
      )}
    >
      <div className="max-w-[1400px] mx-auto relative flex items-center justify-between h-full">
        {/* Left Side Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/shop" className="nav-link text-black hover:opacity-70">
            SHOP
          </Link>
          <div className="relative group">
            <button className="nav-link text-black hover:opacity-70 flex items-center space-x-2">
              <span>Categories</span>
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition-transform"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 rounded-md"
                >
                  <span className="text-sm font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/info" className="nav-link text-black hover:opacity-70">
            INFO
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 relative z-50 text-black"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </motion.button>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <svg
            className="akimbo-logo"
            viewBox="0 0 100 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 30C25 15 35 10 45 15C55 20 65 15 70 5"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </Link>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-6">
          {/* <button className="hidden md:flex text-white">
            <Search className="w-5 h-5" />
          </button> */}
          <Link href="/cart" className="relative text-black">
            <ShoppingBag className="w-5 h-5" />
            {cart.items.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                {cart.items.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu - Simplified */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-black text-white z-50 p-6 pt-20 shadow-2xl rounded-r-lg"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/shop"
                    className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                </motion.div>

                <div className="space-y-4">
                  <div className="text-lg font-semibold text-gray-400 uppercase">
                    Categories
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="block text-base tracking-wide py-1 hover:text-gray-300 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/info"
                    className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Info
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavbarClient;
