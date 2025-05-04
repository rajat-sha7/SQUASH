const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

// Route to create a new owner
router.post('/create', async (req, res) => {
    try {
        // Validate required fields
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if any owners already exist
        const existingOwners = await ownerModel.find().exec();
        if (existingOwners.length > 0) {
            return res.status(403).send("You do not have permissions to create a new owner");
        }

        // Create new owner
        const createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });

        // Return success response
        res.status(201).json({
            success: true,
            data: createdOwner
        });
    } catch (error) {
        console.error("Error creating owner:", error);
        // Check for specific error types and respond accordingly
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Validation error: " + error.message
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error while creating owner"
        });
    }
});

// Route to get all owners
router.get('/admin', async (req, res) => {
    let success = req.flash("success");
   res.render('createProducts' , {success})
});

module.exports = router;