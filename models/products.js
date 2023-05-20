import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  description: {
    type: String,
    required: [true, "Username is required!"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

const Products = models.Products || model("Products", ProductSchema);

export default Products;
