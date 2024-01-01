import mongoose from "mongoose";

const businessAccountSchema = new mongoose.Schema({
    businessName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    businessEmail: {
      type: String,
      required: true,
      unique: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp:{
      type: String,
      required: true,
    }
});

businessAccountSchema.statics.isRegistrationNumberValid = function (registrationNumber) {
  
    // Sample regular expression for the provided format: YYYYTTNNNNNN
  const registrationNumberRegex = /^\d{4}(01|02|03|04|05|06)\d{6}$/;
  return registrationNumberRegex.test(registrationNumber);
};

businessAccountSchema.statics.isThisRegistrationNumberInUse = async function (registrationNumber) {
  const existingUser = await this.findOne({ registrationNumber });
  return !existingUser; // If existingUser is truthy, the number is already in use
};

const BusinessAccountModel = mongoose.model('BusinessAccount', businessAccountSchema);

export default BusinessAccountModel;