import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useContext must be used within an ProductProvider");
  }

  return context;
};
