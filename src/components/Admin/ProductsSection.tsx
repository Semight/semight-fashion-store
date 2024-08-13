"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
  category: string;
}

const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const data = await response.json();
  return data;
};

const addProduct = async (product: Product) => {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await response.json();
};

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
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
    const addedProduct = await addProduct(newProduct);
    setProducts([...products, addedProduct]);
    setShowModal(false);
    setNewProduct({
      id: "",
      name: "",
      price: "",
      description: "",
      images: [],
      sizes: [],
      category: "",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, ...newImages],
    }));
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button
        className="mb-4 py-2 px-4 bg-secondary text-white rounded flex items-center"
        onClick={() => setShowModal(true)}
      >
        <AiOutlinePlus className="mr-2" /> Add New Product
      </button>

      <table className="w-full bg-white border rounded shadow-md">
        <thead>
          <tr>
            <th className="p-2 border-b">ID</th>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Price</th>
            <th className="p-2 border-b">Sizes</th>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-2 border-b">{product.id}</td>
              <td className="p-2 border-b">{product.name}</td>
              <td className="p-2 border-b">{product.price}</td>
              <td className="p-2 border-b">{product.sizes.join(", ")}</td>
              <td className="p-2 border-b">{product.category}</td>
              <td className="p-2 border-b">
                <button className="text-secondary hover:underline">Edit</button>
                <button className="text-danger hover:underline ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-[5rem]">
          <div className="bg-white rounded-lg overflow-hidden w-1/2">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button onClick={() => setShowModal(false)} className="text-light-black-4 hover:text-light-black-3">
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
                <label className="block text-black">Images</label>
                <input type="file" multiple onChange={handleImageChange} className="mt-1" />
                <div className="mt-3 flex space-x-2">
                  {newProduct.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-danger text-white w-4 h-4 flex justify-center items-center rounded-3xl"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-black">Sizes</label>
                <select
                  value={newProduct.sizes[0] || ""}
                  onChange={handleSizeChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black">Category</label>
                <select
                  value={newProduct.category}
                  onChange={handleCategoryChange}
                  className="mt-1 p-2 border rounded w-full"
                >
                  <option value="">Select Category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kid">Kid</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                className="px-4 py-2 bg-danger text-white rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-secondary text-white rounded"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
