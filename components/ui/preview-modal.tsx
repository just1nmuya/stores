"use client"

import usePreviewModal from "@/hooks/use-preview-modal"
import Modal from "./modal"
import Gallery from "../gallery"
import Info from "../info"
import { motion } from "framer-motion"

const PreviewModal = () => {
  const previewModal = usePreviewModal()
  const product = usePreviewModal((state) => state.data)

  if (!product) {
    return null
  }

  return (
    <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="grid w-full grid-cols-1 items-start gap-x-4 gap-y-6 sm:grid-cols-12 lg:gap-x-6 max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[80vw] max-h-[80vh] overflow-y-auto p-2"
      >
        <div className="sm:col-span-6 lg:col-span-7">
          <Gallery images={product.images} isInModal={true} />
        </div>
        <div className="sm:col-span-6 lg:col-span-5">
          <Info data={product} showDescription={false} isCompact={true} />
        </div>
      </motion.div>
    </Modal>
  )
}

export default PreviewModal

