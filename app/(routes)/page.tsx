import type { Product } from "@/types";
import getBillboard from "@/components/actions/get-billboards";
import getProducts from "@/components/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Footer from "@/components/footer";
import Link from "next/link";

export const revalidate = 0;

const HomePage = async () => {
  // Explicitly type products as Product[]
  let products: Product[] = [];
  let billboard = null;

  try {
    products = await getProducts({ isFeatured: true });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    // Fallback to an empty array if products fail to load
    products = [];
  }

  try {
    billboard = await getBillboard("bf8f4f83-f33c-4f7e-9e35-2311b0b9da70");
  } catch (error) {
    console.error("Error fetching billboard:", error);
    billboard = null;
  }

  return (
    <div className="min-h-screen">
      {/* Billboard Section */}
      <div>
        {billboard && (
          <div className="max-w-7xl mx-auto">
            <Billboard data={billboard} />
          </div>
        )}
      </div>

      {/* Featured Products */}
      <div className="py-24 max-w-[1400px] mx-auto px-4 md:px-8 bg-white">
        {products.length > 0 ? (
          <ProductList
            items={products.slice(0, 20)}
            title="Featured Products"
            gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12"
          />
        ) : (
          <p className="text-center text-muted-foreground">
            No products available
          </p>
        )}
      </div>

      <Link href="/shop" className="flex rounded-md bg-black mb-10 h-10 w-32 mx-auto items-center justify-center text-sm md:w-40 md:h-10 md:text-base text-white hover:opacity-70 transition duration-300 ease-in-out uppercase -mt-10">
        Shop All
      </Link>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
