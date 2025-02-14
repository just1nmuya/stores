"use client";

import { Product } from "@/types";
import Currency from "./ui/currency";
import Button from "./ui/buttons";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
  showDescription?: boolean; // Add this prop to toggle description rendering
}

const Info: React.FC<InfoProps> = ({ data, showDescription = true }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div className="-ml-3">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-xl text-gray-900">
          <Currency value={data.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-3">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>

          <div className="flex items-center gap-x-3">
            <h3 className="font-semibold text-black">Color:</h3>
            <div
              className="h-6 w-6 rounded-full border border-gray-600"
              style={{ backgroundColor: data?.color?.value }}
            ></div>
          </div>
        </div>
        {showDescription && ( // Conditionally render the description
          <div className="rounded-xl bg-gray-50 relative p-2 -ml-2">
            {data.description}
          </div>
        )}
        <div className="flex items-center gap-x-3">
          <Button onClick={onAddToCart} className="flex items-center gap-x-2 ">
            Add to Cart
            <ShoppingCart />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;

