//import fs from 'fs';
import { cartModel } from '../models/carts.model.js';

export default class CartManager {
    constructor() {}

    getCarts = async () => {
        try {
            const carts = await cartModel.find().lean();
            return carts
        } catch (error) {
            console.log(error)
        }
    };

    addToCart = async (productId, cartId) => {
        try {
            let cartFound = await cartModel.findOne({ _id: cartId });

            const productIdInCart = cartFound.products.findIndex(
            (product) => product.productId === productId
            );

            if (productIdInCart !== -1) {
                const updatedCart = await cartModel.updateOne(
                    { _id: cartId, products: { $elemMatch: { productId: productId } } },
                    { $inc: { "products.$.quantity": 1 } }
                );
                return updatedCart;
                } else {
                const productAddToCart = {
                    productId: productId,
                    quantity: 1,
                };
                const updatedCart = await cartModel.updateOne(
                    { _id: cartId },
                    { $push: { products: productAddToCart } }
                    );
                return updatedCart;
                }
            } catch (error) {
                console.log(error);
            }
}

    getCartById = async (cartId) => {

        try {
            const cart = await cartModel.findOne({_id: cartId});
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    createCart = async () => {
        try {
            const newCcart = await cartModel.create({products: []});
            return newCcart
        } catch (error) {
            console.error(error)
        }
    }
}