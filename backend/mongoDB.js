// Import Module
const mongoose = require('mongoose');
const dotEnv = require('dotenv');

// Connect to MongoDB 
dotEnv.config();
mongoose.connect(process.env.DATABASE_URI)
.then(() => console.log("Connected to MongoDB Successfully..."))
.catch((err) => console.log(err));

// Create document 
const userDB = new mongoose.Schema({
    userName: { type: "string", required: true} ,
    email: { type: "string", required: true },
    password: { type: "string", required: true }
});

const adminDB = new mongoose.Schema({
    userName: { type: "string", required: true } ,
    email: { type: "string", required: true },
    password: { type: "string", required: true }
});

const socialLinks = new mongoose.Schema({
    email: { type: "string", required: true},
    facebook: { type: "String", required: true},
    instagram: { type: "String", required: true},
    whatsapp: { type: "String", required: true},
    telegram: { type: "String", required: true}
});

const profilePhoto = new mongoose.Schema({
    email: { type: "String", required: true },
    image: { type: "String", required: true },
});

const User = mongoose.model("User", userDB);
const Admin = mongoose.model("Admin", adminDB);
const Social = mongoose.model("Social", socialLinks);
const profileImage = mongoose.model("Profile Image", profilePhoto);

module.exports = { User, Admin, Social, profileImage };