import mongoose from "mongoose";

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://Sumit:pKmL3eutyJbMIBld@cluster0.ybc0ot8.mongodb.net/"
  );

  

  console.log(`MongoDB Host Connected: ${conn.connection.host}`);
};

export default connectDB;
