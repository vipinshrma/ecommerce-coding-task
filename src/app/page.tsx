import ProductsLists from "@/components/products-list";
import { getProducts, searchProducts } from "@/server/products";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Await searchParams since it's a Promise in Next.js 15
  const { search = '' } = await searchParams;
  
  // Fetch products based on search term
  let products;
  try {
    products = search ? await searchProducts(search) : await getProducts({ search });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Handle error appropriately, perhaps return an error component
    throw error;
  }

  return (
    <ProductsLists
      products={products}
    />
  );
}