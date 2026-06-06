import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const MainLayout = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/products");
  };

  return (
    <div>
      <header>
        <h1>Product Management</h1>

        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>

          {" | "}

          <NavLink to="/products">Products</NavLink>

          {" | "}

          {isAdmin && <NavLink to="/products/create">Create product</NavLink>}

          {isAdmin && (" | ")}

          {isAdmin ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </header>

      <hr />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
