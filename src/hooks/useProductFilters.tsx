import { useMemo } from "react";
import type { Product } from "../types/Products";
import { useSearchParams } from "react-router";

export function useProductFilters(products: Product[]) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const selectedCategory = searchParams.get("category") ?? "all";

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, keyword, selectedCategory]);

  const setSearchFilters = (keyword: string, category: string) => {
    const nextParams = new URLSearchParams();

    if (keyword.trim()) {
      nextParams.set("keyword", keyword.trim());
    }

    if (category !== "all") {
      nextParams.set("category", category);
    }

    setSearchParams(nextParams);
  };

  const clearSearchFilters = () => {
    setSearchParams({});
  };

  return {
    keyword,
    selectedCategory,
    filteredProducts,
    setSearchFilters,
    clearSearchFilters,
  };
}
