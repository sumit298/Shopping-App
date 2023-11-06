import mongoose, { Schema } from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      quantity: {
        type: Number,
        default: 0,
      },
      cartTotal: {
        type: Number,
        default: 0
      }

    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", CartSchema);
