"use client";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
  category: string; // New property for category
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
    category: "", // Initialize category
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
      category: "", // Reset category
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
    <div className="no-underline">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button
        className="mb-4 py-2 px-4 bg-[#E5B80D] text-white rounded flex items-center"
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
                <button className="text-blue">Edit</button>
                <button className="text-danger ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    name: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    price: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter product description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct((prevProduct) => ({
                    ...prevProduct,
                    description: e.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group controlId="formProductImages">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageChange} />
              <div className="mt-3">
                {newProduct.images.map((image, index) => (
                  <div key={index} className="d-inline-block mr-2">
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mt-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="formProductSizes">
              <Form.Label>Sizes</Form.Label>
              <select
                value={newProduct.sizes[0] || ""}
                onChange={handleSizeChange}
                className="form-control"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <select
                value={newProduct.category}
                onChange={handleCategoryChange}
                className="form-control"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kid">Kid</option>
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsSection;
