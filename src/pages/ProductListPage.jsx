import React, { useEffect, useState } from 'react'
import { Product } from '../../base44';
import { useLocation, useNavigate } from 'react-router-dom';

// category → types mapping
const categoryTypeMap = {
  "Ambient Vending Machines": [
    "Food & Snacks",
    "Beverages",
    "Non-Food Items",
    "Specialty",
  ],
  "Chilled Machines": [
    "Cold Beverages",
    "Perishable Foods",
    "Chilled Desserts",
    "Health & Lifestyle",
  ],
  "Hot & Cold Machines": [
    "Hot Beverages",
    "Hot Foods",
  ],
};

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    const { state } = useLocation();

    console.log(state)

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(state?.category || "");
  const [type, setType] = useState(state?.type || "");
  const [priceRange, setPriceRange] = useState([0, 10000]); // [min, max]



  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await Product.list('-created_date');
        setProducts(data);
        setFilteredProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // filtering logic
  useEffect(() => {
    let result = products;

    if (search.trim()) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    if (type) {
      result = result.filter(p => p.type === type);
    }

    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [search, category, type, priceRange, products]);

  // available types for selected category
  const availableTypes = category ? categoryTypeMap[category] || [] : [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Filter Block */}
      <div className="border border-gray-300 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-gray-500"
        />

        {/* Category */}
        <select
          value={category}
          onChange={e => {
            setCategory(e.target.value);
            setType(""); // reset type when category changes
          }}
          className="border border-gray-300 rounded-lg px-3 h-12 py-2 w-full outline-none focus:border-gray-500"
        >
          <option value="">All Categories</option>
          {Object.keys(categoryTypeMap).map((c, idx) => (
            <option key={idx} value={c}>{c}</option>
          ))}
        </select>

        {/* Type */}
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          disabled={!category}
          className={`border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-gray-500 ${
            !category ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        >
          <option value="">All Types</option>
          {availableTypes.map((t, idx) => (
            <option key={idx} value={t}>{t}</option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex items-center gap-2 h-12">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-gray-500"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-gray-500"
          />
        </div>
      </div>



      {/* Product Grid */}
      {isLoading ? (
              <div className="flex items-center justify-center h-96">
        <p className="text-lg font-medium text-gray-600 animate-pulse">
          Loading products...
        </p>
      </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default ProductListPage;


const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 my-12">
      {products?.map((product) => (
<div onClick={() => navigate(`/products/${product.id}`)} className="relative bg-white rounded-2xl border border-gray-300 p-3 transition-shadow flex flex-col items-start text-left cursor-pointer">
  {/* Type Badge */}
{product.type &&   <span className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-20">
    {product.type}
  </span>}

  {/* Product Image */}
  <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
    <img
      src={product.image_url}
      alt={product.name}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
    />
  </div>

  {/* Content */}
  <div className="flex flex-col p-1 gap-2 flex-1 w-full">
      {/* Price */}
  <div className="w-full">
    <p className="text-lg font-semibold text-gray-900">
      ${product.price}
    </p>
  </div>

    {/* Title */}
    <h3  className="text-lg font-bold text-gray-900 w-full">{product.name}</h3>

    {/* Category */}
    <span className="text-sm font-medium text-gray-600 w-full">
      {product.category}
    </span>

    {/* Description */}
    <p className="text-sm text-gray-600 line-clamp-3">
      {product.description}
    </p>
  </div>


</div>


      ))}
    </div>
  );
};
