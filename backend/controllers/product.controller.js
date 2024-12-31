
import mongoose from 'mongoose'
import Product from '../models/product.js'

const internalServerError = 'Internal server error'
const notFound = 'Not Found'

export const getProductsController = async (_, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.error(`Error: ${error.message}`)
        res.status(500).json({ success: false, msg: internalServerError })
    }
}

export const createProductController = async (req, res) => {
    const product = req.body

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, msg: 'All fields are required' })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch(error) {
        console.error(`Error: ${ error.message }`)
        res.status(500).json({ success: false, msg: internalServerError })
    }
}

export const updateProductController = async (req, res) => {
    const { id } = req.params
    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, msg: notFound })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        console.error(`Error: ${ error.message }`)
        req.status(500).json({ success: false, msg: internalServerError })
    }
}

export const deleteProductController = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, msg: notFound })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true })
    } catch (error) {
        console.error(`Error: ${ error.message }`)
        res.status(500).json({ success: false, msg: internalServerError })
    }
}
