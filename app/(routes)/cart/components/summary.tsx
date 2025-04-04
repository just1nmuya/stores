"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle } from "lucide-react";

import Button from "@/components/ui/buttons";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Calculate subtotal from cart items
  const subtotal = items.reduce((total, item) => total + Number(item.price), 0);

  // Calculate shipping cost - free if subtotal > $150, otherwise $15
  const shippingCost = subtotal > 150 ? 0 : 10;

  // Calculate total with shipping
  const totalPrice = subtotal + shippingCost;

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      setOrderComplete(true);
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  const onCheckout = async () => {
    try {
      setIsSubmitting(true);
      const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`;

      const payload = {
        productIds: items.map((item) => item.id),
        // We're still sending the totalPrice, but the backend will calculate it independently
        amount: totalPrice,
        orderId: `ORDER_${Date.now()}`,
      };

      const { data } = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      });

      if (data?.url) {
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
      <h2 className="text-xs uppercase tracking-wider font-normal mb-6 pb-4 border-b border-border">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <span className="text-xs uppercase">Subtotal</span>
          <Currency value={subtotal} />
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center">
            <span className="text-xs uppercase">Shipping</span>
            {shippingCost === 0 && (
              <span className="ml-2 text-[10px] uppercase bg-black text-white px-1.5 py-0.5">
                Free
              </span>
            )}
          </div>
          <Currency value={shippingCost} />
        </div>

        <div className="flex items-center justify-between py-2 border-t border-border font-medium">
          <span className="text-xs uppercase">Total</span>
          <Currency value={totalPrice} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {orderComplete ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 border border-black"
          >
            <div className="flex flex-col items-center text-center gap-2">
              <CheckCircle className="h-5 w-5 mb-1" />
              <span className="text-sm font-medium">Order Complete</span>
              <p className="text-xs text-muted-foreground">
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
            {subtotal < 150 && (
              <motion.div
                className="mb-4 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-muted-foreground">
                  Add <Currency value={150 - subtotal} /> more to qualify for
                  free shipping
                </p>
                <div className="w-full bg-gray-100 h-1 mt-2">
                  <motion.div
                    className="bg-black h-1"
                    initial={{ width: 0 }}
                    animate={{ width: `${(subtotal / 150) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  />
                </div>
              </motion.div>
            )}

            <Button
              disabled={items.length === 0 || isSubmitting}
              onClick={onCheckout}
              className="w-full group"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                <span className="flex items-center justify-center">
                  Checkout
                  <motion.span
                    className="ml-2 inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Summary;
