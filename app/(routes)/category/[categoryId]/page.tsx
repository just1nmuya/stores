// import getCategory from "@/components/actions/get-category";
// import getColors from "@/components/actions/get-colors";
// import getProducts from "@/components/actions/get-products";
// import getSizes from "@/components/actions/get-sizes";
// import Billboard from "@/components/billboard";
// import Container from "@/components/ui/container";
// // import Filter from "./components/filter";
// import NoResults from "@/components/ui/no-results";
// import ProductCard from "@/components/ui/product-card";
// // import MobileFilters from "./components/mobile-filters";
// import ProductFilters from "@/components/product-filter";

// export const revalidate = 0;

// interface CategoryPageProps {
//   // Update params and searchParams so they are Promises.
//   params: Promise<{ categoryId: string }>;
//   searchParams: Promise<{ colorId: string; sizeId: string }>;
// }

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps) {
//   // Await the resolution of params and searchParams to extract their values.
//   const { categoryId } = await params;
//   const { colorId, sizeId } = await searchParams;

//   const products = await getProducts({
//     categoryId,
//     colorId,
//     sizeId,
//   });

//   const sizes = await getSizes();
//   const colors = await getColors();
//   const category = await getCategory(categoryId);

//   return (
//     <div className="bg-white">
//       <Container>
//         <div className="mb-8 text-black">
//           <Billboard data={category.billboard} />
//         </div>
//         <div className="container mx-auto px-4 py-8">
//           <div className="space-y-8 max-w-[1200px] mx-auto">
//             <ProductFilters sizes={sizes} colors={colors} />

//             {/* Products grid would go here */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {/* Product cards */}
//               <div className="mt-6 lg:col-span-4 lg:mt-0">
//                 {products.length === 0 && <NoResults />}
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {products.map((item) => (
//                     <ProductCard key={item.id} data={item} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

import getCategory from "@/components/actions/get-category"
import getColors from "@/components/actions/get-colors"
import getProducts from "@/components/actions/get-products"
import getSizes from "@/components/actions/get-sizes"
import NoResults from "@/components/ui/no-results"
import ProductCard from "@/components/ui/product-card"
import ProductFilters from "@/components/product-filter"

export const revalidate = 0

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>
  searchParams: Promise<{ colorId: string; sizeId: string }>
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { categoryId } = await params
  const { colorId, sizeId } = await searchParams

  const products = await getProducts({
    categoryId,
    colorId,
    sizeId,
  })

  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(categoryId)

  return (
    <div className="min-h-screen pt-32 md:pt-40 bg-white ">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        <div className="mb-16">
          <h1 className="uppercase tracking-wider text-2xl -mt-10">{category.name}</h1>
        </div>

        <div className="space-y-8 -mt-10">
          <ProductFilters sizes={sizes} colors={colors} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {products.length === 0 && <NoResults />}
            {products.map((item, index) => (
              <ProductCard key={item.id} data={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

