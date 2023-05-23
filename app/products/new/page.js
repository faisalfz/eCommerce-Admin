"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ProductForm from "@/components/ProductForm";
import {useRouter} from 'next/navigation'
import { image } from "@cloudinary/url-gen/qualifiers/source";

const NewProduct = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: '',
  });
  // const [image, setImage] = useState("");
  const [message, setMessage] = useState('')

  // const [imageLocal, setImageLocal] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [cloudImage, setCloudImage] = useState(null)
  //const [ImageInput, setImageInput] = useState(null);
  // const [imageurl, setImageUrl] = useState("");

  // const createProduct = async (e) => {
  //   e.preventDefault();

  //   // Upload Product Image to Cloudinary
  // // const formData = new FormData();
  // // formData.append("file", imageFile);
  // // formData.append("upload_preset", "ecommerce");

  // await fetch("https://api.cloudinary.com/v1_1/dswzjjbvf/image/upload", {
  //   method: "post",
  //   body: cloudImage,
  // })
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     // Access the URL from the response data and set it in the state
  //     setProducts({ ...products, image: data.secure_url })
  //     console.log('Products Data: ', products)
  //   })
  //   .catch((err) => console.log(err));

  //   // Upload Product Info to Database (MongoDB)
  //   try {
  //     const response = await fetch("/api/products/new", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: products.title,
  //         description: products.description,
  //         price: products.price,
  //         image: products.image,
  //       }),
  //     });

  //     console.log("Response: ", response.json())
      
  //     setMessage('Product Added Successfully');
  //     setProducts({
  //       title: "",
  //       description: "",
  //       price: '',
  //       image: '',
  //     });
  //     // router.push('/products')
  //   } catch (error) {
  //     console.log(error)
  //     setMessage('Sorry, Product not added');
  //   }
  // };

  const createProduct = async (e) => {
    e.preventDefault();
  
    // Upload Product Image to Cloudinary
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ecommerce");
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dswzjjbvf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      const imageUrl = data.secure_url;
  
      setProduct({ ...product, image: imageUrl });
  
      // Upload Product Info to Database (MongoDB)
      const productData = {
        title: product.title,
        description: product.description,
        price: product.price,
        image: imageUrl,
      };
  
      const dbResponse = await fetch("/api/products/new", {
        method: "POST",
        body: JSON.stringify(productData),
      });
  
      console.log("Response: ", await dbResponse.json());
  
      setMessage('Product Added Successfully');
      setProduct({
        title: "",
        description: "",
        price: '',
        image: '',
      });
      router.push('/products')
    } catch (error) {
      console.log(error);
      setMessage('Sorry, Product not added');
    }
  };
  

  return (
    <>
      <ProductForm
        type={"Add"}
        product= {product}
        setProduct={setProduct}
        handleSubmit= {createProduct}
        message = {message}
        setImageFile = {setImageFile}
        setCloudImage = {setCloudImage}
      />
    </>
  );
};

export default NewProduct;
