import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  brand: string;
  title: string;
  description: string;
  price: number;
  images: [];
  category: string;
  rating: number;
  stock: number;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/.netlify/functions/getProduct/${id}`);
      const data = await response.json();
      console.log(data);
      // @ts-ignore
      setProduct(data[id - 1]);
    }

    fetchProduct();
  }, [id]);
  console.log(product);
  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid h-24 w-24"></div>
      </div>
    );
  }

  return (
    <>
      <nav className="flex justify-between p-5 bg-blue-500 text-white">
        <div>
          <Link to="/homepage" className="mr-4">
            Home
          </Link>
          <Link to="/product">Product</Link>
        </div>
      </nav>
      <span className="inline-block text-black px-2 py-1 rounded">
        <Link to="/product">Back</Link>
      </span>

      <div className="rounded flex justify-center items-center overflow-hidden shadow-lg p-4 bg-white">
        <img
          className="w-64 h-64 "
          // @ts-ignore
          src={product?.images?.length > 0 ? product?.images[0] : ""}
          alt={product.brand}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{product.title}</div>
          <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
          <p className="text-gray-700 text-base">{product.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            ${product.price}
          </span>
          <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {product.category}
          </span>
          <span className="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {product.rating} ⭐
          </span>
          <span className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {product.stock} in stock
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
