import { Router } from "express";
import ProductManager from "../dao/dbManagers/ProductManager.js";
//import ProductManager from "../dao/fileManagers/ProductManager.js";
import {uploader} from '../utils.js'

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req,res)=> {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;

        if (!products) {
            return res.status(404).send({
                status: "error",
                error: "No products found"
            })
        }

        if (limit) {
            const limitedProds = products.slice(0,limit);
            return res.status(200).send({
                status: "success" ,
                payload: {products: limitedProds}
            });
        }

        return res.send({
            status: "success",
            payload: {products: products}
        });

    } catch (error) {
        console.error(error)
    }
});

router.get('/:pid', async (req,res)=> {
    try {
        const productId = (req.params.pid);
        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(400).send({
                status: "error",
                error: `Sorry! We didn't find any product with the ID: ${productId}.`
            })
        }

        return res.send({
            status: "success",
            payload: product
        })

    } catch (error) {
        console.error(error);
    }
});

router.post('/',uploader.array('thumbnails'), async (req,res) => {
    const newProduct = req.body;
    const photos = req.files;
    console.log("thumbnail:"+photos)

    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price  || !newProduct.stock || !newProduct.category) {
        return res.status(400).send({
            status: "error",
            error: `All fields are required`
        })
    }

    if (newProduct.id) {
        return res.status(400).send({
            status: "error",
            error: "ID can't be assigned"
        })
    }

    if (photos) {
        photos.forEach(file => {
            newProduct.thumbnails = file.filename;
        })
    } else {
        newProduct.thumbnails = []
    }

    await productManager.addProduct(newProduct);
    return res.send({
        status: "success",
        payload: `${newProduct.title} uploaded successfully`
    })
})

router.put('/:pid',uploader.array('thumbnails'), async (req,res) => {
    const productId = req.params.pid;
    const update = req.body;
    const product = await productManager.getProductById(productId);

    const keys = ['title','description','code','price','stock','category','thumbnails'];

    if (req.files) {
        update.thumbnails = req.files.map(file => file.filename)
    }

    const findKeys = keys.some((key) => Object.keys(update).includes(key));

    if (!findKeys) {
        return res.status(400).send({
            status: "error",
            error: `The key to update does not exist`
        });
    }

    if (!product) {
        return res.status(400).send({
            status: "error",
            error: `Product with ID ${productId} not found`
        })
    }

    if (update.id){
        return res.status(400).send({
            status: "error",
            error: "Product ID cannot be changed",
        })
    }

    await productManager.updateProduct(productId,update);
    return res.send({
        status: "success",
        payload: `product updated suffessfully.`
    })
})

router.delete('/:pid', async (req,res) => {
    const prodId = req.params.pid;
    const product = await productManager.getProductById(prodId);

    if (!product) {
        return res.status(404).send({
            status: "error",
            error: `Product with ID ${prodId} was not found`
        })
    }

    const deleted = await productManager.deleteProduct(prodId);

    if (!deleted) {
        return res.status(404).send({
            status: "error",
            error: `Something went wrong while deleting the product`
        })
    }

    return res.send({
        status: "success",
        payload: "product deleted successfully"
    })
})

export default router