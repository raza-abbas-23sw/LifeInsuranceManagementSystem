import express from 'express';
import mongoose, { connect } from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import Policy from './Schema/Policy.js';

const server = express();

server.use(express.json());
server.use(cors())

// MongoDB connection
mongoose
    .connect(process.env.DB_LOCATION, { autoIndex: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:" + err, {
        });
        process.exit(1); // Exit the process to avoid running in a broken state
    });


server.post("/submit-policy", async (req, res) => {
    try {
        const {
            holderName,
            nic,
            dob,
            policyNumber,
            sumAssured,
            premium,
            startDate,
            lastPaidDate,
            whatsapp,
            riders
        } = req.body;

        
        // Create new policy object
        const newPolicy = new Policy({
            policyNumber,
            holderName,
            nic,
            dob,
            startDate,
            lastPaidDate,
            premium: Number(premium),
            sumAssured: Number(sumAssured),
            whatsapp,
            riders
        });

        // Save to MongoDB
        await newPolicy.save();

        return res.status(201).json({ message: "Policy saved successfully", policy: newPolicy });
    } catch (err) {
        console.error("Error saving policy:", err);

        // Handle duplicate key errors (unique policyNumber or nic)
        if (err.code === 11000) {
            return res.status(400).json({ error: "Policy number or NIC already exists" });
        }

        return res.status(500).json({ error: "Server error", error: err.message });
    }
});


server.get("/fetch-policies", async(req, res)=> {
// return res.json({ message: "Server error" })
      try {
    const policies = await Policy.find();
    return res.status(200).json({ message: "Policies fetched successfully", policies });
  } catch (err) {
    console.error("Error fetching policies:", err);
    return res.status(500).json({ error: "Server error" });
  }
})



server.listen(8000, () => console.log("Server started at port:", 8000));