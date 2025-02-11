// import { Category } from "@/types";

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// const getCategories = async (): Promise<Category[]> => {
//   const res = await fetch(URL);

//   return res.json();
// };

// export default getCategories;

import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(URL);

  if (!res.ok) {
    // Read the response text to get the error message (e.g., "Internal error")
    const errorText = await res.text();
    throw new Error(`Failed to fetch categories: ${errorText}`);
  }

  try {
    return await res.json();
  } catch (err) {
    throw new Error(`Invalid JSON response: ${err}`);
  }
};

export default getCategories;
