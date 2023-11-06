import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    category: {
      type: String,
      required: [true, "Category is needed"],
    },
    stock: Number,
    rating: Number,
    thumbnail: String,
    discountPercentage: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProductsSchema);
