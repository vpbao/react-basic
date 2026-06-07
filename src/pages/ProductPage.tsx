import type { Product } from "../types/Products";
import SearchProductForm from "../components/SearchProductForm";
import ProductList from "../components/ProductList";
import ProductSummary from "../components/ProductSummary";
import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import LoadingMessage from "../components/ui/LoadingMessage";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";

const ProductPage = () => {
  const { products, isLoading, error } = useProducts();

  //custom hook useProductFilter
  const {
    keyword,
    selectedCategory,
    filteredProducts,
    setSearchFilters,
    clearSearchFilters,
  } = useProductFilters(products);

  //custom hook Product + local storage inside
  const hasProduct = products.length > 0;
  const hasFilteredProducts = filteredProducts.length > 0;
  const isSearchEmpty = !hasProduct && !hasFilteredProducts;

  if (isLoading) {
    return <LoadingMessage message="Loading products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!hasProduct) {
    return (
      <EmptyState
        title="No products yet"
        description="Create your first product to start managing your product list."
        actionLabel="Create product"
        actionTo="/products/create"
      />
    );
  }

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
            {isSearchEmpty ? (
              <EmptyState
                title="No products match your search"
                description="Try changing your keyword or category."
              />
            ) : (
              <>
                <ProductList products={filteredProducts} />

                <ProductSummary
                  totalProducts={totalProducts}
                  totalFilteredProducts={totalFilteredProducts}
                  totalInStock={totalInStock}
                  totalOutOfStock={totalOutOfStock}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
