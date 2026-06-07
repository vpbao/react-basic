import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import type { Product, ProductFormValues } from "../types/Products";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { products, addProduct } = useProducts();

  const handleCreateProduct = (values: ProductFormValues) => {
    const newProduct: Product = {
      id: products.length + 1,
      ...values
    }

    addProduct(newProduct)

    navigate(`/products/${newProduct.id}`);
  };

  return (
    <div>
      <h2>Create Product</h2>

      <ProductForm
        submitLabel="Create Product"
        onSubmit={handleCreateProduct}
      />
    </div>
  );
};

export default CreateProductPage;
