"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";

const EditProduct = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const router = useRouter();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [message, setMessage] = useState('')

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      console.log("Data: ", data);

      const productData = data.filter((item) => item._id === productId);

      console.log("Data: ", productData);

      setProduct({
        title: productData[0].title,
        description: productData[0].description,
        price: productData[0].price,
      });
    };

    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  const editProduct = async (e) => {
    e.preventDefault();

    if (!productId) return alert("Missing Product ID");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: product.title,
          description: product.description,
          price: product.price,
        }),
      });
      if (response.ok) {
        setMessage('Product Updated Successfully');
        setTimeout(() => {
          setMessage('')
        }, 1500);
        router.push("/products");
      }
    } catch (error) {
      console.log(error);
      setMessage('Sorry not Updated');
    }
  };

  return (
    <>
      <ProductForm
        type={"Update"}
        products={product}
        setProducts={setProduct}
        handleSubmit={editProduct}
        message={message}
      />
    </>
  );
};

export default EditProduct;
