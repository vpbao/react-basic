import { createContext, useCallback, useEffect, useState } from "react";
import type { Product } from "../types/Products";
import { productService, type CreateProductInput, type UpdateProductInput } from "../services/productService";

type ProductContextValue = {
  products: Product[];
  getProductById: (id: number) => Promise<Product | null>;
  createProduct: (productData: Omit<Product, "id">) => Promise<Product>;
  updateProduct: (
    id: number,
    productData: Omit<Product, "id">
  ) => Promise<Product | null>
  deleteProduct: (id: number) => Promise<boolean>;
  isLoading: boolean
  error: string | null
};

const ProductContext = createContext<ProductContextValue | null>(null);

type ProductProviderProps = {
  children: React.ReactNode;
};

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const products = await productService.getProducts();

      setProducts(products);
    } catch {
      setError("Failed to load products.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const getProductById = useCallback(async (id: number) => {
    return await productService.getProductById(id);
  }, [])

  const createProduct = useCallback(async (productData: CreateProductInput) => {
    const newProduct = await productService.createProduct(productData)
    setProducts((currentProducts) => {
      return [...currentProducts, newProduct]
    })

    return newProduct;
  }, [])

  const updateProduct = useCallback(
    async (id: number, productData: UpdateProductInput) => {
      const updatedProduct = await productService.updateProduct(id, productData);

      if (!updatedProduct) {
        return null;
      }

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );

      return updatedProduct;
    },
    []
  );

  const deleteProduct = async (id: number) => {
    await productService.deleteProduct(id);

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const value: ProductContextValue = {
    products,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    error,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductContext;
