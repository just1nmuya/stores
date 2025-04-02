// import type { Product, Category } from "@/types";
// import getBillboard from "@/components/actions/get-billboards";
// import getCategories from "@/components/actions/get-categories";
// import getProducts from "@/components/actions/get-products";
// import Billboard from "@/components/billboard";

// import Container from "@/components/ui/container";
// import ProductList from "@/components/product-list";
// import CategoryCarousel from "@/components/category";
// import WhyChooseUs from "@/components/whyChooseUs";
// import GetInTouch from "@/components/contact";
// import SocialFooter from "@/components/social";

// export const revalidate = 0;

// const HomePage = async () => {
//   // Explicitly type products as Product[]
//   let products: Product[] = [];
//   let billboard = null;
//   let categories: Category[] = [];

//   try {
//     products = await getProducts({ isFeatured: true });
//   } catch (error) {
//     console.error("Error fetching featured products:", error);
//     // Fallback to an empty array if products fail to load
//     products = [];
//   }

//   try {
//     billboard = await getBillboard("fd2de91e-8a20-4662-9c7e-84c6f50b39ad");
//   } catch (error) {
//     console.error("Error fetching billboard:", error);
//     billboard = null;
//   }

//   try {
//     categories = await getCategories();
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     // Fallback to an empty array if categories fail to load
//     categories = [];
//   }

//   return (
//     <div>
//       {/* Billboard Section */}
//       <div className="bg-gradient-to-b from-gray-50 to-white">
//         <Container>
//           <div className="space-y-10">
//             {billboard && <Billboard data={billboard} />}
//           </div>
//         </Container>
//       </div>

//       {/* Categories Carousel */}
//       <div>
//         <CategoryCarousel categories={categories} />
//       </div>

//       {/* Featured Products */}
//       <div className="py-24 bg-gradient-to-b from-purple-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
//               Featured Items
//               <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform translate-y-2"></span>
//             </h2>
//             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//               Discover our most popular products
//             </p>
//           </div>
//           {products.length > 0 ? (
//             <div className="mt-10 -mb-10">
//               <ProductList items={products.slice(0, 30)} title={""} />
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">
//               No featured products available
//             </p>
//           )}
//         </div>
//       </div>

//       {/* About Us Section */}
//       <div>
//         <WhyChooseUs />
//       </div>

//       {/* Contact Us Section */}
//       <div>
//         <GetInTouch />
//       </div>

//       {/* Social Links Section */}
//       <div>
//         <SocialFooter />
//       </div>
//     </div>
//   );
// };

// export default HomePage;

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
    billboard = await getBillboard("c8871df0-49f0-436d-aadc-5c18669b507c");
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

      <Link href="/shop" className="flex rounded-md bg-black mb-10 h-10 w-32 mx-auto items-center justify-center text-sm md:w-40 md:h-10 md:text-base text-white hover:opacity-70 transition duration-300 ease-in-out uppercase">
        Shop All
      </Link>
      
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
