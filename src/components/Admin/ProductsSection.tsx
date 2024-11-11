"use client";
import { baseUrl } from "@/api/baseUrl";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Product {
  _id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
  category: string;
}

const fetchProducts = async (category?: string) => {
  const url = category
    ? `${baseUrl}/api/products/category/${category}`
    : `${baseUrl}/api/products`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
};

const addProduct = async (product: Product) => {
  console.log("Product data to send:", product);
  const response = await fetch(`${baseUrl}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};

const ProductsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: "",
    name: "",
    price: "",
    description: "",
    images: [],
    sizes: [],
    category: "",
  });

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.category) {
      alert("Please select a category for the product.");
      return;
    }
    try {
      const addedProduct = await addProduct(newProduct);
      setProducts([...products, addedProduct]);
      setShowModal(false);
      setNewProduct({
        _id: "",
        name: "",
        price: "",
        description: "",
        images: [],
        sizes: [],
        category: "",
      });
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      console.log("Product deleted successfully");
      setProducts(products.filter((item) => item._id !== productId))
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleDeleteProduct = (productId: string | undefined) => {
    console.log("Attempting to delete product with ID:", productId);
    if (productId) {
        deleteProduct(productId);
    } else {
        console.error("Product ID is undefined. Cannot proceed with deletion.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...base64Images],
      }));
    });
  };

  const handleRemoveImage = (index: number) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index),
    }));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = e.target.value;
    if (!newProduct.sizes.includes(selectedSize)) {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        sizes: [...prevProduct.sizes, selectedSize],
      }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      category: e.target.value,
    }));
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(
          selectedCategory || undefined
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  return (
    <div className="p-4 sm:p-0">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button
        className="mb-4 py-2 px-4 bg-secondary text-white rounded flex items-center"
        onClick={() => setShowModal(true)}
      >
        <AiOutlinePlus className="mr-2" /> Add New Product
      </button>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded shadow-md">
          <thead>
            <tr>
              <th className="p-2 border-b sm:hidden">ID</th>
              <th className="p-2 border-b">Name</th>
              <th className="p-2 border-b">Price</th>
              <th className="p-2 border-b">Sizes</th>
              <th className="p-2 border-b">Category</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-2 border-b sm:hidden">{product._id}</td>
                <td className="p-2 border-b sm:text-xs">{product.name}</td>
                <td className="p-2 border-b sm:text-xs">{product.price}</td>
                <td className="p-2 border-b sm:text-xs">
                  {product.sizes?.join(", ") || "N/A"}
                </td>
                <td className="p-2 border-b sm:text-xs">{product.category}</td>
                <td className="p-2 border-b sm:text-xs sm:flex sm:flex-col">
                  <button className="text-secondary hover:underline">Edit</button>
                  <button
                    className="text-danger hover:underline ml-4"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-[5rem]">
          <div className="bg-white rounded-lg overflow-hidden w-1/2 sm:w-96">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-light-black-4 hover:text-light-black-3"
              >
                &times;
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              <div className="mb-4">
                <label className="block text-black">Name</label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((prevProduct) => ({
                      ...prevProduct,
                      name: e.target.value,
                    }))
                  }
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black">Price</label>
                <input
                  type="text"
                  placeholder="Enter product price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct((prevProduct) => ({
                      ...prevProduct,
                      price: e.target.value,
                    }))
                  }
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black">Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct((prevProduct) => ({
                      ...prevProduct,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-black">Category</label>
                <select
                  value={newProduct.category || ""}
                  onChange={handleCategoryChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kid">Kid</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black">Sizes</label>
                <select
                  onChange={handleSizeChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black">Images</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  multiple
                  className="mt-1 p-2 border rounded w-full"
                />
                <div className="flex mt-2 space-x-2">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt="product"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-0 right-0 text-white bg-black rounded-full text-xs p-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddProduct}
                  className="bg-primary text-white px-6 py-2 rounded mt-4"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
