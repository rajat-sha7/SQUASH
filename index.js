const express = require('express');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path')
const app = express();
const db = require('./config/mongoose-connections')
const ownerRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs');

app.use('/owners' , ownerRouter)
app.use('/users' ,usersRouter)
app.use('/products' ,productsRouter)



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
