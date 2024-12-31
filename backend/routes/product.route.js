import express from 'express'
import {
    createProductController,
    deleteProductController,
    getProductsController,
    updateProductController
} from '../controllers/product.controller.js'

const productRouter = express.Router()

productRouter.get('/', getProductsController)
productRouter.post('/', createProductController)
productRouter.put('/:id', updateProductController)
productRouter.delete('/:id', deleteProductController)

export default productRouter
