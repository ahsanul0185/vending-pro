// import React, { useEffect, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { BACKEND_API } from '../functions/Variables';

// const ProductListPage = () => {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { state } = useLocation();

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState(state?.category || "");
//   const [subcategory, setSubcategory] = useState(state?.subcategory || "");
//   const [priceRange, setPriceRange] = useState([0, 10000]);

//   // Fetch categories
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const res = await fetch(`${BACKEND_API}/categories-with-subcategories`);
//         const data = await res.json();

//         setCategories(data);
//       } catch (error) {
//         console.error('Error loading categories:', error);
//       }
//     };

//     loadCategories();
//   }, []);

//   // Fetch products
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const res = await fetch(`${BACKEND_API}/products`);
//         const data = await res.json();

//         console.log(data);
        
//         // Transform data to ensure correct field names and types
//         const transformedData = data.map(product => ({
//           ...product,
//           price: parseFloat(product.price), // Convert string to number
//           image_url: product.image || product.image_url || "", // Fallback for missing images
//         }));
        
//         setProducts(transformedData);
//         setFilteredProducts(transformedData);
//       } catch (error) {
//         console.error('Error loading products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   // Filtering logic
//   useEffect(() => {
//     let result = products;

//     if (search.trim()) {
//       result = result.filter(
//         p =>
//           p.name.toLowerCase().includes(search.toLowerCase()) ||
//           (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
//       );
//     }

//     if (category) {
//       // Find the selected category object
//       const selectedCategory = categories.find(cat => cat.id === category);
//       if (selectedCategory) {
//         // Filter by category name
//         result = result.filter(p => p.category === selectedCategory.name);
//       }
//     }

//     if (subcategory) {
//       // Find subcategory name from all categories
//       let subcategoryName = '';
//       for (const cat of categories) {
//         const foundSub = cat.subcategories?.find(sub => sub.id === subcategory);
//         if (foundSub) {
//           subcategoryName = foundSub.name;
//           break;
//         }
//       }
      
//       // Filter by subcategory if found
//       if (subcategoryName) {
//         result = result.filter(p => {
//           // Check if product has subcategory_id or a subcategory field
//           return p.subcategory_id === subcategory || p.subcategory === subcategoryName;
//         });
//       }
//     }

//     result = result.filter(
//       p => p.price >= priceRange[0] && p.price <= priceRange[1]
//     );

//     setFilteredProducts(result);
//   }, [search, category, subcategory, priceRange, products, categories]);

//   // Get available subcategories for selected category
//   const availableSubcategories = category 
//     ? categories.find(cat => cat.id === category)?.subcategories || []
//     : [];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-900">Product List</h1>

//       {/* Filter Block */}
//       <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {/* Search */}
//           <input
//             type="text"
//             placeholder="🔍 Search products..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//           />

//           {/* Category */}
//           <select
//             value={category}
//             onChange={e => {
//               setCategory(e.target.value);
//               setSubcategory(""); // reset subcategory when category changes
//             }}
//             className="border border-gray-300 rounded-lg px-3 h-12 py-2 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>{cat.name}</option>
//             ))}
//           </select>

//           {/* Subcategory */}
//           <select
//             value={subcategory}
//             onChange={e => setSubcategory(e.target.value)}
//             disabled={!category || availableSubcategories.length === 0}
//             className={`border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all ${
//               !category || availableSubcategories.length === 0 ? "bg-gray-200 cursor-not-allowed" : ""
//             }`}
//           >
//             <option value="">All Subcategories</option>
//             {availableSubcategories.map((sub) => (
//               <option key={sub.id} value={sub.id}>{sub.name}</option>
//             ))}
//           </select>

//           {/* Price Range */}
//           <div className="flex items-center gap-2 h-12">
//             <input
//               type="number"
//               placeholder="Min"
//               value={priceRange[0]}
//               onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
//               className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//             />
//             <span className="text-gray-500">-</span>
//             <input
//               type="number"
//               placeholder="Max"
//               value={priceRange[1]}
//               onChange={e => setPriceRange([priceRange[0], +e.target.value])}
//               className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Results Count */}
//       {!isLoading && (
//         <p className="text-sm text-gray-600 mb-4">
//           Showing {filteredProducts.length} of {products.length} products
//         </p>
//       )}

