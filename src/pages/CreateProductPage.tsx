import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import type { ProductFormValues } from "../types/Products";

const CreateProductPage = () => {
  const navigate = useNavigate();
  const { createProduct } = useProducts();

  const handleCreateProduct = async (values: ProductFormValues) => {
    const newProduct = await createProduct(values)

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
