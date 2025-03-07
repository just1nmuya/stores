import { Category } from "@/types";
import Container from "@/components/ui/container";

import getCategories from "./actions/get-categories";

import NavbarClient from "./navbar-client";

export const revalidate = 0;

const Navbar = async () => {
  
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
    
  }

  return (
    <Container>
      {/* Only render NavbarClient here */}
      <NavbarClient categories={categories} />
    </Container>
  );
};

export default Navbar;
