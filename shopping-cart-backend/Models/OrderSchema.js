import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    Cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("Order", OrderSchema);
