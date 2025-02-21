"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

import Button from "@/components/ui/buttons";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { CheckCircle, Loader2, TruckIcon } from "lucide-react";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // State for payment method, phone number, and delivery address
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [address, setAddress] = useState("");

  // State for order status polling
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

  useEffect(() => {
    if (!orderId || paymentMethod !== "mpesa") return;
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}`
        );
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
    }, 10000);
    return () => clearInterval(interval);
  }, [orderId, paymentMethod, removeAll]);

  const totalPrice = items.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const onCheckout = async () => {
    try {
      const endpoint =
        paymentMethod === "stripe"
          ? `${process.env.NEXT_PUBLIC_API_URL}/checkout/stripe`
          : `${process.env.NEXT_PUBLIC_API_URL}/checkout/stkpush`;

      const payload: {
        productIds: string[];
        amount: number;
        orderId: string;
        phone?: string;
        address?: string;
      } = {
        productIds: items.map((item) => item.id),
        amount: totalPrice,
        orderId: `ORDER_${Date.now()}`,
      };

      // Include phone and delivery address for M-Pesa payments
      if (paymentMethod === "mpesa") {
        payload.phone = mpesaPhone;
        payload.address = address;
      }

      const { data } = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });

      if (paymentMethod === "stripe") {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          toast.error("Stripe checkout URL not found");
        }
      } else if (paymentMethod === "mpesa") {
        toast.success("Check your phone to complete payment");

        if (data?.orderId) {
          setOrderId(data.orderId);
          setOrderStatus("Awaiting payment confirmation...");
        } else {
          toast.error("Order ID not returned from payment initiation");
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
    <div className="mt-16 rounded-xl bg-white px-6 py-8 shadow-lg border border-gray-100 lg:col-span-5 lg:mt-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-4 border-b border-gray-100 -mt-5">
          <span className="text-lg font-semibold text-gray-700">Total</span>
          <Currency value={totalPrice} />
        </div>
      </div>

      <div className="mt-5 space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="stripe" className="p-2">
              💳 Card (Ksh.65+)
            </option>
            <option value="mpesa" className="p-2">
              📱 M‑Pesa
            </option>
          </select>
        </div>

        {paymentMethod === "mpesa" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                M‑Pesa Phone Number
              </label>
              <input
                type="tel"
                placeholder="07XX XXX XXX"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Delivery Address
              </label>
              <input
                type="text"
                placeholder="Postal Code and City"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>
          </div>
        )}

        <Button
          disabled={
            items.length === 0 ||
            (paymentMethod === "mpesa" && (!mpesaPhone || !address))
          }
          onClick={onCheckout}
          className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg transition-all transform hover:scale-[1.02]"
        >
          {orderStatus.includes("Awaiting") ? (
            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
          ) : (
            `Pay ${paymentMethod === "mpesa" ? "via M‑Pesa" : "Now"}`
          )}
        </Button>

        {orderStatus && (
          <div
            className={`p-4 rounded-lg ${
              orderStatus.includes("confirmed")
                ? "bg-green-50 text-green-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            <div className="flex items-center gap-2">
              {orderStatus.includes("confirmed") ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              <span>{orderStatus}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mt-6 p-4 bg-green-50 rounded-lg">
          <TruckIcon className="h-6 w-6 text-green-600" />
          <div className="text-sm text-green-700">
            <p className="font-medium">Fast Delivery</p>
            <p>Estimated 1-3 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
