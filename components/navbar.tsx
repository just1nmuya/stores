import { Category } from "@/types";
import Container from "@/components/ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "./actions/get-categories";
import NavbarActions from "./navbar-actions";
import NavbarClient from "./navbar-client";

export const revalidate = 0;

const Navbar = async () => {
  // Explicitly type categories as Category[]
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Fallback to an empty array
    categories = [];
  }

  return (
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          {/* Desktop MainNav */}
          <div className="hidden md:flex flex-grow justify-center">
            <MainNav data={categories} />
          </div>
          {/* Navbar Actions */}
          <NavbarActions />
          {/* Client-side Navbar Component */}
          <NavbarClient categories={categories} />
        </div>
      </Container>
  );
};

export default Navbar;
