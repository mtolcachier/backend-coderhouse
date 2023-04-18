import { Router } from "express";

import ProductManager from "../dao/dbManagers/ProductManager.js";
import CartManager from "../dao/dbManagers/CartManager.js";

const productManager = new ProductManager();
const cartManager = new CartManager();

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, category, available, sort } = req.query;
  const {
    docs: products,
    hasPrevPage,
    hasNextPage,
    nextPage,
    prevPage,
  } = await productManager.getProducts(page, limit, category, available, sort);
  res.render("home", {
    products,
    page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    title: "Products",
  });
});

router.get("/product/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);
    res.render("product", {
        product,
        title: "Product Detail",
    });
});

router.get("/cart/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.render("cart", {
        cart,
        title: "Product Detail",
    });
});


export default router;