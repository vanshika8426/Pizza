import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    console.log("Received request:", req.body);
   let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        timestamp:new Date()
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving food list" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        // Find the food item first
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})
        // if (!food) {
        //     return res.json({ success: false, message: "Food item not found" });
        // }

        // // Remove the image file
        // fs.unlink(`uploads/${food.image}`, (err) => {
        //     if (err) {
        //         console.log("Error removing image:", err);
        //     }
        // });

        // // Delete the food item from the database
        // await foodModel.findByIdAndDelete(req.body.id);
        // res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood };
