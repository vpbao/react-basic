import { useParams } from "react-router";
import { useProducts } from "./useProducts";
import type { Product } from "../types/Products";

export const useProductById = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { products } = useProducts();
  const product = products.find((product: Product) => product.id === productId);

  return {
    id,
    productId,
    product,
    isInvalidId: !id || Number.isNaN(productId),
    isNotFound: !product,
  };
};
