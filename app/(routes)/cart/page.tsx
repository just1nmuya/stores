// "use client";

// import Container from "@/components/ui/container";
// import useCart from "@/hooks/use-cart";
// import CartItem from "./components/cart-item";
// import Summary from "./components/summary";
// import { useEffect, useState } from "react";

// const CartPage = () => {
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const cart = useCart();

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="bg-white">
//       <Container>
//         <div className="px-4 py-16 sm:px-6 lg:px-8 mt-10">
//           <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
//           <div className="mt-7 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
//             <div className="lg:col-span-7 ">
//               {cart.items.length === 0 && (
//                 <p className="text-neutral-500 ">No items added to cart</p>
//               )}
//               <ul>
//                 {cart.items.map((item) => (
//                   <CartItem key={item.id} data={item} />
//                 ))}
//               </ul>
//             </div>
//             <Summary />
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default CartPage;

"use client"

import { useEffect, useState } from "react"
import useCart from "@/hooks/use-cart"
import CartItem from "./components/cart-item"
import Summary from "./components/summary"

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cart = useCart()

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen pt-32 md:pt-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-2xl uppercase tracking-wider font-normal -mt-10 mb-16">Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && <p className="text-xs text-muted-foreground">Your cart is empty</p>}
            <ul className="space-y-8">
              {cart.items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 -mt-10">
            <Summary />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

