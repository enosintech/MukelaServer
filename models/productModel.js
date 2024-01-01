import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String, // Assuming it's a URL
      required: true,
    },
});
  
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;  