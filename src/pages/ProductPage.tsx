import type { Product } from "../types/Products";
import SearchProductForm from "../components/SearchProductForm";
import ProductList from "../components/ProductList";
import ProductSummary from "../components/ProductSummary";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";

const ProductPage = () => {
  //custom hook Auth
  const { isAdmin, toggleAdmin } = useAuth();

  //custom hook Product + local storage inside
  const { products, deleteProduct, toggleStock } = useProducts();

  //custom hook useProductFilter
  const {
    keyword,
    selectedCategory,
    filteredProducts,
    setSearchFilters,
    clearSearchFilters,
  } = useProductFilters(products);

  const handleSearchProduct = (keyword: string, category: string) => {
    setSearchFilters(keyword, category);
  };

  const totalFilteredProducts = filteredProducts.length;
  const totalProducts = products.length;
  const totalInStock = products.filter((p: Product) => p.inStock).length;
  const totalOutOfStock = products.filter((p: Product) => !p.inStock).length;

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <h1
          style={{
            color: "#333",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Product list
        </h1>
        <button
          style={{
            padding: "10px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onClick={() => toggleAdmin()}
        >
          {isAdmin ? "Switch to User" : "Switch to Admin"}
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "start",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <SearchProductForm
            initialKeyword={keyword}
            initialCategory={selectedCategory}
            onSearch={handleSearchProduct}
            onClear={clearSearchFilters}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <ProductList
              products={filteredProducts}
              onDelete={deleteProduct}
              onToggleStock={toggleStock}
            />
            <ProductSummary
              totalProducts={totalProducts}
              totalFilteredProducts={totalFilteredProducts}
              totalInStock={totalInStock}
              totalOutOfStock={totalOutOfStock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
