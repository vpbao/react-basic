import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useProductById } from "../hooks/useProductById";
import { useProducts } from "../hooks/useProducts";

function ProductDetailPage() {
  const { deleteProduct } = useProducts();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const product = useProductById();

  if (!product) {
    return (
      <div>
        <h2>Product not found</h2>
        <p>This product may have been deleted or does not exist.</p>
        <Link to="/products">Back to products</Link>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteProduct(product.id);
    navigate("/products", { replace: true });
  };

  return (
    <div>
      <h1>{product.name}</h1>

      <p>Price: {Number(product.price).toLocaleString()} VND</p>
      <p>Category: {product.category}</p>
      <p>Status: {product.inStock ? "In stock" : "Out of stock"}</p>

      <div>
        <Link to="/products">Back to products</Link>
      </div>

      {isAdmin && (
        <div>
          <Link to={`/products/${product.id}/edit`}>Edit</Link>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;
