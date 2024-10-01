import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Admin/ProductTable";
import { useSelector } from "react-redux";

function ProductsList() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await fetch("/api/v1/products", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
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
  }, [user, accessToken]);

  return <ProductTable loading={loading} products={products} />;
}

export default ProductsList;
