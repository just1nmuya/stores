// "use client"

// import axios from "axios"
// import { useEffect, useState } from "react"
// import { useSearchParams } from "next/navigation"
// import toast from "react-hot-toast"
// import { motion, AnimatePresence } from "framer-motion"

// import Button from "@/components/ui/buttons"
// import Currency from "@/components/ui/currency"
// import useCart from "@/hooks/use-cart"
// import { CheckCircle, CreditCard, Loader2, TruckIcon, Phone } from "lucide-react"

// const Summary = () => {
//   const searchParams = useSearchParams()
//   const items = useCart((state) => state.items)
//   const removeAll = useCart((state) => state.removeAll)

//   // State for payment method, phone number, and delivery address
//   const [paymentMethod, setPaymentMethod] = useState("stripe")
//   const [mpesaPhone, setMpesaPhone] = useState("")
//   const [address, setAddress] = useState("")

//   // State for order status polling
//   const [orderId, setOrderId] = useState<string | null>(null)
//   const [orderStatus, setOrderStatus] = useState<string>("")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   useEffect(() => {
//     if (searchParams.get("success")) {
//       toast.success("Payment completed.")
//       removeAll()
//     }
//     if (searchParams.get("canceled")) {
//       toast.error("Something went wrong")
//     }
//   }, [searchParams, removeAll])

//   useEffect(() => {
//     if (!orderId || paymentMethod !== "mpesa") return
//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`)
//         const order = res.data
//         if (order.isPaid) {
//           setOrderStatus("Payment confirmed!")
//           toast.success("Payment confirmed!")
//           clearInterval(interval)
//           removeAll()
//         } else {
//           setOrderStatus("Awaiting payment confirmation...")
//         }
//       } catch (error) {
//         console.error("Error fetching order status:", error)
//       }
//     }, 10000)
//     return () => clearInterval(interval)
//   }, [orderId, paymentMethod, removeAll])

//   const totalPrice = items.reduce((total, item) => total + Number(item.price), 0)

//   const onCheckout = async () => {
//     try {
//       setIsSubmitting(true)
//       let endpoint = ""
//       if (paymentMethod === "stripe") {
//         endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`
//       } else if (paymentMethod === "mpesa") {
//         endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stkpush`
//       // } else if (paymentMethod === "cod") {
//       //   endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/cod`
//       }

//       const payload: {
//         productIds: string[]
//         amount: number
//         orderId: string
//         phone?: string
//         address?: string
//       } = {
//         productIds: items.map((item) => item.id),
//         amount: totalPrice,
//         orderId: `ORDER_${Date.now()}`,
//       }

//       // For mpesa and COD, include additional details if needed.
//       if (paymentMethod === "mpesa") {
//         payload.phone = mpesaPhone // You can decide if COD should require a phone number.
//         payload.address = address
//       }

//       const { data } = await axios.post(endpoint, payload, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: false,
//       })

//       if (paymentMethod === "stripe") {
//         if (data?.url) {
//           window.location.href = data.url
//         } else {
//           toast.error("Stripe checkout URL not found")
//         }
//       } else if (paymentMethod === "mpesa") {
//         toast.success("Check your phone to complete payment")
//         if (data?.orderId) {
//           setOrderId(data.orderId)
//           setOrderStatus("Awaiting payment confirmation...")
//         } else {
//           toast.error("Order ID not returned from payment initiation")
//         }
//       // } else if (paymentMethod === "cod") {
//       //   // For COD, simply notify the user and clear the cart.
//       //   toast.success("Order placed! Please prepare cash upon delivery.")
//       //   removeAll()
//       }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       console.error("Payment Error:", err)
//       if (axios.isAxiosError(err) && err.response) {
//         toast.error(err.response.data?.error || "Payment failed")
//       } else {
//         toast.error("Payment failed")
//       }
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   }

//   const fadeInVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.4,
//       },
//     },
//   }

