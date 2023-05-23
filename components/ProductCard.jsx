import { auto } from "@cloudinary/url-gen/qualifiers/quality";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product, editProduct, deleteProduct }) => {
  return (
        <div className="w-full bg-white rounded-lg shadow-lg">
          <div className="w-full">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={250}
              className="rounded-t-md"
            />
          </div>
          <div className="p-2">
            <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
            <h3 className="text-xl mt-4">{product.price}</h3>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => editProduct(product)}>
                <div className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </div>
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteProduct(product)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
  );
};

export default ProductCard;
