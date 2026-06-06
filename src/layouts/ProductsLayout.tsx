import { Link, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProductsLayout = () => {
  const { isAdmin } = useAuth();

  return (
    <section>
      <div>
        <h1>Products</h1>

        <nav>
          <Link to="/products">Product list</Link>{" "}
          {isAdmin && <Link to="/products/create">Create product</Link>}
        </nav>
      </div>

      <hr />

      <Outlet />
    </section>
  );
};

export default ProductsLayout;
