"use client";

import Image from "next/image";
import { useState } from "react";

const ProductForm = ({ type, product, setProduct, handleSubmit, message, setImageFile, setCloudImage, imageUrl, setImageUrl}) => {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(null);
    if(imageUrl) setImageUrl('');
    const file = e.target.files[0];
    setImageFile(file);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);

  };

  return (
    <>
      <h1>{type} Product</h1>
      <div className="mt-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          method="post"
          className="flex flex-col gap-0.5 sm:w-2/3"
        >
          <label>Product name</label>
          <input
            type="text"
            placeholder="Product name"
            name="product-name"
            id="product-name"
            required
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
          />

          <label>Description</label>
          <textarea
            placeholder="Description"
            name="description"
            id="description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />

          <label>Price ($)</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <label>
            Product Image
          </label>
            
            <div className="flex gap-8 my-4">
            <label className="w-20 h-20 bg-slate-200 shadow-lg flex justify-center items-center flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Upload
            <input type="file" name="productImage" id="productImage" accept=".png, .jpg, .jpeg, .webp" onChange={handleImage} className="hidden"/>
            </label>
            
          {image && (
              <div className="w-20 h-20 hover:border-1 object-fill border-blue-900 relative">
              <Image src={image} alt="Product Image" width={80} height={80} className="object-fill" />
              <span className="absolute p-0.5 right-0 top-0 bg-white text-blac cursor-pointer text-xs hover:font-semibold  " onClick={()=> setImage(null)}>X</span>
              </div>
          )}
          
          {imageUrl && (
              <div className="w-20 h-20 hover:border-1 object-fill border-blue-900 relative">
              <Image src={imageUrl} alt="Product Image" width={80} height={80} className="object-fill" />
              <span className="absolute p-0.5 right-0 top-0 bg-white text-blac cursor-pointer text-xs hover:font-semibold  " onClick={()=> setImageUrl('')}>X</span>
              </div>
          )}

          </div>

          <button type="submit" className="btn-primary">
            {type}
          </button>
        </form>

        {message.length > 0 && (
          <div className="text-green-700 text-xl animate-bounce p-1 mt-2">
            {message}
          </div>
        )}
      </div>
      {console.log(imageUrl)}
    </>
  );
};
export default ProductForm;
