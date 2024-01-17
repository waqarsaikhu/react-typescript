import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  brand: string;
  description: string;
  price: number;
  images: [];
  // Add other product properties here
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    // Replace this with the actual function to fetch products
    async function fetchProducts() {
      const response = await fetch("/.netlify/functions/getProduct");
      const data = await response.json();

      setProducts(data);
    }

    fetchProducts();
  }, []);
  if (!products) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-24 w-24"></div>
      </div>
    );
  }
  return (
    <div>
      <nav className="flex justify-between p-5 bg-blue-500 text-white">
        <div>
          <Link to="/homepage" className="mr-4">
            Home
          </Link>
          <Link to="/product">Product</Link>
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded overflow-hidden shadow-lg p-4 bg-white"
          >
            <img
              className="w-full h-64 object-cover"
              // @ts-ignore
              src={product?.images?.length > 0 ? product?.images[0] : ""}
              alt={product.brand}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{product.brand}</div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                ${product.price}
              </span>
            </div>
            <div className="px-6 pt-4">
              <Link
                to={`/product/${product.id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
