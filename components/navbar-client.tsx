

// "use client";

// import type React from "react";
// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { ShoppingBag, X, Menu } from "lucide-react";
// import useCart from "@/hooks/use-cart";
// // import MainNav from "./main-nav"

// interface NavbarClientProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   categories: any[];
// }

// const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const pathname = usePathname();
//   const cart = useCart();
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Hide navbar on scroll down, show on scroll up
//   useEffect(() => {
//     let ticking = false;
//     const handleScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const currentScrollY = window.scrollY;
//           setScrolled(currentScrollY > 20);
//           if (currentScrollY > lastScrollY && currentScrollY > 60) {
//             setShowNavbar(false); // Hide on scroll down
//           } else {
//             setShowNavbar(true); // Show on scroll up
//           }
//           setLastScrollY(currentScrollY);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//     // eslint-disable-next-line
//   }, [lastScrollY]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{
//         y: showNavbar ? 0 : -100,
//         opacity: showNavbar ? 1 : 0,
//         transition: { type: "spring", stiffness: 300, damping: 30 }
//       }}
//       className={cn(
//         "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8 h-16",
//         scrolled && "bg-white shadow-md"
//       )}
//       style={{ pointerEvents: showNavbar ? "auto" : "none" }}
//     >
//       <div className="max-w-[1400px] mx-auto relative flex items-center justify-between h-full">
//         {/* Left Side Navigation */}
//         <div className="hidden md:flex items-center space-x-10">
//           <Link href="/shop" className="nav-link text-black hover:opacity-70">
//             SHOP
//           </Link>
//           <div className="relative" ref={dropdownRef}>
//             <button
//               className="nav-link text-black hover:opacity-70 flex items-center space-x-2"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               <span>Categories</span>
//               <svg
//                 className={`w-4 h-4 transform transition-transform ${
//                   isOpen ? "rotate-180" : ""
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {isOpen && (
//               <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-md z-50">
//                 {categories.map((category) => (
//                   <Link
//                     key={category.id}
//                     href={`/category/${category.id}`}
//                     className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 rounded-md"
//                   >
//                     <span className="uppercase text-xs font-medium">
//                       {category.name}
//                     </span>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//           <Link href="/info" className="nav-link text-black hover:opacity-70">
//             INFO
//           </Link>
//         </div>

//         {/* Mobile Menu Button */}
//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="md:hidden flex items-center justify-center w-10 h-10 relative z-50 text-black"
//           aria-label="Toggle menu"
//         >
//           {isMobileMenuOpen ? (
//             <X className="w-5 h-5" />
//           ) : (
//             <Menu className="w-5 h-5" />
//           )}
//         </motion.button>

//         {/* Logo */}
//         <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
//           <svg
//             className="akimbo-logo"
//             viewBox="0 0 100 40"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M20 30C25 15 35 10 45 15C55 20 65 15 70 5"
//               stroke="black"
//               strokeWidth="2"
//             />
//           </svg>
//         </Link>

//         {/* Right Side Icons */}
//         <div className="flex items-center space-x-6">
//           {/* <button
//             className="hidden md:flex text-black"
//             onClick={async () => {
//               try {
//                 const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
//                 if (!res.ok) throw new Error("Unable to load featured products. Please try again later.");
//                 const featuredProducts = await res.json();
//                 console.log("Featured Products:", featuredProducts);
//               } catch (error) {
//                 console.error(error);
//               }
//             }}
//             aria-label="Search featured products"
//           >
//             <Search className="w-5 h-5" />
//           </button> */}
//           <Link href="/cart" className="relative text-black">
//             <ShoppingBag className="w-5 h-5" />
//             {cart.items.length > 0 && (
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
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
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
//               onClick={() => setIsMobileMenuOpen(false)}
//             />
//             <motion.div
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 250 }}
//               className="fixed top-0 left-0 w-4/5 max-w-sm h-full bg-black text-white z-50 p-6 pt-20 shadow-2xl rounded-r-lg"
//             >
//               <div className="space-y-8">
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   <Link
//                     href="/shop"
//                     className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
//                     onClick={() => setIsMobileMenuOpen(false)}
//                   >
//                     Shop
//                   </Link>
//                 </motion.div>

//                 <div className="space-y-4">
//                   <div className="text-lg font-semibold text-gray-400 uppercase">
//                     Categories
//                   </div>
//                   <div className="space-y-2">
//                     {categories.map((category) => (
//                       <Link
//                         key={category.id}
//                         href={`/category/${category.id}`}
//                         className="block uppercase text-base tracking-wide py-1 hover:text-gray-300 transition-colors"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         {category.name}
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <Link
//                     href="/info"
//                     className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
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
//   );
// };

// export default NavbarClient;

"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, X, Menu } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface NavbarClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
}

const NavbarClient: React.FC<NavbarClientProps> = ({ categories }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Only show navbar at top of the page
  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY < 20;
      setScrolled(!atTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{
        y: scrolled ? -100 : 0,
        opacity: scrolled ? 0 : 1,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-8 h-16",
        !scrolled && "bg-transparent",
      )}
      style={{ pointerEvents: scrolled ? "none" : "auto" }}
    >
      <div className="max-w-[1400px] mx-auto relative flex items-center justify-between h-full">
        {/* Left Side Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/shop" className="nav-link text-black hover:opacity-70">
            SHOP
          </Link>
          <div className="relative" ref={dropdownRef}>
            <button
              className="nav-link text-black hover:opacity-70 flex items-center space-x-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Categories</span>
              <svg
                className={`w-4 h-4 transform transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
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
            {isOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white text-gray-800 rounded-lg shadow-md z-50">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.id}`}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 transition-colors duration-200 rounded-md"
                  >
                    <span className="uppercase text-xs font-medium">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
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

      {/* Mobile Menu */}
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
                <Link
                  href="/shop"
                  className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop
                </Link>

                <div className="space-y-4">
                  <div className="text-lg font-semibold text-gray-400 uppercase">
                    Categories
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.id}`}
                        className="block uppercase text-base tracking-wide py-1 hover:text-gray-300 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/info"
                  className="block uppercase text-xl font-semibold tracking-wide py-2 hover:text-gray-300 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Info
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavbarClient;
