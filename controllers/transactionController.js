import TransactionModel from "../models/transactionModel.js";

const addTransaction = async (req, res) => {
    try {
        const { category, price } = req.body;
    
        const newTransaction = new TransactionModel({ category, price});
        await newTransaction.save();
    
        res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await TransactionModel.find().sort({ date: -1 });
        res.status(200).json(transactions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};

export {
    getAllTransactions,
    addTransaction
};

