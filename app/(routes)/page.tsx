import getBillboard from "@/components/actions/get-billboards";
import getProducts from "@/components/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const product = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("f8bf9bfc-4a85-4399-babb-2164251c3021");
  return (
    <div>
      <Container>
        <div className="space-y-10 pb-10">
          <Billboard data={billboard} />

          <div className="flex flex-col gap-y-8 px-4 lg:px-8">
            <ProductList title="Featured Items" items={product} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
