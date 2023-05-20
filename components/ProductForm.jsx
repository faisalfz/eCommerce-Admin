import React from 'react'

const ProductForm = ({type, products, setProducts, handleSubmit, message }) => {
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
            value={products.title}
            onChange={(e) => setProducts({...products, title:e.target.value})}
          />

          <label>Description</label>
          <textarea
            placeholder="Description"
            name="description"
            id="description"
            value={products.description}
            onChange={(e) => setProducts({...products, description: e.target.value})}
          />

          <label>Price ($)</label>
          <input
            type="number"
            placeholder="Price"
            name="price"
            id="price"
            value={products.price}
            onChange={(e) => setProducts({...products, price:e.target.value})}
          />

          <button type="submit" className="btn-primary">
            {type}
          </button>
        </form>

        {message.length ? (<div className='text-green-700 text-xl font-semibold absolute right-0 top-0 bg-white p-2'>{message}</div>) : (<></>)}

      </div>
    </>
  )
}

export default ProductForm