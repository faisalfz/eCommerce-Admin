import Products from "@/models/products";
import { connectToDB } from "@/utils/database";

// GET (Read)
export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const products = await Products.find({userId: params._id})

        if(!products) return new Response('Products not found', {status:404})

        return new Response(JSON.stringify(products), {status:200})
        

    } catch (error) {
        return new Response("Failed to fetch all products", { status: 500 })
    }
}


// PATCH (Update)
export const PATCH = async (request, {params}) => {
  const {title, description, price, image} = await request.json();
  console.log('Request Data: ', title, description, price, image)
  try {
    await connectToDB();

    const existingProducts = await Products.findById(params.id);
    console.log('Is Product Exist? :',existingProducts)

    if(!existingProducts) return new Response('Product not found', {status:404})

    existingProducts.title = title;
    existingProducts.description = description;
    existingProducts.price = price;
    existingProducts.image = image;

    await existingProducts.save();

    return new Response(JSON.stringify(existingProducts), {status:200})
  } catch (error) {
    return new Response('Failed to updated Product', {status:500})
  }
}


// DELETE (Delete)
export const DELETE = async (request, {params}) => {
  try {
    await connectToDB();
    await Products.findByIdAndRemove(params.id);

    return new Response('Product deleted successfully', {status:200})

  } catch (error) {
    return new Response('Failed to delete product', {status:500})
    
  }
}