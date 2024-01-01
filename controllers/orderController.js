import OrderModel from "../models/orderModel.js";

const makeOrder = async (req, res) => {
    try {
        const { businessName, customerName, products } = req.body;
    
        // Validation
        if (!businessName || !customerName || !products || products.length === 0) {
          return res.status(400).json({ success: false, error: 'Incomplete or invalid data provided' });
        }
    
        const newOrder = new OrderModel({
          businessName,
          customerName,
          products,
        });
    
        await newOrder.save();
    
        res.status(200).json({ success: true, message: 'Order placed successfully' });
      } catch (error) {
        console.error('Error in makeOrder:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

const getOrders = async  (req, res) => {
    try {
        const orders = await OrderModel.find();
    
        if (!orders || orders.length === 0) {
          return res.status(404).json({ success: false, error: 'No orders found in the database' });
        }
    
        res.status(200).json({ success: true, orders });
      } catch (error) {
        console.error('Error in getOrders:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
};

export { makeOrder, getOrders };