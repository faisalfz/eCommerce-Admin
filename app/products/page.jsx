'use client'

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Products = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products/${session?.user.id}`);
      const data = await response.json();
      console.log(data, 'Faisal')
      setProducts(data);
    };

    if (session?.user.id) fetchProducts();
  }, [products]);

  const editProduct = (product) => {
    router.push(`/edit-product/?id=${product._id}`)
  }

  const deleteProduct = async(product) => {
    const hasConfirmed = confirm(`Are you sure to delete ${product?.title} product`);

    if(hasConfirmed) {
      try {
        await fetch(`/api/products/${product._id.toString()}`, {method:'DELETE'})
        setMessage('Product Deleted Successfully');
        setTimeout(() => {
          setMessage('')
        }, 1500);

        const filteredProducts = products.map((item) => item._id !== product._id)

        setProducts(filteredProducts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
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

      <div className="product-table mt-6 ">
        <table>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
          </tr>
          {products.map((item) => (
            <>
            <tr>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <div className="flex gap-2">
            <button onClick={() => editProduct(item) } >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            </button>

            <button onClick={()=> deleteProduct(item)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>


            </div>
          </tr>
            </>
          ))}
        </table>
        {message.length ? (<div className='text-green-700 text-xl font-semibold absolute right-0 top-0 bg-white p-2'>{message}</div>) : (<></>)}
      </div>
    </>
  );
};

export default Products;
