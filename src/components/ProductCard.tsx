import React from "react";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Products";

const ProductCard = React.memo(
  ({
    id,
    name,
    price,
    category,
    inStock,
    discount,
  }: Product) => {
    const { deleteProduct } = useProducts();

    const handleDelete = (id: number) => {
      deleteProduct(id)
    }

    return (
      <div>
        <div
          style={{
            padding: "10px",
            margin: "10px 0",
            backgroundColor: "",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "start",
            alignItems: "start",
            border: "1px solid #ccc",
          }}
        >
          <h2>Name: {name}</h2>
          <p>Price: {price.toLocaleString()}</p>
          <p>Category: {category}</p>
          <p>{inStock && "In Stock"}</p>
          <p>{discount > 0 && `Discount: ${discount}%`}</p>
          <div
            style={{
              display: "flex",
              flex: "1",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button
              style={{
                width: "100%",
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px",
              }}
            >
              <Link
                to={`/products/${id}`}
                style={{ color: "white", textDecoration: "none" }}
              >
                Go to detail
              </Link>
            </button>
            <button
              style={{
                width: "100%",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px",
              }}
              onClick={() => handleDelete(Number(id))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  },
);

export default ProductCard;