//   const getPaymentIcon = () => {
//     switch (paymentMethod) {
//       case "stripe":
//         return <CreditCard className="h-5 w-5 text-indigo-600" />
//       case "mpesa":
//         return <Phone className="h-5 w-5 text-green-600" />
//       // case "cod":
//       //   return <Banknote className="h-5 w-5 text-yellow-600" />
//       default:
//         return null
//     }
//   }

//   return (
//     <motion.div
//       className="mt-16 rounded-xl bg-white px-6 py-8 shadow-xl border border-gray-100 lg:col-span-5 lg:mt-0"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.h2
//         className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200"
//         variants={itemVariants}
//       >
//         Order Summary
//       </motion.h2>

//       <motion.div className="space-y-4" variants={itemVariants}>
//         <div className="flex items-center justify-between py-4 border-b border-gray-100 -mt-5">
//           <span className="text-lg font-semibold text-gray-700">Total</span>
//           <Currency value={totalPrice} />
//         </div>
//       </motion.div>

//       <motion.div className="mt-5 space-y-6" variants={containerVariants}>
//         <motion.div className="space-y-2" variants={itemVariants}>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
//           <div className="relative">
//             <div className="absolute left-4 top-1/2 transform -translate-y-1/2">{getPaymentIcon()}</div>
//             <select
//               id="paymentMethod"
//               value={paymentMethod}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none bg-white"
//               style={{
//                 backgroundImage:
//                   "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
//                 backgroundPosition: "right 0.5rem center",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "1.5em 1.5em",
//               }}
//             >
//               <option value="stripe" className="p-2">
//                  Card
//               </option>
//               <option value="mpesa" className="p-2">
//                  M‑Pesa
//               </option>
              
//             </select>
//           </div>
//         </motion.div>

//         <AnimatePresence>
//           {(paymentMethod === "mpesa" ) && (
//             <motion.div
//               className="space-y-4"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.div className="space-y-2" variants={fadeInVariants} initial="hidden" animate="visible">
//                 <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//                 <div className="relative">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                     <Phone className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="tel"
//                     placeholder="07XX XXX XXX"
//                     value={mpesaPhone}
//                     onChange={(e) => setMpesaPhone(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                   />
//                 </div>
//               </motion.div>

//               <motion.div className="space-y-2" variants={fadeInVariants} initial="hidden" animate="visible">
//                 <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
//                 <div className="relative">
//                   <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
//                     <TruckIcon className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Postal Code and City"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
//                   />
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//           <Button
//             disabled={
//               items.length === 0 ||
//               isSubmitting ||
//               (paymentMethod === "mpesa" && (!mpesaPhone || !address)) 
//               // (paymentMethod === "cod" && (!mpesaPhone || !address))
//             }
//             onClick={onCheckout}
//             className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg transition-all transform disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <Loader2 className="h-5 w-5 animate-spin mx-auto" />
//             ) : orderStatus.includes("Awaiting") ? (
//               <div className="flex items-center justify-center gap-2">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//                 <span>Processing...</span>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center gap-2">
//                 {getPaymentIcon()}
//                 <span>{`Pay ${paymentMethod === "mpesa" ? "via M‑Pesa" : paymentMethod === "cod" ? "on Delivery" : "Now"}`}</span>
//               </div>
//             )}
//           </Button>
//         </motion.div>

//         <AnimatePresence>
//           {orderStatus && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className={`p-4 rounded-lg ${
//                 orderStatus.includes("confirmed")
//                   ? "bg-green-50 text-green-700 border border-green-200"
//                   : "bg-blue-50 text-blue-700 border border-blue-200"
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 {orderStatus.includes("confirmed") ? (
//                   <CheckCircle className="h-5 w-5" />
//                 ) : (
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                 )}
//                 <span>{orderStatus}</span>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <motion.div
//           className="flex items-center justify-center gap-3 mt-6 p-4 bg-green-50 rounded-lg border border-green-100"
//           variants={itemVariants}
//           whileHover={{
//             scale: 1.02,
//             boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
//           }}
//         >
//           <TruckIcon className="h-6 w-6 text-green-600" />
//           <div className="text-sm text-green-700">
//             <p className="font-medium">Fast Delivery</p>
//             <p>Estimated 1-3 business days</p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default Summary

