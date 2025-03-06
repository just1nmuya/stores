import type { Product, Category } from "@/types";
import getBillboard from "@/components/actions/get-billboards";
import getCategories from "@/components/actions/get-categories";
import getProducts from "@/components/actions/get-products";
import Billboard from "@/components/billboard";

import Container from "@/components/ui/container";
import ProductList from "@/components/product-list";
import CategoryCarousel from "@/components/category";
import WhyChooseUs from "@/components/whyChooseUs";
import GetInTouch from "@/components/contact";
import SocialFooter from "@/components/social";

export const revalidate = 0;

const HomePage = async () => {
  // Explicitly type products as Product[]
  let products: Product[] = [];
  let billboard = null;
  let categories: Category[] = [];

  try {
    products = await getProducts({ isFeatured: true });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    // Fallback to an empty array if products fail to load
    products = [];
  }

  try {
    billboard = await getBillboard("4b6b8b09-6625-4021-b9e8-adecfa6df003");
  } catch (error) {
    console.error("Error fetching billboard:", error);
    billboard = null;
  }

  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Fallback to an empty array if categories fail to load
    categories = [];
  }

  return (
    <div>
      {/* Billboard Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="space-y-10">
            {billboard && <Billboard data={billboard} />}
          </div>
        </Container>
      </div>

      {/* Categories Carousel */}
      <div>
        <CategoryCarousel categories={categories} />
      </div>

      {/* Featured Products */}
      <div className="py-24 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
              Featured Items
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform translate-y-2"></span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular products
            </p>
          </div>
          {products.length > 0 ? (
            <div className="mt-10 -mb-10">
              <ProductList items={products.slice(0, 30)} title={""} />
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No featured products available
            </p>
          )}
        </div>
      </div>


      {/* About Us Section */}
      <div>
        <WhyChooseUs />
      </div>

      {/* Contact Us Section */}
      <div>
        <GetInTouch />
      </div>

      {/* Social Links Section */}
      <div>
        <SocialFooter />
      </div>
    </div>
  );
};

export default HomePage;
