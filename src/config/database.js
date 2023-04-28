import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDb Connected");
  } catch (error) {
    console.log("MongoDb Connection Failed: ", error);
  }
};

export default connectDb;
