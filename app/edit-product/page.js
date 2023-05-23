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
    image: "",
  });
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();
      // console.log("Data: ", data);

      const productData = data.filter((item) => item._id === productId);
      const [currentProduct] = productData;

      setImageUrl(currentProduct.image);

      setProduct({
        title: currentProduct.title,
        description: currentProduct.description,
        price: currentProduct.price,
        image: currentProduct.image,
      });

    };

    if (productId) {
      getProductDetails();
    }
  }, [productId]);

  const editProduct = async (e) => {
    e.preventDefault();
  
    let updatedData = {
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
    };
  
    if (imageFile.size) {
      // Upload Product Image to Cloudinary
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "ecommerce");
  
      try {
        const imgResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dswzjjbvf/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
  
        const data = await imgResponse.json();
        console.log("Updated Image Data Faisal: ", data.secure_url);
        const updatedImage = data.secure_url;
  
        updatedData.image = updatedImage;
      } catch (error) {
        console.log(error);
        setMessage("Sorry not Updated");
        return;
      }
    }
  
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        setMessage("Product Updated Successfully");
        setTimeout(() => {
          setMessage("");
          router.push("/products");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setMessage("Sorry not Updated");
    }
  };
  

  return (
    <>
      <ProductForm
        type={"Update"}
        product={product}
        setProduct={setProduct}
        handleSubmit={editProduct}
        setImageFile={setImageFile}
        message={message}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
    </>
  );
};

export default EditProduct;
