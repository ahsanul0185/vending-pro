// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { Product } from '../../base44';

// const ProductDetails = () => {

// const [product, setProduct] = useState({})

//     const {productId} = useParams();

//     useEffect(() => {
//   const loadProduct = async () => {
//     try {
//       const product = await Product.get(productId);
//       console.log(product);
//       setProduct(product); // assuming you use a `product` state
//     } catch (error) {
//       console.error("Error loading product:", error);
//     }
//   };

//   loadProduct();
// }, []);

//   return (
//     <div>ProductDetails</div>
//   )
// }

// export default ProductDetails

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../base44";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await Product.get(productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product.");
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg font-medium text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 my-20">
      <div className="flex flex-col md:flex-row" style={{ gap: "30px" }}>
        {/* Left: Product Image */}
        <div className="md:w-1/2 h-80 md:h-auto overflow-hidden shadow-md">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold text-gray-900 w-full">
            {product.name}
          </h1>

          <div className="space-y-2 text-gray-700 w-full">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {product.type || "-"}
            </p>
            <p>
              <span className="font-semibold">Price:</span> $
              {product.price.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {product.stock_quantity}{" "}
              {product.is_active ? "(Available)" : "(Unavailable)"}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.specifications && (
            <div className="mt-4 w-full">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                <div>
                  <span className="font-medium">Dimensions:</span>{" "}
                  {product.specifications.dimensions}
                </div>
                <div>
                  <span className="font-medium">Capacity:</span>{" "}
                  {product.specifications.capacity}
                </div>
                <div>
                  <span className="font-medium">Power Consumption:</span>{" "}
                  {product.specifications.power_consumption}
                </div>
                <div>
                  <span className="font-medium">Weight:</span>{" "}
                  {product.specifications.weight}
                </div>
              </div>
            </div>
          )}

          <div className="w-full">
            <button className="bg-indigo-600 curpo mt-8  text-white font-semibold px-8 py-2 rounded-lg  hover:bg-indigo-700 transition-colors duration-200">
            Buy
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
