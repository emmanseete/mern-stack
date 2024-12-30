import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.js";

dotenv.config();

const app = express();

app.use(express.json()); // allows us to accept JSON data in the req.body

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(`Error: ${ error.message }`);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.post("/api/products", async (req, res) => {
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error(`Error: ${ error.message }`);
        res.status(500).json({ success: false, message: "Server Error" })
    }
});

app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: `Product (${ id }) deleted` });
    } catch (error) {
        console.error(`Error: ${ error.message }`);
        res.status(404).json({ success: false, message: `Product (${ id }) not found` });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
