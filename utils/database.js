import mongoose from "mongoose";

let isConnected = false; //track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mong DB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ecommerce",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;
    console.log('MongoDB Conneceted')
  } catch (error) {
    console.log(error);
  }
};