"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/ui/buttons"
import Currency from "@/components/ui/currency"
import useCart from "@/hooks/use-cart"
import { CheckCircle, Loader2 } from "lucide-react"

const Summary = () => {
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  // State for payment method, phone number, and delivery address
  const [paymentMethod, setPaymentMethod] = useState("stripe")
  const [mpesaPhone, setMpesaPhone] = useState("")
  const [address, setAddress] = useState("")

  // State for order status polling
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderStatus, setOrderStatus] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.")
      removeAll()
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong")
    }
  }, [searchParams, removeAll])

  useEffect(() => {
    if (!orderId || paymentMethod !== "mpesa") return
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`)
        const order = res.data
        if (order.isPaid) {
          setOrderStatus("Payment confirmed!")
          toast.success("Payment confirmed!")
          clearInterval(interval)
          removeAll()
        } else {
          setOrderStatus("Awaiting payment confirmation...")
        }
      } catch (error) {
        console.error("Error fetching order status:", error)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [orderId, paymentMethod, removeAll])

  const totalPrice = items.reduce((total, item) => total + Number(item.price), 0)

  const onCheckout = async () => {
    try {
      setIsSubmitting(true)
      let endpoint = ""
      if (paymentMethod === "stripe") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`
      } else if (paymentMethod === "mpesa") {
        endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stkpush`
      }

      const payload: {
        productIds: string[]
        amount: number
        orderId: string
        phone?: string
        address?: string
      } = {
        productIds: items.map((item) => item.id),
        amount: totalPrice,
        orderId: `ORDER_${Date.now()}`,
      }

      // For mpesa, include additional details
      if (paymentMethod === "mpesa") {
        payload.phone = mpesaPhone
        payload.address = address
      }

      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      })

      if (paymentMethod === "stripe") {
        if (data?.url) {
          window.location.href = data.url
        } else {
          toast.error("Stripe checkout URL not found")
        }
      } else if (paymentMethod === "mpesa") {
        toast.success("Check your phone to complete payment")
        if (data?.orderId) {
          setOrderId(data.orderId)
          setOrderStatus("Awaiting payment confirmation...")
        } else {
          toast.error("Order ID not returned from payment initiation")
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Payment Error:", err)
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.error || "Payment failed")
      } else {
        toast.error("Payment failed")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="bg-transparent border border-black p-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
    >
      <h2 className="text-xs uppercase tracking-wider font-normal mb-6 pb-4 border-b border-border">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-border">
          <span className="text-xs uppercase">Total</span>
          <Currency value={totalPrice} />
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-normal">Payment Method</h3>

          <div className="relative">
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border border-black bg-transparent p-2 text-xs appearance-none"
            >
              <option value="stripe">Stripe</option>
              {/* <option value="mpesa">M-Pesa</option> */}
            </select>
          </div>
        </div>

        <AnimatePresence>
          {paymentMethod === "mpesa" && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <label className="block text-xs uppercase mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="07XX XXX XXX"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                  className="w-full border border-black bg-transparent p-2 text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase mb-1">Delivery Address</label>
                <input
                  type="text"
                  placeholder="Full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-black bg-transparent p-2 text-xs"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          disabled={items.length === 0 || isSubmitting || (paymentMethod === "mpesa" && (!mpesaPhone || !address))}
          onClick={onCheckout}
          className="w-full"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mx-auto" />
          ) : orderStatus.includes("Awaiting") ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <span>Checkout</span>
          )}
        </Button>

        <AnimatePresence>
          {orderStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 border ${
                orderStatus.includes("confirmed") ? "border-green-500 text-green-700" : "border-blue-500 text-blue-700"
              }`}
            >
              <div className="flex items-center gap-2">
                {orderStatus.includes("confirmed") ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                <span className="text-xs">{orderStatus}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Summary

