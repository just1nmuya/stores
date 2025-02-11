// import Link from "next/link";
// import Container from "@/components/ui/container";
// import MainNav from "@/components/main-nav";
// import getCategories from "./actions/get-categories";
// import NavbarActions from "./navbar-actions";

// export const revalidate = 0;

// const Navbar = async () => {
//   const categories = await getCategories();
//   return (
//     <div className="border-b fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
//       <Container>
//         <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
//           <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
//             <div className="font-bold text-xl"> STORE </div>
//           </Link>
//           <MainNav data={categories} />
//           <NavbarActions />
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default Navbar;

// This file will only handle the server-side rendering part, passing props to the client component

import Link from "next/link";
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "./actions/get-categories";
import NavbarActions from "./navbar-actions";
import NavbarClient from "./navbar-client";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <div className="font-bold text-xl">STORE</div>
          </Link>

          {/* Desktop MainNav */}
          <div className="hidden md:flex flex-grow justify-center">
            <MainNav data={categories} />
          </div>

          {/* Navbar Actions (Cart, etc.) */}
          <NavbarActions />

          {/* Client-side Navbar Component */}
          <NavbarClient categories={categories} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
