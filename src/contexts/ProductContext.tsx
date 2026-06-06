import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { Product } from "../types/Products";

type ProductContextValue = {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  toggleStock: (id: number) => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

const initialProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    price: 25000000,
    category: "Phone",
    inStock: true,
    discount: 10,
  },
  {
    id: 2,
    name: "MacBook Pro",
    price: 50000000,
    category: "Laptop",
    inStock: true,
    discount: 0,
  },
];

type ProductProviderProps = {
  children: React.ReactNode;
};

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts,
  );

  const addProduct = (product: Product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id),
    );
  };

  const toggleStock = (id: number) => {
    setProducts((prevProducts: Product[]) =>
      prevProducts.map((product: Product) =>
        product.id === id ? { ...product, inStock: !product.inStock } : product,
      ),
    );
  };
  const value: ProductContextValue = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductContext;
