import {Router} from 'express';
import ProductManager from '../ProductManager.js'

const router = Router();

const productManager = new ProductManager();

router.get('/', async (req,res) => {
    const products = await productManager.getProducts();
    res.render('home',{products});
});

router.get('/realTimeProducts', async (req,res) => {
    res.render('realtimeproducts',{});
})

export default router;