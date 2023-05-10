import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongodbUrl = process.env.MONGODB_URL;

  if (!mongodbUrl) {
    console.log("MONGODB_URL is not defined");
    return;
  }

  try {
    await mongoose.connect(mongodbUrl, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log("MONGOdb connected");
  } catch (error) {
    console.log(`${error}`);
  }
};
