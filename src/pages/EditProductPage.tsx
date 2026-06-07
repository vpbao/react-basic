import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../hooks/useProducts";
import type { Product, ProductFormValues } from "../types/Products";
import { Link } from "react-router";
import { useProductById } from "../hooks/useProductById";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { updateProduct } = useProducts();
  const { productId, product, isInvalidId, isNotFound } = useProductById();

  if (isInvalidId) {
    return (
      <div>
        <h1>Invalid product id</h1>
        <p>The product id in the URL is not valid.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  if (isNotFound || !product) {
    return (
      <div>
        <h1>Product not found</h1>
        <p>This product does not exist.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const handleEditProduct = (values: ProductFormValues) => {
    const updatedProduct: Product = {
      id: productId,
      ...values
    }

    updateProduct(updatedProduct);

    navigate(`/products/${product.id}`);
  };

  return (
    <div>
      <h2>Edit Product</h2>

      <ProductForm
        key={product.id}
        initialValues={{
          name: product.name,
          price: product.price,
          category: product.category,
          inStock: product.inStock,
          discount: product.discount,
        }}
        submitLabel="Save Changes"
        onSubmit={handleEditProduct}
      />
    </div>
  );
};

export default EditProductPage;
