"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProductTable from "@/components/ProductTable";
import ProductList from "@/components/ProductList";

const Products = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products/${session?.user.id}`);
      const data = await response.json();
      // console.log(data, 'Faisal')
      setProducts(data);
    };

    if (session?.user.id) fetchProducts();
  }, [products]);

  const editProduct = (product) => {
    router.push(`/edit-product/?id=${product._id}`);
  };

  const deleteProduct = async (product) => {
    const hasConfirmed = confirm(`Are you sure to delete '${product?.title}'`);

    if (hasConfirmed) {
      try {
        await fetch(`/api/products/${product._id.toString()}`, {
          method: "DELETE",
        });
        setMessage("Product Deleted Successfully");
        setTimeout(() => {
          setMessage("");
        }, 1500);

        const filteredProducts = products.map(
          (item) => item._id !== product._id
        );

        setProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="w-full mb-6 flex flex-col gap-8">
        <div className="flex justify-between items-center flex-nowrap">
          <h1>All Products</h1>
          <Link href={"/products/new"}>
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md p-2"
            >
              Add New Product
            </button>
          </Link>
        </div>

        <ProductList
          products={products}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
        />

        <ProductTable
          products={products}
          editProduct={editProduct}
          deleteProduct={deleteProduct}
          message={message}
        />
      </div>
    </>
  );
};

export default Products;
