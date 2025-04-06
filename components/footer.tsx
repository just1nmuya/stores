// import Link from "next/link"

// const Footer = () => {
//   return (
//     <footer className="bg-black py-6 text-white">
//       <div className="max-w-[1400px] mx-auto px-4 md:px-8">
//         <div className="flex flex-col md:flex-row justify-between items-center">
//           <div className="mb-4 md:mb-0">
//             <Link href="/" className="text-xs uppercase tracking-wider font-normal">
//               Stores
//             </Link>
//           </div>
          
//           <div className="flex space-x-8">
//             <Link href="/info" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
//               Info
//             </Link>
//             <Link href="https://instagram.com" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
//               Instagram
//             </Link>
//             <Link href="/contact" className="text-xs uppercase tracking-wider hover:opacity-70 transition-opacity">
//               Contact
//             </Link>
//           </div>
          
//           <div className="mt-4 md:mt-0">
//             <p className="text-xs text-gray-400">
//               © {new Date().getFullYear()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <>
      {/* Announcement Bar - Similar to childrenofkhan.com */}
      {/* <div className="w-full bg-black text-white text-center py-2 text-sm">
        Spend $100, Get Free Shipping - Limited Time only
      </div> */}

      <footer className="bg-black text-white py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand and Newsletter - Takes more space */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
              <Link href="/" className="text-xl font-medium mb-2 inline-block uppercase tracking-wider">
                STORES
              </Link>
              <p className="text-xs uppercase text-white mb-4 max-w-xs mx-auto md:mx-0">
                Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.
              </p>
              <div className="flex gap-2 mb-6 max-w-xs mx-auto md:mx-0">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="h-7 border-gray-200 text-black focus-visible:ring-black rounded-none"
                />
                <Button className="bg-white uppercase hover:bg-black hover:text-white text-black rounded-none h-7 px-3">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Information */}
            <div className="hidden md:block md:col-span-2">
              <h3 className="font-medium mb-4 uppercase text-sm tracking-wider">Information</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/info" className="text-xs uppercase text-white hover:text-purple-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-xs uppercase text-white hover:text-purple-500 transition-colors">
                    Stores
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-xs uppercase text-white hover:text-purple-500 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-xs uppercase text-white hover:text-purple-500 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="hidden md:block md:col-span-3">
              <h3 className="font-medium mb-4 uppercase text-sm tracking-wider">Customer Care</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/contact"
                    className="text-xs uppercase text-white hover:text-purple-500 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="text-xs uppercase text-white hover:text-purple-500 transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-xs uppercase text-white hover:text-purple-500 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="md:col-span-2 flex items-center justify-center -mt-5">
              <div className="flex space-x-6">
                <Link
                  href="https://instagram.com"
                  className="text-white hover:text-purple-500 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </Link>
                <Link
                  href="https://facebook.com"
                  className="text-white hover:text-purple-500 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-white hover:text-purple-500 transition-all"
                  aria-label="X (Twitter)"
                >
                  <Twitter size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright - Centered on all screen sizes */}
          <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6">
            <div className="flex justify-center">
              <p className="text-xs text-white uppercase">© {new Date().getFullYear()} Stores. All rights reserved.</p>
            </div>
          </div>

        
        </div>
      </footer>
    </>
  )
}

export default Footer

