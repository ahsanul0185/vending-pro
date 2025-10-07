import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_API } from "../functions/Variables";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { productId } = useParams();

  // Fetch categories to display category and subcategory names
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${BACKEND_API}/categories-with-subcategories`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BACKEND_API}/products/${productId}`);
        
        if (!res.ok) {
          throw new Error('Product not found');
        }
        
        const data = await res.json();
        
        // Transform data to ensure correct field names and types
        const transformedProduct = {
          ...data,
          price: parseFloat(data.price),
          image_url: data.image || data.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
          stock_quantity: data.stock,
          is_active: data.status === 'active',
        };
        
        setProduct(transformedProduct);
      } catch (err) {
        setError("Failed to load product.");
        console.error("Error loading product:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // Helper functions to get names from IDs
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || product?.category || '-';
  };

  const getSubcategoryName = (subcategoryId) => {
    if (!subcategoryId) return '-';
    
    for (const cat of categories) {
      const sub = cat.subcategories?.find(s => s.id === subcategoryId);
      if (sub) return sub.name;
    }
    return '-';
  };

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
    <div className="mx-auto p-6 my-20 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Product Image */}
        <div className="lg:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-square">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Category:</span>
              <span className="text-gray-900">{getCategoryName(product.category_id)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Subcategory:</span>
              <span className="text-gray-900">{getSubcategoryName(product.subcategory_id)}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Weight:</span>
              <span className="text-gray-900">{product.weight || '-'}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="font-semibold text-gray-700">Stock:</span>
              <span className={`font-semibold ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock_quantity} units {product.is_active ? '(Available)' : '(Unavailable)'}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description || 'No description available.'}
            </p>
          </div>

          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specifications.dimensions && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Dimensions</span>
                    <span className="text-gray-900 font-semibold">{product.specifications.dimensions}</span>
                  </div>
                )}
                {product.specifications.capacity && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Capacity</span>
                    <span className="text-gray-900 font-semibold">{product.specifications.capacity}</span>
                  </div>
                )}
                {product.specifications.power_consumption && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Power Consumption</span>
                    <span className="text-gray-900 font-semibold">{product.specifications.power_consumption}</span>
                  </div>
                )}
                {product.specifications.weight && (
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500">Weight</span>
                    <span className="text-gray-900 font-semibold">{product.specifications.weight}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => window.location.href = `${BACKEND_API}/Checkout?productId=${productId}`}
              disabled={!product.is_active || product.stock_quantity === 0}
              className={`flex-1 py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 ${
                product.is_active && product.stock_quantity > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.is_active && product.stock_quantity > 0 ? 'Buy Now' : 'Out of Stock'}
            </button>
          </div>

          {!product.is_active && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                ⚠️ This product is currently unavailable.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;