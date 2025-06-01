

// "use client"

// import type React from "react"
// import Image from "next/image"
// import { cn } from "@/lib/utils"
// import type { Image as ImageType } from "@/types"
// import { Tab } from "@headlessui/react"
// import { motion } from "framer-motion"
// import { useState } from "react"

// interface GalleryTabProps {
//   image: ImageType
// }

// const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
//   const [isHovering, setIsHovering] = useState(false)

//   return (
//     <Tab className="relative flex aspect-square cursor-pointer items-center justify-center bg-transparent outline-none">
//       {({ selected }) => (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.3 }}
//           whileHover={{
//             scale: 1.05,
//             transition: { duration: 0.2 },
//           }}
//           onHoverStart={() => setIsHovering(true)}
//           onHoverEnd={() => setIsHovering(false)}
//           className="relative w-full h-full"
//         >
//           <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden">
//             <motion.div
//               animate={{
//                 scale: isHovering ? 1.1 : 1,
//               }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="h-full w-full"
//             >
//               <Image
//                 fill
//                 src={image.url || "/placeholder.svg"}
//                 alt=""
//                 sizes="(max-width: 768px) 100vw, 33vw"
//                 className={cn(
//                   "object-cover object-center transition-all duration-300",
//                   isHovering ? "brightness-110" : "brightness-100",
//                 )}
//                 priority={selected}
//               />
//             </motion.div>
//           </span>

//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={{
//               opacity: selected ? 1 : 0,
//               border: selected ? "1px solid white" : "none",
//             }}
//             transition={{ duration: 0.2 }}
//             className="absolute inset-0"
//           />
//         </motion.div>
//       )}
//     </Tab>
//   )
// }

// export default GalleryTab

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type React from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"
import { cn } from "@/lib/utils"
import type { Image as ImageType } from "@/types"

interface GalleryTabProps {
  image: ImageType
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center bg-transparent outline-none">
      {({ selected }) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          className="relative w-full h-full"
        >
          <span className="absolute inset-0 aspect-square overflow-hidden">
            <motion.div
              animate={{ scale: isHovering ? 1.1 : 1 }}
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
                  isHovering ? "brightness-110" : "brightness-100"
                )}
                priority={selected}
              />
            </motion.div>
          </span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: selected ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 border border-white"
          />
        </motion.div>
      )}
    </Tab>
  )
}

export default GalleryTab
