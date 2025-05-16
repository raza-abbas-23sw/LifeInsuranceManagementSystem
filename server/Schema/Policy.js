import mongoose, { Schema } from "mongoose";


const policySchema = new Schema({
  policyNumber:  { type: String, required: true, unique: true },
  holderName:    { type: String, required: true },
  nic:           { type: String, required: true, unique: true },
  dob:           { type: String,   required: true },
  startDate:     { type: String,   required: true },
  lastPaidDate:  { type: String,   required: true },
  premium:       { type: Number, required: true },
  sumAssured:    { type: Number, required: true },
  riders:        { type: [String], default: [] },
  whatsapp:      { type: String }
});


export default mongoose.model("InsurancePolicy", policySchema);