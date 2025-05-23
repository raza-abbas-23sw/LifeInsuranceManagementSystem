import express from 'express';
import mongoose, { connect } from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import Policy from './Schema/Policy.js';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { addMonths, differenceInMonths, isSameDay } from 'date-fns';
import PQueue from 'p-queue';
import cookieParser from 'cookie-parser';
import { signup, signin } from './Controllers/authController.js';
import User from './Schema/User.js';
import jwt from 'jsonwebtoken';

const emailQueue = new PQueue({ concurrency: 5 }); // Process 5 emails at once
const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true
}));

// MongoDB connection
mongoose
    .connect(process.env.DB_LOCATION, { autoIndex: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB Connection Error:" + err, {
        });
        process.exit(1); // Exit the process to avoid running in a broken state
    });




// ************************EMAILING SETUP*********************************


// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send Email Notification
const sendEmailNotification = async (policyHolder) => {

    console.log(policyHolder.email)
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: policyHolder.email,
            subject: 'Insurance Payment Due Reminder',
            text: `Dear ${policyHolder.holderName},

This is a friendly reminder that your insurance payment is due tomorrow. Please ensure the payment is made on time to avoid any penalties or interruptions in your coverage.

If you have already made the payment, please disregard this message.

Thank you for your attention.

Best regards,
Mehdi Raza`,

        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email notification:', error);
    }
};

// Cron schedule with proper timezone handling
cron.schedule('0 0 * * *', async () => {

    console.log('Scheduled to run at 12:00 AM, delaying by 1 minute...');
    await new Promise(resolve => setTimeout(resolve, 60 * 1000));

    console.log('Running anniversary check');
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    try {
        const allPolicies = await Policy.find({});

        emailQueue.clear();

        for (const policy of allPolicies) {
            const startDate = new Date(policy.startDate);
            startDate.setHours(0, 0, 0, 0);

            const monthsSinceStart = differenceInMonths(today, startDate);
            console.log(monthsSinceStart)

            // Check if it's either 11 months or 11 + n*12 months
            if (monthsSinceStart >= 11 && (monthsSinceStart - 11) % 12 === 0) {
                const expectedAnniversary = addMonths(startDate, 11 + ((monthsSinceStart - 11) / 12) * 12);
                console.log("hello")

                if (isSameDay(expectedAnniversary, today)) {
                    emailQueue.add(async () => {
                        try {
                            console.log(`Processing policy ${policy._id}`);
                            await sendEmailNotification(policy);
                        } catch (error) {
                            console.error(`Failed to send email for ${policy._id}:`, error);
                        }
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error processing policies:', error);
    }
}, {
    timezone: "Asia/Karachi" // PKT timezone (UTC+5)
});

// console.log("Server timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);

//*************************EMAILING SETUP END************************************* */


server.get("/check-auth", (req, res) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Authenticated", user: decoded });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
});



const protect = (req, res, next) => {
    const token = req.cookies.jwt;


    // If no token, block the request
    if (!token) {
        return res.status(401).json({ error: 'Not authorized, token missing' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Verification failed:", err);
        return res.status(401).json({ error: 'Not authorized, token invalid' });
    }
};


server.post('/signup', signup);
server.post('/signin', signin);
server.post("/logout", (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(200).json({ message: "Successfully logged out" });
    } catch (err) {
        console.log("error logging out: ", err)
        return res.status(500).json({ error: "Server error", error: err.message });
    }
});

server.post("/submit-policy", protect, async (req, res) => {
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
            riders,
            email
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
            riders,
            email
        });

        // Save to MongoDB
        await newPolicy.save();

        return res.status(201).json({ message: "Policy saved successfully", policy: newPolicy });
    } catch (err) {
        console.error("Error saving policy:", err);

        // Handle duplicate key errors (unique policyNumber or nic)
        if (err.code === 11000) {
            return res.status(400).json({ error: "Policy number already exists" });
        }

        return res.status(500).json({ error: "Server error", error: err.message });
    }
});


server.get("/fetch-policies", protect, async (req, res) => {
    // return res.json({ message: "Server error" })
    try {
        const policies = await Policy.find();
        return res.status(200).json({ message: "Policies fetched successfully", policies });
    } catch (err) {
        console.error("Error fetching policies:", err);
        return res.status(500).json({ error: "Server error" });
    }
})


server.post("/delete-policy", protect, async (req, res) => {
    try {
        const { policyId } = req.body;
        console.log(policyId)


        if (!policyId) {
            return res.status(400).json({ error: "PolicyId is required" })
        }

        const deletedPolicy = await Policy.findOneAndDelete({ _id: policyId });

        if (!deletedPolicy) {
            return res.status(400).json({ error: "No Policy exists with this policyId" })
        }

        return res.status(200).json({ message: "Policy deleted successfully" });
    } catch (err) {
        console.log("error in deleting: ", err);

        return res.status(500).json({ error: "Server error" })
    }
})

server.put("/update-policy", protect, async (req, res) => {
    const {
        policyId,
        holderName,
        sumAssured,
        premium,
        whatsapp,
        email,
        dob,
        nic,
        startDate,
        lastPaidDate,
        policyNumber,
        riders
    } = req.body;

    console.log("Request Body: ", req.body);

    try {
        if (!policyId) {
            return res.status(400).json({ message: "Policy ID is required" });
        }

        const updatedPolicy = await Policy.findByIdAndUpdate(
            policyId,
            {
                holderName,
                sumAssured,
                premium,
                whatsapp,
                email,
                dob,
                nic,
                startDate,
                lastPaidDate,
                policyNumber,
                riders
            },
            { runValidators: true }
        );

        if (!updatedPolicy) {
            return res.status(404).json({ message: "Policy not found" });
        }

        res.status(200).json({ message: "Policy updated successfully" });

    } catch (error) {
        console.error("Error updating policy:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


server.listen(8000, () => console.log("Server started at port:", 8000));