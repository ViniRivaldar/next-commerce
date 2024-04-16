import { ProductType } from "@/types/ProductType";
import Products from "./components/Products";

async function getProdutcs(){
  const res = await fetch('https://fakestoreapi.com/products')

  if(!res.ok){
    throw new Error('falied to fetch data')
  }

  return res.json()
}

export default async function Home() {

  const products = await getProdutcs()

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-6">
        {
          products.map((produto:ProductType)=>(
            <Products key={produto.id} product={produto}>
              
            </Products>
          ))
        }
      </div>
    </div>
  );
}