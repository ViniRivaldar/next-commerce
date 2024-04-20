import Products from "./components/Products";
import { FetchProdutcs } from "./actions";
import InfinitScroll from "./components/InfinitScroll";



export default async function Home() {

  const {formatedProducts} = await FetchProdutcs({lastProductId:undefined})

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-6">
        <InfinitScroll initialProducts={formatedProducts}/>
      </div>
    </div>
  );
}