//       {/* Product Grid */}
//       {isLoading ? (
//         <div className="flex items-center justify-center h-96">
//           <p className="text-lg font-medium text-gray-600 animate-pulse">
//             Loading products...
//           </p>
//         </div>
//       ) : filteredProducts.length === 0 ? (
//         <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-300">
//           <p className="text-xl font-medium text-gray-600 mb-2">No products found</p>
//           <p className="text-sm text-gray-500">Try adjusting your filters</p>
//         </div>
//       ) : (
//         <ProductGrid products={filteredProducts} categories={categories} />
//       )}
//     </div>
//   );
// };

// export default ProductListPage;

// const ProductGrid = ({ products, categories }) => {
//   const navigate = useNavigate();
  
//   // Helper function to get subcategory name by ID
//   const getSubcategoryName = (subcategoryId) => {
//     if (!subcategoryId) return null;
    
//     for (const cat of categories) {
//       const sub = cat.subcategories?.find(s => s.id === subcategoryId);
//       if (sub) return sub.name;
//     }
//     return null;
//   };
  
//   return (
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {products?.map((product) => {
//         const subcategoryName = getSubcategoryName(product.subcategory_id);
        
//         return (
//           <div 
//             key={product.id}
//             onClick={() => navigate(`/products/${product.id}`)} 
//             className="relative bg-white rounded-2xl border border-gray-300 p-4 transition-all hover:shadow-xl hover:border-indigo-400 flex flex-col items-start text-left cursor-pointer group"
//           >
//             {/* Subcategory Badge */}
//             {subcategoryName && (
//               <span className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-20 shadow-md">
//                 {subcategoryName}
//               </span>
//             )}

//             {/* Product Image */}
//             <div className="w-full h-48 overflow-hidden rounded-xl mb-4 bg-gray-100">
//               <img
//                 src={product.image_url}
//                 alt={product.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
//                 }}
//               />
//             </div>

//             {/* Content */}
//             <div className="flex flex-col gap-2 flex-1 w-full">
//               {/* Price */}
//               <div className="w-full">
//                 <p className="text-2xl font-bold text-indigo-600">
//                   ${product.price.toFixed(2)}
//                 </p>
//               </div>

//               {/* Title */}
//               <h3 className="text-lg font-bold text-gray-900 w-full line-clamp-2">
//                 {product.name}
//               </h3>

//               {/* Category */}
//               <span className="text-sm font-medium text-gray-600 w-full">
//                 {product.category}
//               </span>

//               {/* Description */}
//               <p className="text-sm text-gray-600 line-clamp-3 flex-1">
//                 {product.description}
//               </p>

//               {/* Stock Info */}
//               <div className="mt-2 pt-2 border-t border-gray-200">
//                 <p className="text-xs text-gray-500">
//                   Stock: <span className={product.stock > 20 ? "text-green-600" : "text-orange-600"}>
//                     {product.stock} units
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };




import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../functions/Variables';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state } = useLocation();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(state?.category || "");
  const [subcategory, setSubcategory] = useState(state?.subcategory || "");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch(`${BACKEND_API}/categories-with-subcategories`);
        const data = await res.json();
        console.log('Categories loaded:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(`${BACKEND_API}/products`);
        const data = await res.json();

        console.log('Products loaded:', data);
        
        // Transform data to ensure correct field names and types
        const transformedData = data.map(product => ({
          ...product,
          price: parseFloat(product.price) || 0, // Convert string to number
          image_url: product.image || product.image_url || 'https://via.placeholder.com/400x300?text=No+Image', // Fallback for missing images
        }));
        
        console.log('Transformed products:', transformedData);
        setProducts(transformedData);
        setFilteredProducts(transformedData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtering logic
  useEffect(() => {
    console.log('Filtering with:', { search, category, subcategory, priceRange });
    
    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Category filter
    if (category) {
      const selectedCategory = categories.find(cat => cat.id === category);
      console.log('Selected category:', selectedCategory);
      
      result = result.filter(p => {
        // Check if product has category_id matching
        if (p.category_id === category) return true;
        
        // Also check if product has category name matching (fallback for old data)
        if (selectedCategory && p.category === selectedCategory.name) return true;
        
        return false;
      });
    }

    // Subcategory filter
    if (subcategory) {
      console.log('Filtering by subcategory:', subcategory);
      
      result = result.filter(p => {
        // Direct subcategory_id match
        return p.subcategory_id === subcategory;
      });
    }

    // Price range filter
    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    console.log('Filtered products:', result);
    setFilteredProducts(result);
  }, [search, category, subcategory, priceRange, products, categories]);

  // Get available subcategories for selected category
  const availableSubcategories = category 
    ? categories.find(cat => cat.id === category)?.subcategories || []
    : [];

  // Handler to reset all filters
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setSubcategory("");
    setPriceRange([0, 10000]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Product List</h1>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Filter Block */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          />

          {/* Category */}
          <select
            value={category}
            onChange={e => {
              setCategory(e.target.value);
              setSubcategory(""); // reset subcategory when category changes
            }}
            className="border border-gray-300 rounded-lg px-3 h-12 py-2 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          {/* Subcategory */}
          <select
            value={subcategory}
            onChange={e => setSubcategory(e.target.value)}
            disabled={!category || availableSubcategories.length === 0}
            className={`border border-gray-300 rounded-lg px-3 py-2 h-12 w-full outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all ${
              !category || availableSubcategories.length === 0 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          >
            <option value="">All Subcategories</option>
            {availableSubcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2 h-12">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
              className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="border border-gray-300 rounded-lg px-3 py-2 w-1/2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(search || category || subcategory || priceRange[0] > 0 || priceRange[1] < 10000) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                Search: "{search}"
                <button onClick={() => setSearch("")} className="hover:text-indigo-900">×</button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                Category: {categories.find(c => c.id === category)?.name}
                <button onClick={() => setCategory("")} className="hover:text-indigo-900">×</button>
              </span>
            )}
            {subcategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                Subcategory: {availableSubcategories.find(s => s.id === subcategory)?.name}
                <button onClick={() => setSubcategory("")} className="hover:text-indigo-900">×</button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      {!isLoading && (
        <p className="text-sm text-gray-600 mb-4">
          Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
        </p>
      )}

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg font-medium text-gray-600 animate-pulse">
            Loading products...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg border border-gray-300">
          <p className="text-xl font-medium text-gray-600 mb-2">No products found</p>
          <p className="text-sm text-gray-500 mb-4">Try adjusting your filters</p>
          <button
            onClick={resetFilters}
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} categories={categories} />
      )}
    </div>
  );
};

export default ProductListPage;

const ProductGrid = ({ products, categories }) => {
  const navigate = useNavigate();
  
  // Helper function to get category name by ID
  const getCategoryName = (categoryId, categoryName) => {
    if (!categoryId && !categoryName) return 'Uncategorized';
    
    // If we have category_id, look it up
    if (categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      return category?.name || categoryName || 'Uncategorized';
    }
    
    // Otherwise use the category name directly
    return categoryName || 'Uncategorized';
  };
  
  // Helper function to get subcategory name by ID
  const getSubcategoryName = (subcategoryId) => {
    if (!subcategoryId) return null;
    
    for (const cat of categories) {
      const sub = cat.subcategories?.find(s => s.id === subcategoryId);
      if (sub) return sub.name;
    }
    return null;
  };
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => {
        const subcategoryName = getSubcategoryName(product.subcategory_id);
        const categoryName = getCategoryName(product.category_id, product.category);
        
        return (
          <div 
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)} 
            className="relative bg-white rounded-2xl border border-gray-300 p-4 transition-all hover:shadow-xl hover:border-indigo-400 flex flex-col items-start text-left cursor-pointer group"
          >
            {/* Subcategory Badge */}
            {subcategoryName && (
              <span className="absolute top-5 right-5 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-20 shadow-md">
                {subcategoryName}
              </span>
            )}

            {/* Product Image */}
            <div className="w-full h-48 overflow-hidden rounded-xl mb-4 bg-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 w-full">
              {/* Price */}
              <div className="w-full">
                <p className="text-2xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 w-full line-clamp-2">
                {product.name}
              </h3>

              {/* Category */}
              <span className="text-sm font-medium text-gray-600 w-full">
                {categoryName}
              </span>

              {/* Description */}
              <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                {product.description || 'No description available'}
              </p>

              {/* Stock Info */}
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Stock: <span className={product.stock > 20 ? "text-green-600" : product.stock > 0 ? "text-orange-600" : "text-red-600"}>
                    {product.stock} units
                  </span>
                  {product.stock === 0 && <span className="ml-2 text-red-600 font-semibold">Out of Stock</span>}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};