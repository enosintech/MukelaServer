const cloudinary = require('cloudinary').v2;
import BusinessDatamodel from "../models/businessOBModel.js";

cloudinary.config({
    cloud_name: "dgdbxflan",
    api_key: "815422861546374",
    api_secret: "D0WDTamb6curq4B55fBm8N5iTEk",
});

const businessOnboardController = async (req, res) => {
    try {
        const { businessName, discountPercentage } = req.body;
    
        // Inside businessOnboardController or any route handler
        console.log('Received a request:', req.body, req.file);
    
        // Validation
        if (!businessName || !discountPercentage || !req.file) {
          return res.status(400).json({ success: false, error: 'Incomplete or invalid data provided' });
        }
    
        const result = await cloudinary.uploader.upload(req.file.path, {
          width: 300,
          height: 300,
          crop: 'fill'
        });
    
        // Save business details to MongoDB using the imported model
        const newBusiness = new BusinessDatamodel({
          businessName,
          discountPercentage,
          logoImageUrl: result.url
        });
    
        await newBusiness.save();
    
        res.status(200).json({ success: true, message: 'Business onboarded successfully' });
      } catch (error) {
        console.error('Error in businessOnboardController:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const fetchBusiness = async (req, res) => {
    try {
        console.log('Fetching businesses...');
        
        // Fetch all businesses from the database
        const businesses = await BusinessDatamodel.find();
    
        if (!businesses || businesses.length === 0) {
          console.error('No businesses found');
          return res.status(404).json({ success: false, error: 'No businesses found in the database' });
        }
    
        // Map the businesses to include only relevant information
        const businessData = businesses.map((business) => ({
          businessName: business.businessName,
          discountPercentage: business.discountPercentage,
          logoImageUrl: business.logoImageUrl,
        }));
    
        console.log('Businesses fetched successfully:', businessData);
    
        res.status(200).json({ success: true, businessData });
      } catch (error) {
        console.error('Error in fetchBusinesses:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

export { businessOnboardController, fetchBusiness};