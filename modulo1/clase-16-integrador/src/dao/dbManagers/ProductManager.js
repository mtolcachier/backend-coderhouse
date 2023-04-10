import fs from 'fs';
import {productModel} from '../models/products.model.js'

export default class ProductManager {

    constructor() {}

    getProducts = async () => {
        try {
            const products = await productModel.find().lean();
            return products
        } catch (error) {
            console.log(error)
        }
    };

    addProduct = async (product = {title, description, code, price, stock, category, thumbnails}) => {

        try {
            product.stock > 0 
                ? product = { status: true, ...product}
                : product = { status: false, ...product};

            const newProduct = productModel.create(product);

        } catch (error) {
            console.error(error)
        }
}

    getProductById = async (productId) => {

        try {
            const filteredProduct = await productModel.find({ _id: productId});
            return filteredProduct;
        } catch (error) {
            console.log(error)
        }
    }

    updateProduct = async (id, updates) => {

        try {
            const updateProduct = await productModel.updateOne(
                {_id: id},
                updates
            )
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await productModel.deleteOne({ _id: id });
            return deletedProduct;
        } catch (error) {
            console.log(error)
        }
    }
}