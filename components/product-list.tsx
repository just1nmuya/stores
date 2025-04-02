// import { Product } from "@/types";
// import NoResults from "@/components/ui/no-results";
// import ProductCard from "./ui/product-card";
// import { cn } from "@/lib/utils";


// interface ProductListProps {
//   title: string;
//   items: Product[];
//   gridClass?: string; 
// }

// const ProductList: React.FC<ProductListProps> = ({ 
//   title, 
//   items,
//   gridClass = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" // Add default value
// }) => {
//   return (
//     <div className="space-y-4">
//       <h3 className="font-bold text-black text-3xl">{title}</h3>
//       {items.length === 0 && <NoResults />}
//       {/* 2. Use the gridClass prop with fallback */}
//       <div className={cn("grid", gridClass)}>
//         {items.map((item) => (
//           <ProductCard key={item.id} data={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;

import type React from "react"
import type { Product } from "@/types"
import NoResults from "@/components/ui/no-results"
import ProductCard from "./ui/product-card"
import { cn } from "@/lib/utils"

interface ProductListProps {
  title: string
  items: Product[]
  gridClass?: string
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  gridClass = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12",
}) => {
  return (
    <div className="space-y-8">
      {title && <h3 className="text-xl uppercase text-center tracking-wider font-normal">{title}</h3>}
      {items.length === 0 && <NoResults />}
      <div className={cn("grid", gridClass)}>
        {items.map((item, index) => (
          <ProductCard key={item.id} data={item} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ProductList

