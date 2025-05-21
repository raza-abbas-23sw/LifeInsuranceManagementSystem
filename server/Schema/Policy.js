import mongoose, { Schema } from "mongoose";


const policySchema = new Schema({
  policyNumber:  { type: String,   required: true, unique: true },
  holderName:    { type: String,   required: true },
  nic:           { type: String,   required: true, unique: false },
  dob:           { type: String,   required: true },
  startDate:     { type: String,   required: true },
  lastPaidDate:  { type: String,   required: true },
  premium:       { type: Number,   required: true },
  sumAssured:    { type: Number,   required: true },
  riders:        { type: [String], default: [] },
  whatsapp:      { type: String,   required: true },
  email:         { type: String}
});


export default mongoose.model("InsurancePolicy", policySchema);