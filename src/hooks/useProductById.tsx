import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useProducts } from "./useProducts";
import type { Product } from "../types/Products";

export const useProductById = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { getProductById } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isInvalidId = !id || Number.isNaN(productId);

  useEffect(() => {
    if (isInvalidId) {
      setLoading(false);
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(productId);

        setProduct(data);
      } catch (error) {
        setProduct(null);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [getProductById, productId, isInvalidId]);

  return {
    id,
    productId,
    product,
    loading,
    error,
    isInvalidId,
    isNotFound: !loading && !error && !product,
  };
};
