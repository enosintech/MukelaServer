import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    businessName: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    products: [
      {
        productId: String,
        productName: String,
        quantity: Number,
      },
    ],
});
  
const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
  