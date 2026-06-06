import { useState } from "react";
import type { ProductFormValues } from "../types/Products";

type ProductFormProps = {
  initialValues?: ProductFormValues;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel: string;
};

const defaultValues: ProductFormValues = {
  name: "",
  price: 0,
  category: "",
  inStock: false,
  discount: 0,
};

function ProductForm({
  initialValues = defaultValues,
  onSubmit,
  submitLabel,
}: ProductFormProps) {
  const [name, setName] = useState(initialValues.name);
  const [price, setPrice] = useState(String(initialValues.price));
  const [category, setCategory] = useState(initialValues.category);
  const [inStock, setInStock] = useState(initialValues.inStock);
  const [discount, setDiscount] = useState(String(initialValues.discount));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      name,
      price: Number(price),
      category,
      inStock,
      discount: Number(discount),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          style={{ padding: "10px" }}
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Product name"
        />

        <input
          style={{ padding: "10px" }}
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Price"
        />

        <select
          name="category"
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          style={{ padding: "10px" }}
        >
          <option value="">Select category</option>
          <option value="Iphone">Iphone</option>
          <option value="Laptop">Laptop</option>
          <option value="Tablet">Tablet</option>
        </select>

        <input
          style={{ padding: "10px" }}
          type="number"
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
          placeholder="Discount"
        />

        <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={(event) => setInStock(event.target.checked)}
          />
          In stock
        </label>
      </div>

      <button
        style={{
          padding: "10px",
          margin: "10px 0",
          backgroundColor: "green",
          color: "white",
          border: "none",
        }}
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;
