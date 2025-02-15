"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import Button from "@/components/ui/buttons";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { TruckIcon } from "lucide-react";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // State for payment method and phone number (for M-Pesa)
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [mpesaPhone, setMpesaPhone] = useState("");

  // New state variables to handle order status polling
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string>("");

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong");
    }
  }, [searchParams, removeAll]);

  // Poll for order status if orderId is set and payment method is MPesa
  useEffect(() => {
    if (!orderId || paymentMethod !== "mpesa") return;
    const interval = setInterval(async () => {
      try {
        // Replace with your actual endpoint to get order details
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`);
        const order = res.data;
        if (order.isPaid) {
          setOrderStatus("Payment confirmed!");
          toast.success("Payment confirmed!");
          clearInterval(interval);
          removeAll();
        } else {
          setOrderStatus("Awaiting payment confirmation...");
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [orderId, paymentMethod, removeAll]);

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const onCheckout = async () => {
    try {
      // Choose endpoint based on payment method
      const endpoint =
        paymentMethod === "stripe"
          ? `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`
          : `${process.env.NEXT_PUBLIC_API_URL}/checkout/stkpush`;

      const payload: { productIds: string[]; amount: number; orderId: string; phone?: string } = {
        productIds: items.map((item) => item.id),
        amount: totalPrice,
        orderId: `ORDER_${Date.now()}`,
      };

// Add phone only if M-Pesa is selected
if (paymentMethod === "mpesa") {
  payload.phone = mpesaPhone;
}

const { data } = await axios.post(endpoint, payload, {
  headers: {
    "Content-Type": "application/json",
  },
  // Critical for CORS if needed
  withCredentials: false,
});

// When receiving response from STK push
if (paymentMethod === "mpesa") {
  toast.success("Check your phone to complete payment");
  if (data?.orderId) {
    console.log("Order ID from STK push response:", data.orderId);
    setOrderId(data.orderId);
    setOrderStatus("Awaiting payment confirmation...");
  } else {
    toast.error("Order ID not returned from payment initiation");
  }
}

      if (paymentMethod === "stripe") {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          toast.error("Stripe checkout URL not found");
        }
      } else if (paymentMethod === "mpesa") {
        toast.success("Check your phone to complete payment");
        // Save the orderId from response to begin polling for status updates
        if (data?.orderId) {
          setOrderId(data.orderId);
          setOrderStatus("Awaiting payment confirmation...");
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Payment Error:", err);
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.error || "Payment failed");
      } else {
        toast.error("Payment failed");
      }
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      {/* Payment Method Dropdown */}
      <div className="mt-6">
        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
        >
          <option value="stripe">Card</option>
          <option value="mpesa">M‑Pesa</option>
        </select>
      </div>

      {/* Conditional Phone Number Input for M-Pesa */}
      {paymentMethod === "mpesa" && (
        <div className="mt-4">
          <label htmlFor="mpesaPhone" className="block text-sm font-medium text-gray-700">
            Phone Number for M‑Pesa
          </label>
          <input
            type="tel"
            id="mpesaPhone"
            placeholder="07XX XXX XXX"
            value={mpesaPhone}
            onChange={(e) => setMpesaPhone(e.target.value)}
            className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      )}

      <Button disabled={items.length === 0} onClick={onCheckout} className="w-full mt-6">
        Pay
      </Button>

      {/* Display Order Status if available */}
      {orderStatus && (
        <div className="mt-4 text-center text-lg text-gray-800">
          {orderStatus}
        </div>
      )}

      <div className="flex items-center mt-5 gap-2 text-sm">
        <TruckIcon />
        <div>
          <p>Fast Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
