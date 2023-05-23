import Products from "@/models/products";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  const { title, description, price, image } = await request.json();

  try {
    await connectToDB();
    const newProduct = new Products({
      title,
      description,
      price,
      image,
    });

    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
