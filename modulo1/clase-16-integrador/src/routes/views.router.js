import {Router} from 'express';
//import ProductManager from '../dao/fileManagers/ProductManager.js'
import ProductManager from '../dao/dbManagers/ProductManager.js'
import MessagesManager from '../dao/dbManagers/MessageManager.js';

const router = Router();

const productManager = new ProductManager();
const messageManager = new MessagesManager();

router.get('/', async (req,res) => {
    const products = await productManager.getProducts();
    res.render('home',{products});
});

router.get('/realTimeProducts', async (req,res) => {
    res.render('realtimeproducts',{});
})

router.get("/chat", async (req, res) => {
    const messages = await messageManager.getMessages();
    res.render("chat", {messages});
});

export default router;