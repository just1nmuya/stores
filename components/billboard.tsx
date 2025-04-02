// "use client"

// import type React from "react"

// import type { Billboard as BillboardType } from "@/types"
// import { motion } from "framer-motion"

// interface BillboardProps {
//   data: BillboardType
// }

// const Billboard: React.FC<BillboardProps> = ({ data }) => (
//   <div className="relative overflow-hidden mt-16">
//     {/* Background Image with Parallax Effect */}
//     <motion.div
//       initial={{ scale: 1.1 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "linear" }}
//       style={{ backgroundImage: `url(${data?.imageUrl})` }}
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//     />

//     {/* Gradient Overlay */}
//     <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

//     {/* Content Container */}
//     <div className="relative z-10 flex flex-col justify-center items-start h-[70vh] md:h-[60vh] lg:h-[80vh] px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1, delay: 0.2 }}
//         className="space-y-4 md:space-y-6"
//       >
       

//         {/* Main Text */}
//         <h1 className="font-bold text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-white leading-tight tracking-tight">
//           {data.label.split(" ").map((word, index) => (
//             <motion.span
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
//               className="inline-block mr-4"
//             >
//               {word}
//             </motion.span>
//           ))}
//         </h1>

//         {/* Decorative Line */}
//         <motion.div
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: 1 }}
//           transition={{ duration: 1, delay: 1 }}
//           className="w-24 h-1 bg-white"
//         />
//       </motion.div>
//     </div>

//     {/* Decorative Elements */}
//     <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 1, delay: 1.2 }}
//       className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-white/30"
//     />
//     <motion.div
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 1, delay: 1.4 }}
//       className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-white/30"
//     />
//   </div>
// )

// export default Billboard

// "use client"

// import type React from "react"
// import type { Billboard as BillboardType } from "@/types"
// import { motion } from "framer-motion"

// interface BillboardProps {
//   data: BillboardType
// }

// const Billboard: React.FC<BillboardProps> = ({ data }) => (
//   <div className="relative overflow-hidden h-screen">
//     {/* Background Image */}
//     <motion.div
//       initial={{ scale: 1.05 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 8, ease: "easeOut" }}
//       style={{ backgroundImage: `url(${data?.imageUrl})` }}
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//     />

//     {/* Minimal Content Container */}
//     <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-[1400px] mx-auto px-4 md:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="text-center max-w-3xl"
//       >
//         <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider font-normal text-white">
//           {data.label}
//         </h1>
//       </motion.div>
//     </div>
//   </div>
// )

// export default Billboard

"use client"

import type React from "react"
import type { Billboard as BillboardType } from "@/types"
import { motion } from "framer-motion"

interface BillboardProps {
  data: BillboardType
}

const Billboard: React.FC<BillboardProps> = ({ data }) => (
  <div className="relative overflow-hidden h-screen">
    {/* Background Image */}
    <motion.div
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 8, ease: "easeOut" }}
      style={{ backgroundImage: `url(${data?.imageUrl})` }}
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    />

    {/* Minimal Content Container */}
    <div className="relative z-10 flex flex-col justify-center items-center h-full max-w-[1400px] mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl uppercase tracking-wider font-normal text-white">
          {data.label}
        </h1>
      </motion.div>
    </div>
  </div>
)

export default Billboard
