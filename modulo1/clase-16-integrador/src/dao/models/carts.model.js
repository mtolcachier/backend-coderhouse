import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            productId: {
                type: String,
                required: true},
            quantity: {
                type: Number
            }
        }]
    }
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);