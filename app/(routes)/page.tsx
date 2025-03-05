import { Product, Category } from "@/types";
import getBillboard from "@/components/actions/get-billboards";
import getCategories from "@/components/actions/get-categories";
import getProducts from "@/components/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ui/contact-form";
import { Button } from "@/components/ui/button";

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
      <Container>
        <div className="space-y-10 pb-10 ">
        {billboard && <Billboard data={billboard} />}
        </div>
      </Container>


      {/* Categories Carousel */}
      <div className="pt-20 ">
        <div className="text-center mb-12 -mt-14">
          <h2 className="text-3xl font-bold text-black relative inline-block">
            Explore Categories
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500 transform translate-y-2"></span>
          </h2>
        </div>
        {categories.length > 0 ? (
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full mb-20 group"
          >
            <CarouselContent>
              {categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-2">
                    <Link href={`/category/${category.id}`}>
                      <Card className="relative w-full h-80 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-xl border-0 overflow-hidden">
                        <Image
                          fill
                          src={category.image}
                          alt={category.name}
                          className="object-cover transform transition duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <CardContent className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold text-white text-center drop-shadow-md">
                            {category.name}
                          </h3>
                          <Button
                            variant="ghost"
                            className="mt-3 w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                          >
                            Shop Now
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 left-2 h-12 w-12" />
            <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-2 h-12 w-12" />
            
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">No categories available</p>
        )}
      </div>


      {/* Featured Products */}
      <div className="flex flex-col gap-y-8 px-4 lg:px-8 mb-10">
        {products.length > 0 ? (
          <ProductList title="Featured Items" items={products.slice(0, 30)} />
        ) : (
          <p className="text-center text-black-500">
            No featured products available
          </p>
        )}
      </div>


      {/* About Us Section */}
      <Container>
        <div className="py-24 ">
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Why Choose Us?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-600">
                    Every product is rigorously tested to meet our high
                    standards
                  </p>
                </div>
                <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                  <p className="text-gray-600">
                    Express shipping options available nationwide
                  </p>
                </div>
                <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Dedicated customer service team always ready to help
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>


      {/* Contact Us Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-md lg:ml-20">
              Have questions or need assistance? We are here to help! Reach out
              to us through any of these channels:
            </p>
            <div className="space-y-6 lg:ml-20">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customer Support
                  </h3>
                  <p className="text-gray-600 mt-1">0728 038 778</p>
                  <p className="text-gray-600">justinnjoroge426@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Visit Us
                  </h3>
                  <p className="text-gray-600 mt-1">Nairobi, Kenya</p>
                  <p className="text-gray-600">Open Mon-Fri: 9AM - 5PM</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl ">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Join Our Community
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Follow us for exclusive updates and offers
            </p>
          </div>

          <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              aria-label="Facebook"
            >
              <div className="ml-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="mt-2 sm:mt-4 block text-sm sm:text-base font-medium text-gray-700 group-hover:text-blue-600">
                Facebook
              </span>
            </a>

            {/* Twitter/X */}
            <a
              href="https://twitter.com"
              className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              aria-label="X (formerly Twitter)"
            >
              <div className="ml-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-black transition-colors">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-800 group-hover:text-white transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </div>
              <span className="mt-2 sm:mt-4 block text-sm sm:text-base font-medium text-gray-700 group-hover:text-black">
                Twitter/X
              </span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              className="group p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
              aria-label="Instagram"
            >
              <div className=" ml-2 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-600">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </div>
              <span className="mt-2 sm:mt-4 block text-sm sm:text-base font-medium text-gray-700 group-hover:text-pink-600">
                Instagram
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
