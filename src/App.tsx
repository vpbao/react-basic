import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsLayout from "./layouts/ProductsLayout";
import EditProductPage from "./pages/EditProductPage";
import AdminRoute from "./routes/AdminRoute";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductPage />}></Route>
          <Route
            path="create"
            element={
              <AdminRoute>
                <CreateProductPage />
              </AdminRoute>
            }
          />
          <Route path=":id" element={<ProductDetailPage />} />
          <Route
            path=":id/edit"
            element={
              <AdminRoute>
                <EditProductPage />
              </AdminRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
