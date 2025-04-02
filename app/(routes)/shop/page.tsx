import getProducts from "@/components/actions/get-products"
import ProductList from "@/components/product-list"
import type { Product } from "@/types"

export const revalidate = 0

export default async function ShopPage() {
  let products: Product[] = []

  try {
    products = await getProducts({})
  } catch (error) {
    console.error("Error fetching products:", error)
    products = []
  }

  return (
    <div className="min-h-screen pt-32 md:pt-40 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-3xl uppercase font-medium mb-16 -mt-7">Shop All</h1>

        {products.length > 0 ? (
          <ProductList
            items={products}
            title={""}
            gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12"
          />
        ) : (
          <p className="text-center text-muted-foreground">No products available</p>
        )}
      </div>
    </div>
  )
}

