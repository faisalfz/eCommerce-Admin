"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";

const NewProduct = () => {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setPrice("");

    try {
      const response = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          title: title,
          description: description,
          price: price,
        }),
      });
    } catch (error) {}
  };

  return (
    <>
      <h1>New Product</h1>
      <div className="mt-4">
        <form
          onSubmit={(e) => createProduct(e)}
          method="post"
          className="flex flex-col gap-0.5 sm:w-2/3"
        >
          <label>Product name</label>
          <input
            type="text"
            placeholder="Product name"
            name="product-name"
            id="product-name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Price ($)</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit" className="btn-primary">
            Save
          </button>
        </form>

      </div>
    </>
  );
};

export default NewProduct;
