import { Router } from "express";
import CartManager from "../CartManager.js";
import ProductManager from "../ProductManager.js";

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();

router.get('/:cid', async (req,res) => {
    const cartId = parseInt(req.params.cid);
    const cart = await cartManager.getCartByID(cartId)

    if (isNaN(cartId)) {
        return res.status(400).send({
            status: "error",
            error: `Please check the submited information`
        })
    }

    if (!cart){
        return res.status(404).send({
            status: "error",
            error: `Cart ID ${cartId} was not found`
        })
    }

    return res.send({
        status: "success",
        message: {cart: cart}
    })

})

router.post('/', async (req,res) => {
    const newCart = await cartManager.createCart();

    return res.send({
        status: "success",
        message: "cart created successfully"
    })
})

router.post('/:cid/product/:pid', async (req,res) => {
    const cartId = parseInt(req.params.cid);
    const prodId = parseInt(req.params.pid);
    const cart = await cartManager.getCartById(cartId);
    const product = await productManager.getProductByID(prodId);


    if (isNaN(cartId) || cartId <= 0) {
        return res.status(404).send({
            status: "error",
            error: `The cart ID ${cartId} is not valid`
        })
    }

    if (isNaN(prodId) || prodId <= 0) {
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
        message: `Product ${prodId} successfully added to cart ${cartId}`
    })
})

export default router