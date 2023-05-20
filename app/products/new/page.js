"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ProductForm from "@/components/ProductForm";

const NewProduct = () => {
  const { data: session } = useSession();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  const [products, setProducts] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [message, setMessage] = useState('')

  const createProduct = async (e) => {
    e.preventDefault();
    setProducts({
      title: "",
      description: "",
      price: '',
    });

    try {
      const response = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify({
          title: products.title,
          description: products.description,
          price: products.price,
        }),
      });
      
      setMessage('Product Added Successfully');
    } catch (error) {
      console.log(error)
      setMessage('Sorry, Product not added');
    }
  };

  return (
    <>
      <ProductForm
        type={"Add"}
        products= {products}
        setProducts={setProducts}
        handleSubmit= {createProduct}
        message = {message}
      />
    </>
  );
};

export default NewProduct;
