import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialState = {
  name: "",
  description: "",
  price: "",
  stock: "",
  categoryName: "",
  categoryType: "",
  size: "",
  image: null,
};

function AddProduct() {
  const [formData, setFormData] = useState(initialState);
  const { currentUser, accessToken } = useSelector((state) => state.user);
  const [categories, setCategories] = useState();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetch("/api/v1/categories", {
          method: "GET",
        }).then((res) => res.json());

        if (data.success) {
          setCategories(data.data?.categories);
          // console.log(categories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, [currentUser, accessToken]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type == "file" ? files[0] : value,
    }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("stock", formData.stock);
    form.append("categoryName", formData.categoryName);
    form.append("categoryType", formData.categoryType);
    form.append("size", JSON.stringify(formData.size));
    form.append("image", formData.image);

    try {
      console.log(formData);

      const addProduct = async () => {
        const data = await fetch("/api/v1/products/add", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }).then((res) => res.json());
        console.log(data);

        if (data.success) {
          alert("Product is successfully added.");
          setFormData(initialState);
        } else {
          throw new Error(data.message || "failed to add product");
        }
      };
      addProduct();
    } catch (error) {
      console.log("Error while adding product", error);
      alert("Failed to add product:", error.message);
    }

    // setFormData(initialState);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Name
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.name}
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Description
          </label>
          <textarea
            onChange={handleChange}
            value={formData.description}
            id="description"
            name="description"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product description"
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Image
          </label>
          <input
            required
            onChange={handleChange}
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="file:rounded-s-md pl-4 w-full border-2 border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Price
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.price}
            id="price"
            name="price"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product price"
          />
        </div>

        {/* Product Stock */}
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Stock
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.stock}
            id="stock"
            name="stock"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product stock"
          />
        </div>

        {/* Product Category Name */}
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Category Name
          </label>
          {/* <select */}
          <input
            required
            onChange={handleChange}
            value={formData.categoryName}
            id="categoryName"
            name="categoryName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter category name"
          />
        </div>

        {/* Product Category Type */}
        <div className="mb-4">
          <label
            htmlFor="categoryType"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Category Type
          </label>
          <input
            required
            onChange={handleChange}
            value={formData.categoryType}
            id="categoryType"
            name="categoryType"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter category type"
          />
        </div>

        {/* Product Size */}
        <div className="mb-6">
          <label
            htmlFor="size"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-2"
          >
            Product Size
          </label>
          <input
            onChange={handleChange}
            value={formData.size}
            id="size"
            name="size"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter product size"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 mt-4 min-w-52 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
