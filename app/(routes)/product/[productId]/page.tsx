// import getProduct from "@/components/actions/get-product";
// import getProducts from "@/components/actions/get-products";
// import Gallery from "@/components/gallery";
// import Info from "@/components/info";
// import ProductList from "@/components/product-list";
// import Container from "@/components/ui/container";

// // Update the props so that params is a Promise
// interface ProductPageProps {
//   params: Promise<{ productId: string }>;
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   // Await the params to extract the productId
//   const { productId } = await params;
  
//   const product = await getProduct(productId);

//   const suggestedProducts = await getProducts({
//     categoryId: product?.category?.id,
//   });

//   return (
//     <div className="bg-white">
//       <Container>
//         <div className="px-4 py-10 sm:px-6 lg:px-8 mt-10">
//           <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
//             <Gallery images={product.images} />
//             <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
//               <Info data={product} />
//             </div>
//           </div>
//           <hr className="my-10" />
//           <ProductList title="Related Items" items={suggestedProducts} />
//         </div>
//       </Container>
//     </div>
//   );
// }

import getProduct from "@/components/actions/get-product"
import getProducts from "@/components/actions/get-products"
import Gallery from "@/components/gallery"
import Info from "@/components/info"
import ProductList from "@/components/product-list"

interface ProductPageProps {
  params: Promise<{ productId: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params

  const product = await getProduct(productId)

  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  })

  return (
    <div className="min-h-screen pt-32 md:pt-40 bg-white -mt-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <Gallery images={product.images} />
          <div>
            <Info data={product} />
          </div>
        </div>

        <div className="mt-20">
          <ProductList
            title="You may also like"
            items={suggestedProducts.filter((item) => item.id !== productId).slice(0, 4)}
            gridClass="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12"
          />
        </div>
      </div>
    </div>
  )
}

