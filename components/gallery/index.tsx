// "use client"

// import type React from "react"
// import Image from "next/image"
// import { Tab } from "@headlessui/react"
// import type { Image as ImageType } from "@/types"
// import GalleryTab from "./gallery-tab"
// import { motion, AnimatePresence } from "framer-motion"
// import { useState } from "react"

// interface GalleryProps {
//   images: ImageType[]
// }

// const Gallery: React.FC<GalleryProps> = ({ images }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0)

//   return (
//     <Tab.Group
//       as="div"
//       className="flex flex-col-reverse md:flex-row gap-4"
//       selectedIndex={selectedIndex}
//       onChange={setSelectedIndex}
//     >
//       <div className="w-full md:w-1/5">
//         <Tab.List className="grid grid-cols-5 md:grid-cols-1 gap-2">
//           {images.map((image) => (
//             <GalleryTab key={image.id} image={image} />
//           ))}
//         </Tab.List>
//       </div>

//       <div className="relative aspect-square w-full md:w-4/5 bg-transparent">
//         <AnimatePresence mode="wait" initial={false}>
//           <motion.div
//             key={selectedIndex}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0"
//           >
//             <Image
//               fill
//               src={images[selectedIndex].url || "/placeholder.svg"}
//               alt="Product image"
//               className="object-cover object-center"
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               priority={selectedIndex === 0}
//             />
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </Tab.Group>
//   )
// }

// export default Gallery

"use client"

import { useState } from "react"
import type React from "react"
import Image from "next/image"
import { Tab } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import type { Image as ImageType } from "@/types"
import GalleryTab from "./gallery-tab"

interface GalleryProps {
  images: ImageType[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Tab.Group
      as="div"
      className="flex flex-col-reverse md:flex-row gap-4"
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <div className="w-full md:w-1/5">
        <Tab.List className="grid grid-cols-5 md:grid-cols-1 gap-2">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>

      <div className="relative aspect-square w-full md:w-4/5 bg-transparent">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              fill
              src={images[selectedIndex].url || "/placeholder.svg"}
              alt="Product image"
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={selectedIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Tab.Group>
  )
}

export default Gallery
