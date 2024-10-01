import React, { useEffect, useState } from "react";
import ProductDisplayCard from "../Cards/ProductDisplayCard";

function NewProducts() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetch("/api/v1/products", {
          method: "GET",
        }).then((res) => res.json());
        if (data.success) {
          setProducts(data.data?.products);
          console.log(products);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);
  return (
    <div className="mt-8">
      <section
        id="new--products--header"
        className="bg-slate-300 md:mx-4 dark:bg-gray-700 py-4 sm:rounded-lg"
      >
        <div className="h-10 text-center font-medium text-3xl">
          <h1>New Product</h1>
        </div>
      </section>
      <div className="grid justify-items-center w-screen px-4 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 sm:gap-2 md:gap-6">
        {!loading &&
          products?.map((product) => (
            <div key={product._id} className="">
              <ProductDisplayCard product={product} />
            </div>
          ))}
        {loading && <div>loading</div>}
      </div>
    </div>
  );
}

export default NewProducts;
