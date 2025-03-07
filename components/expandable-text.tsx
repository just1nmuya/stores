"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExpandableTextProps {
  text: string
  limit: number
}

export default function ExpandableText({ text, limit }: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const displayText = isExpanded ? text : text.slice(0, limit) + "..."

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={isExpanded ? "expanded" : "collapsed"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-700 leading-relaxed">{displayText}</p>
        </motion.div>
      </AnimatePresence>
      {text.length > limit && (
        <motion.button
          onClick={toggleExpand}
          className="mt-2 flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? (
            <>
              Read less <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Read more <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  )
}

