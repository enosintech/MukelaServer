import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    businessName: {
      type: String,
      required: true,
    },
    category: {
      type: Number,
      required: true,
    },
    logoImageUrl: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    // Add other fields if needed
});

const Business = mongoose.model('Business', businessSchema);

export default Business;