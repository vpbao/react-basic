import type { Product } from "../types/Products";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export type CreateProductInput = Omit<Product, "id">;
export type UpdateProductInput = Omit<Product, "id">;


async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Something went wrong with product API")
  }

  return response.json();
}

export const productService = {
  async getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL)

    return handleResponse<Product[]>(response)
  },

  async getProductById(id: number): Promise<Product | null> {
    const response = await fetch(`${API_URL}/${id}`)

    return handleResponse<Product>(response)
  },

  async createProduct(productData: CreateProductInput): Promise<Product> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    })

    return handleResponse<Product>(response)
  },

  async updateProduct(
    id: number,
    productData: UpdateProductInput
  ): Promise<Product | null> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      "headers": {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData)
    })

    return handleResponse<Product>(response)
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete product")
    }
  },
};
