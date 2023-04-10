import { Router } from "express";
//import CartManager from "../dao/fileManagers/CartManager.js";
import CartManager from "../dao/dbManagers/CartManager.js";
//import ProductManager from "../dao/fileManagers/ProductManager.js";
import ProductManager from "../dao/dbManagers/ProductManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get('/:cid', async (req,res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.getCartById(cartId)

    if (!cartId) {
        return res.status(400).send({
            status: "error",
            error: `Please check the submited information`
        })
    }

    if (!cart){
        return res.status(404).send({
            status: "error",
            error: `Cart with ID '${cartId}' was not found`
        })
    }

    return res.send({
        status: "success",
        payload: cart
    })

})

router.post('/', async (req,res) => {
    const newCart = await cartManager.createCart();

    return res.send({
        status: "success",
        payload: newCart
    })
})

router.post('/:cid/product/:pid', async (req,res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const cart = await cartManager.getCartById(cartId);
    const product = await productManager.getProductById(prodId);

    if (!cartId) {
        return res.status(404).send({
            status: "error",
            error: `The cart ID ${cartId} is not valid`
        })
    }

    if (!prodId) {
        return res.status(404).send({
            status: "error",
            error: `The product ID ${prodId} is not valid`
        })
    }

    if (!cart) {
        return res.status(400).send({
            status: "error",
            error: `Cart ID ${cartId} was not found`
        })
    }

    if (!product) {
        return res.status(400).send({
            status: "error",
            error: `Product ID ${prodId} was not found`
        })
    }

    await cartManager.addToCart(prodId,cartId);
    return res.send({
        status: "success",
        message: `Product successfully added to cart`
    })
})

export default router