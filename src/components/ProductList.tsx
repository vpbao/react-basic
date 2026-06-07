import React from "react";
import type { Product } from "../types/Products";
import ProductCard from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

const ProductList = React.memo(
  ({ products }: ProductListProps) => {
    return (
      <div>
        {products.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              overflowY: "auto",
              maxHeight: "calc(100vh - 40px)",
            }}
          >
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

export default ProductList;
