const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Optional resolvers for Atlas SRV lookups when the local DNS server is unavailable.
if (process.env.MONGO_DNS_SERVERS) {
    const dnsServers = process.env.MONGO_DNS_SERVERS.split(",").map(server => server.trim()).filter(Boolean);
    require("node:dns").setServers(dnsServers);
}

const app = express();

app.use(cors());
app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "../frontend")));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log("MongoDB Connected");
        await seedAdmin();
    } catch (err) {
        console.error("MongoDB Connection Error details:", err.message || err);
        console.log("Remote MongoDB failed (Cluster might be paused/deleted). Starting Local Memory Server...");
        try {
            const { MongoMemoryServer } = require("mongodb-memory-server");
            const mongoServer = await MongoMemoryServer.create({
                instance: {
                    launchTimeout: 60000
                }
            });
            const memoryUri = mongoServer.getUri();
            await mongoose.connect(memoryUri);
            console.log("Local In-Memory MongoDB Connected! (Temporary testing database)");
            await seedAdmin();
        } catch (memErr) {
            console.log("Failed to start in-memory database:", memErr.message);
        }
    }
};

async function seedAdmin() {
    try {
        const Admin = require("./models/Admin");
        const bcrypt = require("bcryptjs");
        const email = "admin@gunjan.com";
        const password = "admin";
        
        let admin = await Admin.findOne({ email });
        if (!admin) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Admin.create({ email, password: hashedPassword });
            console.log("Default admin account seeded successfully: admin@gunjan.com / admin");
        }
        await seedPackages();
        await seedRatings();
    } catch (err) {
        console.log("Failed in seedAdmin:", err.message);
    }
}

async function seedPackages() {
    try {
        const Package = require("./models/Package");
        const count = await Package.countDocuments();
        if (count === 0) {
            const defaults = [
                {
                    name: "Silver Package",
                    price: 45000,
                    features: ["4 Hours Coverage", "50 Edited Photos", "Digital Album"],
                    popular: false,
                    order: 1
                },
                {
                    name: "Gold Package",
                    price: 85000,
                    features: ["Full Day Coverage", "100 Edited Photos", "Printed Album", "Cinematic Teaser"],
                    popular: true,
                    order: 2
                },
                {
                    name: "Platinum Package",
                    price: 150000,
                    features: ["2 Days Coverage", "Unlimited Photos", "Premium Album", "Drone & Cinematic Video"],
                    popular: false,
                    order: 3
                }
            ];
            await Package.insertMany(defaults);
            console.log("Default packages seeded successfully");
        }
    } catch (err) {
        console.log("Failed to seed packages:", err.message);
    }
}

async function seedRatings() {
    try {
        const Rating = require("./models/Rating");
        const count = await Rating.countDocuments();
        if (count === 0) {
            const defaults = [
                {
                    rating: 5,
                    message: "Gunjan Digital Studio captured our wedding day perfectly! The photos and cinematic video exceeded our expectations.",
                    service: "wedding",
                    approved: true
                },
                {
                    rating: 5,
                    message: "Top-notch professionalism and creativity. Every moment was captured with stunning detail.",
                    service: "pre-wedding",
                    approved: true
                },
                {
                    rating: 5,
                    message: "The team is super friendly and patient. The album quality is premium!",
                    service: "event",
                    approved: true
                }
            ];
            await Rating.insertMany(defaults);
            console.log("Default ratings seeded successfully");
        }
    } catch (err) {
        console.log("Failed to seed ratings:", err.message);
    }
}

connectDB();

// Root route - API status
app.get("/", (req, res) => {
    res.json({
        status: "✅ Gunjan Digital Studio API is running",
        version: "1.0.0",
        endpoints: {
            contact: "/api/contact",
            bookings: "/api/bookings",
            packages: "/api/packages",
            payment: "/api/payment",
            ratings: "/api/rating",
            admin: "/api/admin"
        }
    });
});

app.use("/api", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", require("./routes/authRoutes")); // User Auth Routes
app.use("/api", require("./routes/bookingRoutes"));
app.use("/api", require("./routes/packageRoutes")); // Services Directory API
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/rating", require("./routes/ratings")); // Rating System API
app.use("/api/payment-config", require("./routes/paymentConfig")); // Payment Config API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
