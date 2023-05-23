import ProductCard from "./ProductCard"

const ProductList = ({products, editProduct, deleteProduct}) => {
  return (
    <>
      <div className='grid grid-cols-4 gap-x-6 gap-y-8 my-6'>
        {
          products.map((item) => <ProductCard key={item._id} 
            product={item}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
          />)
        }
      </div>  
    </>
  )
}

export default ProductList