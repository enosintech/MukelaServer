import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import BusinessAccountModel from "../models/businessAccountModel.js";
import otplib from "otplib";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'breakoutmediaagency@gmail.com',
      pass: 'hjpblzzvuzwivyus',
    },
});
  
const generateHOTP = (secret, counter) => {
    return otplib.hotp.generate(secret, counter);
};

const registerController = async (req, res) => {
    try {
        const { businessName, registrationNumber, businessEmail, businessType , password } = req.body;
    
        // Add email validation
        const allowedEmailDomains = ['gmail.com', 'yahoo.com', 'xmu.edu.my']; // Add your allowed email domains
        const isValidEmail = allowedEmailDomains.some(domain => businessEmail.endsWith(`@${domain}`));
    
        if (!isValidEmail) {
          return res.status(400).json({
            success: false,
            message: 'Only email addresses ending with @example.com or @company.com are allowed.',
          });
        }
    
        // Generate a random counter value (you may need to store and increment this for each user)
        const counter = Math.floor(100000 + Math.random() * 900000);
    
        // Generate HOTP
        const otp = generateHOTP(process.env.SECRET, counter);
    
        const isNewUser = await BusinessAccountModel.isThisRegistrationNumberInUse(registrationNumber);
    
        if (!isNewUser) {
          return res.json({
            success: false,
            message: 'This registration number is already in use, try sign-in',
          });
        }
    
        // Validation
        if (!businessName || !registrationNumber || !businessEmail || !businessType || !password) {
          return res.status(400).send({
            success: false,
            message: 'All fields are required',
          });
        }
    
        // Check if user already exists
        const existingUser = await BusinessAccountModel.findOne({ businessEmail });
    
        if (existingUser) {
          return res.status(500).send({
            success: false,
            message: 'Business Account Already Registered With This Email',
          });
        }
    
        // Hashed password
        const hashedPassword = await hashPassword(password);
    
        // Save business account
        const businessAccount = await BusinessAccountModel({
          businessName,
          registrationNumber,
          businessEmail,
          businessType,
          password: hashedPassword,
          otp, // Save OTP to the business account model
        }).save();
    
        // Sending verification email
        console.log('Sending verification email to:', businessEmail);
        await transporter.sendMail({
          from: 'breakoutmediaagency@gmail.com',
          to: businessEmail,
          subject: 'Account Verification',
          text: `Your OTP for account verification is: ${otp}`,
        });
    
        console.log('Verification email sent successfully.');
    
        // Send success response
        return res.status(201).json({
          success: true,
          message: 'Registration successful. Please check your email for verification.',
          businessAccount,
        });
      } catch (error) {
        console.error('Error in Register API:', error);
    
        // Handle specific errors
        if (error.code === 'ERR_HTTP_HEADERS_SENT') {
          return; // Avoid sending headers multiple times
        }
    
        // Send error response
        return res.status(500).json({
          success: false,
          message: 'Error in Register API',
          error: error.message || error,
        });
      }
};

const verifyOTP = async (req, res) => {
    const { businessEmail, enteredOTP } = req.body;

  try {
    const businessAccount = await BusinessAccountModel.findOne({ businessEmail });

    if (!businessAccount) {
      return res.json({
        success: false,
        message: `Business Account not found with the given email! ${businessAccount}`,
      });
    }

    if (businessAccount.otp === enteredOTP) {
      isOTPMatch = 1;
    } else {
      isOTPMatch = 0;
    }

    if (isOTPMatch == 0) {
      return res.json({
        success: false,
        message: 'Entered OTP does not match!',
      });
    }

    // Clear the OTP from the database after successful verification
    await BusinessAccountModel.findByIdAndUpdate(businessAccount._id, { otp: null });

    res.json({ success: true, message: 'OTP verified successfully!' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    res.json({ success: false, message: 'Error during OTP verification' });
  }
};

const loginController = async (req, res) => {
    try {
        const { businessEmail, password } = req.body;
    
        // Validation
        if (!businessEmail || !password) {
          return res.status(500).send({
            success: false,
            message: 'Please Provide Email Or Password',
          });
        }
    
        // Find business account
        const businessAccount = await BusinessAccountModel.findOne({ businessEmail });
    
        if (!businessAccount) {
          return res.status(500).send({
            success: false,
            message: 'Business Account Not Found',
          });
        }
    
        // Match password
        const match = await comparePassword(password, businessAccount.password);
    
        if (!match) {
          return res.status(500).send({
            success: false,
            message: 'Invalid email or password',
          });
        }
    
        // TOKEN JWT
        const token = await JWT.sign({ _id: businessAccount._id }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });
    
        // Undefine password
        businessAccount.password = undefined;
    
        res.status(200).send({
          success: true,
          message: 'Login successfully',
          token,
          businessAccount,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: 'Error in login API',
          error,
        });
      }
};

export {
    registerController,
    loginController,
    verifyOTP
};