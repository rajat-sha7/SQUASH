// const mongoose = require('mongoose');
// const debug = require("debug")("development:mongoose");
// const config = require("config");

// const connectDB = async () => {
//   try {
//     const dbURI = "mongodb://127.0.0.1:27017/userpostdatas"
//     await mongoose.connect(dbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true, // Added for index creation
//       useFindAndModify: false // Added to avoid deprecation warning
//     });
//     debug("MongoDB connected successfully");
//   } catch (err) {
//     debug("MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;