import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    category: {
      type: String, // You can customize the data type based on your needs
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
});
  
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;