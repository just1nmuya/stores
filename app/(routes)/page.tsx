// import getBillboard from "@/components/actions/get-billboards";
// import getCategories from "@/components/actions/get-categories";
// import getProducts from "@/components/actions/get-products";
// import Billboard from "@/components/billboard";
// import ProductList from "@/components/product-list";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import Container from "@/components/ui/container";
// import Image from "next/image";
// import Link from "next/link";

// export const revalidate = 0;

// const HomePage = async () => {
//   const product = await getProducts({ isFeatured: true });
//   const billboard = await getBillboard("cc606efc-806b-4148-afd7-dd94ac39f87c");
//   const categories = await getCategories();

//   return (
//     <div>
//       <Container>
//         {/* Billboard Section */}
//         <div className="space-y-10 pb-10">
//           <Billboard data={billboard} />

//           {/* Categories Carousel */}
//           <div>
//             <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-3 mt-20">
//               Explore Categories
//             </h2>
//             <Carousel
//               opts={{ align: "start" }}
//               className="w-full sm:max-w-xs lg:max-w-full mb-20"
//             >
//               <CarouselContent>
//                 {categories.map((category) => (
//                   <CarouselItem
//                     key={category.id}
//                     className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
//                   >
//                     <div className="p-5">
//                       <Link href={`/category/${category.id}`}>
//                         <Card className="relative w-full h-96 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-xl border overflow-hidden">
//                           {/* Image Section */}
//                           <Image
//                             fill
//                             src={category.image}
//                             alt={category.name}
//                             className="absolute inset-0 w-full h-full object-cover"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-30" />

//                           {/* Text Section */}
//                           <CardContent className="relative z-10 flex items-center justify-center h-full">
//                             <h3 className="text-3xl font-bold text-white text-center">
//                               {category.name}
//                             </h3>
//                           </CardContent>
//                         </Card>
//                       </Link>
//                     </div>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
//             </Carousel>
//           </div>

//           {/* Featured Products */}
//           <div className="flex flex-col gap-y-8 px-4 lg:px-8">
//             <ProductList title="Featured Items" items={product.slice(0, 30)} />
//           </div>
//         </div>

//         {/* About Us Section */}
//         <div className="bg-white py-12 m-20">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
//               About Us
//             </h2>
//             <p className="mt-4 text-lg text-gray-600">
//               Welcome to our store! We are passionate about providing the best
//               products and services to our customers. Our mission is to deliver
//               quality and satisfaction every step of the way.
//             </p>
//             <p className="mt-4 text-lg text-gray-600">
//               With years of experience, we strive to bring innovative solutions
//               and an exceptional shopping experience to our customers worldwide.
//             </p>
//           </div>
//         </div>

//         {/* Contact Us Section */}
//         <div className="bg-gray-100 py-16 px-4 lg:px-20">
//           <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//             {/* Contact Information */}
//             <div className="space-y-6">
//               <h2 className="text-3xl font-extrabold text-gray-800">
//                 Contact Us
//               </h2>
//               <p className="text-lg text-gray-600">
//                 Have questions or need assistance? Get in touch with us, and we
//                 will be happy to help!
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-blue-100 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-600"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M2.003 5.884L10 10.588l7.997-4.704A2.001 2.001 0 0015.999 3H4.001a2 2 0 00-1.998 2.884zM18 8.412l-8 4.705-8-4.705V14a2 2 0 002 2h12a2 2 0 002-2V8.412z" />
//                     </svg>
//                   </div>
//                   <span className="text-lg text-gray-700">
//                     justinnjoroge426@gmail.com
//                   </span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-blue-100 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-600"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.172 5.414l-1.414 1.414L7.586 15 14 8.586l-1.414-1.414L7.586 12.586 5.172 10.414z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-lg text-gray-700">0728 038 778</span>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <div className="p-3 bg-blue-100 rounded-full">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6 text-blue-600"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11.93V14h-2v-2.07a1 1 0 01.293-.707L10 9.586l.707.707A1 1 0 0111 10.93zM9 4h2v4H9V4z" />
//                     </svg>
//                   </div>
//                   <span className="text-lg text-gray-700">Nairobi, Kenya</span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
//               <h3 className="text-2xl font-bold text-gray-800">
//                 Send Us a Message
//               </h3>
//               <form className="space-y-4">
//                 <div>
//                   <label
//                     htmlFor="name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                     placeholder="Your Name"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                     placeholder="Your Email"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="message"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Message
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                     placeholder="Your Message"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none"
//                 >
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Social Links Section */}
//         <div className="bg-gray-50 py-12">
//           <div className="max-w-4xl mx-auto text-center space-y-4">
//             <h2 className="text-3xl font-extrabold text-gray-800">Follow Us</h2>
//             <p className="text-lg text-gray-600">
//               Stay connected with us on social media for updates!
//             </p>
//             <div className="flex justify-center space-x-6">
//               {/* Facebook Link */}
//               <a
//                 href="https://facebook.com"
//                 className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
//                 aria-label="Facebook"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3 3-3 .9 0 1.9.2 1.9.2v2h-1.1c-1 0-1.3.6-1.3 1.3V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z" />
//                 </svg>
//               </a>

