import React from "react";

type ProductSummaryProps = {
  totalProducts: number;
  totalFilteredProducts: number;
  totalInStock: number;
  totalOutOfStock: number;
};

const ProductSummary = React.memo(
  ({
    totalProducts,
    totalFilteredProducts,
    totalInStock,
    totalOutOfStock,
  }: ProductSummaryProps) => {
    return (
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Total Products: {totalProducts}</p>
        <p>Showing: {totalFilteredProducts}</p>
        <p>In Stock: {totalInStock}</p>
        <p>Out of Stock: {totalOutOfStock}</p>
      </div>
    );
  },
);

export default ProductSummary;
