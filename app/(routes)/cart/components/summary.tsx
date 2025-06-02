"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

import Button from "@/components/ui/buttons";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // New: collect email, address, and phone
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Calculate subtotal from cart items
  const subtotal = items.reduce((total, item) => total + Number(item.price), 0);
  // Calculate shipping cost – free if subtotal > $150, otherwise $10
  const shippingCost = subtotal > 150 ? 0 : 10;
  const totalPrice = subtotal + shippingCost;

  useEffect(() => {
    if (searchParams.get("success")) {
      if (!orderComplete) {
        toast.success("Payment completed. A confirmation email has been sent.");
      }
      setOrderComplete(true);
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll, orderComplete]);

  const onCheckout = async () => {
    // Validate that email, address, and phone are present
    if (!customerEmail) {
      toast.error("Please provide your email address.");
      return;
    }
    if (!shippingAddress) {
      toast.error("Please provide your shipping address.");
      return;
    }
    if (!phoneNumber) {
      toast.error("Please provide your phone number.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Send address & phone along with productIds and email
      const payload = {
        productIds: items.map((item) => item.id),
        customerEmail,
        shippingAddress,
        phoneNumber,
      };

      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`;
      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        toast.error("Checkout URL not found");
      }
    } catch (err) {
      console.error("Payment Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.error || "Payment failed");
      } else {
        toast.error("Payment failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md mx-auto mt-12"
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
      <h2 className="text-lg md:text-xl font-bold uppercase mb-8 pb-4 border-b border-gray-200 text-center">
        Order Summary
      </h2>

      <div className="space-y-6 mb-8">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm uppercase  text-gray-500">
            Subtotal
          </span>
          <Currency value={subtotal} />
        </div>

        {/* Shipping Cost */}
        <div className="flex items-center justify-between">
          <span className="text-xs md:text-sm uppercase  text-gray-500">
            Shipping
          </span>
          <span>
            {shippingCost === 0 ? (
              <span className="bg-black text-white px-2 py-0.5 rounded-full text-xs uppercase">
                Free
              </span>
            ) : (
              <Currency value={shippingCost} />
            )}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 font-semibold text-base">
          <span className="uppercase text-sm">Total</span>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* If order already completed, show confirmation */}
      <AnimatePresence mode="wait">
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 border border-black rounded-xl bg-gray-50"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <CheckCircle className="h-6 w-6 mb-1 text-green-500" />
              <span className="text-base  font-semibold">Order Complete</span>
              <p className="text-xs text-gray-500">
                Thank you for your purchase. You will receive an email
                confirmation shortly.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6"
          >
            {/* “Add more to qualify for free shipping” indicator */}
            {subtotal < 150 && (
              <motion.div
                className="mb-6 text-xs text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-gray-500">
                  Add <Currency value={150 - subtotal} /> more to qualify for
                  free shipping
                </p>
                <div className="w-full bg-gray-100 h-1 mt-2 rounded">
                  <motion.div
                    className="bg-black h-1 rounded"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(
                        100,
                        subtotal > 0 ? (subtotal / 150) * 100 : 0
                      )}%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}

            {/* New Input: Customer Email */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Shipping Address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="mt-6">
              <Button
                onClick={onCheckout}
                disabled={items.length === 0 || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Summary;
