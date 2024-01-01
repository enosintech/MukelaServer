const cloudinary = require('cloudinary').v2;
import ProductModel from "../models/productModel.js";

cloudinary.config({ 
    cloud_name: 'dgdbxflan', 
    api_key: '815422861546374', 
    api_secret: 'D0WDTamb6curq4B55fBm8N5iTEk' 
});

const addProduct = async (req, res) => {
    try {
        const { productname, productprice } = req.body;
        console.error('Error in addProduct:', productname, productprice);
    
        const imageFile = req.files['file']; // Access the image file using the name specified in the form
       
    
    
        // Validation
        if ( !productname || !imageFile) {
          console.error('Error in addProduct:', productname, productprice, imageFile);
          return res.status(400).json({ success: false, error: 'Incomplete or invalid data provided' });
        }
    
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(imageFile.tempFilePath, {
          width: 300,
          height: 300,
          crop: 'fill'
        });
    
        // Create and save new product
        const newProduct = new ProductModel({
          productname,
          productprice,
          ProductImage: result.url,
        });
    
        await newProduct.save();
    
        res.status(200).json({ success: true, message: 'Product added successfully' });
      } catch (error) {
        console.error('Error in addProduct:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
    
        if (!products || products.length === 0) {
          return res.status(404).json({ success: false, error: 'No products found in the database' });
        }
    
        res.status(200).json({ success: true, products });
      } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const editProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { productname, productprice } = req.body;
    
        // Validation
        if (!productId || !productname || !productprice) {
          return res.status(400).json({ success: false, error: 'Incomplete or invalid data provided' });
        }
    
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          productId,
          { productname, productprice },
          { new: true }
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
    
        res.status(200).json({ success: true, message: 'Product updated successfully', updatedProduct });
      } catch (error) {
        console.error('Error in editProduct:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
    
        // Validation
        if (!productId) {
          return res.status(400).json({ success: false, error: 'Product ID not provided' });
        }
    
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    
        if (!deletedProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
    
        res.status(200).json({ success: true, message: 'Product deleted successfully', deletedProduct });
      } catch (error) {
        console.error('Error in deleteProduct:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

export { addProduct, getAllProducts, editProduct, deleteProduct };