//               {/* Twitter Link */}
//               <a
//                 href="https://twitter.com"
//                 className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
//                 aria-label="X (formerly Twitter)"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M21.707 3.293a1 1 0 00-1.414 0L12 11.586 3.707 3.293a1 1 0 10-1.414 1.414L10.586 13l-8.293 8.293a1 1 0 101.414 1.414L12 14.414l8.293 8.293a1 1 0 001.414-1.414L13.414 13l8.293-8.293a1 1 0 000-1.414z" />
//                 </svg>
//               </a>

//               {/* Instagram Link */}
//               <a
//                 href="https://instagram.com"
//                 className="p-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full hover:opacity-90 transition"
//                 aria-label="Instagram"
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 1.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.75-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default HomePage;

import { Product, Category } from "@/types"; // Ensure you have this type defined and imported
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
} from "@/components/ui/carousel";
import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";

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
    billboard = await getBillboard("b90a7433-2332-4d06-bd85-c1c1f98fdcad");
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
      <Container>
        {/* Billboard Section */}
        <div className="space-y-10 pb-10">
          {billboard ? <Billboard data={billboard} /> : <p>Billboard unavailable</p>}
  
          {/* Categories Carousel */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-3 mt-20">
              Explore Categories
            </h2>
            {categories.length > 0 ? (
              <Carousel
                opts={{ align: "start" }}
                className="w-full sm:max-w-xs lg:max-w-full mb-20"
              >
                <CarouselContent>
                  {categories.map((category) => (
                    <CarouselItem
                      key={category.id}
                      className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <div className="p-5">
                        <Link href={`/category/${category.id}`}>
                          <Card className="relative w-full h-96 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-xl border overflow-hidden">
                            {/* Image Section */}
                            <Image
                              fill
                              src={category.image}
                              alt={category.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30" />
                            {/* Text Section */}
                            <CardContent className="relative z-10 flex items-center justify-center h-full">
                              <h3 className="text-3xl font-bold text-white text-center">
                                {category.name}
                              </h3>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <p className="text-center text-red-500">No categories available</p>
            )}
          </div>
  
          {/* Featured Products */}
          <div className="flex flex-col gap-y-8 px-4 lg:px-8">
            {products.length > 0 ? (
              <ProductList title="Featured Items" items={products.slice(0, 30)} />
            ) : (
              <p className="text-center text-red-500">No featured products available</p>
            )}
          </div>
        </div>
  
        {/* About Us Section */}
        <div className="bg-white py-12 m-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Welcome to our store! We are passionate about providing the best
              products and services to our customers. Our mission is to deliver
              quality and satisfaction every step of the way.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              With years of experience, we strive to bring innovative solutions
              and an exceptional shopping experience to our customers worldwide.
            </p>
          </div>
        </div>
  
        {/* Contact Us Section */}
        <div className="bg-gray-100 py-16 px-4 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-800">Contact Us</h2>
              <p className="text-lg text-gray-600">
                Have questions or need assistance? Get in touch with us, and we
                will be happy to help!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 10.588l7.997-4.704A2.001 2.001 0 0015.999 3H4.001a2 2 0 00-1.998 2.884zM18 8.412l-8 4.705-8-4.705V14a2 2 0 002 2h12a2 2 0 002-2V8.412z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">
                    justinnjoroge426@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.172 5.414l-1.414 1.414L7.586 15 14 8.586l-1.414-1.414L7.586 12.586 5.172 10.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">0728 038 778</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11.93V14h-2v-2.07a1 1 0 01.293-.707L10 9.586l.707.707A1 1 0 0111 10.93zM9 4h2v4H9V4z" />
                    </svg>
                  </div>
                  <span className="text-lg text-gray-700">Nairobi, Kenya</span>
                </div>
              </div>
            </div>
  
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Your Message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
  
        {/* Social Links Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-gray-800">Follow Us</h2>
            <p className="text-lg text-gray-600">
              Stay connected with us on social media for updates!
            </p>
            <div className="flex justify-center space-x-6">
              {/* Facebook Link */}
              <a
                href="https://facebook.com"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3 3-3 .9 0 1.9.2 1.9.2v2h-1.1c-1 0-1.3.6-1.3 1.3V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              {/* Twitter Link */}
              <a
                href="https://twitter.com"
                className="p-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.707 3.293a1 1 0 00-1.414 0L12 11.586 3.707 3.293a1 1 0 10-1.414 1.414L10.586 13l-8.293 8.293a1 1 0 101.414 1.414L12 14.414l8.293 8.293a1 1 0 001.414-1.414L13.414 13l8.293-8.293a1 1 0 000-1.414z" />
                </svg>
              </a>
              {/* Instagram Link */}
              <a
                href="https://instagram.com"
                className="p-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full hover:opacity-90 transition"
                aria-label="Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5A4.25 4.25 0 0020.5 16.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 1.5a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zm5.75-.75a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
