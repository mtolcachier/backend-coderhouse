import { Router } from "express";
import ProductManager from "../ProductManager.js";
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
                message: {products: limitedProds}
            });
        }

        return res.send({
            status: "success",
            message: {products: products}
        });

    } catch (error) {
        console.error(error)
    }
});

router.get('/:pid', async (req,res)=> {
    try {
        const productId = req.params.pid;
        const numId = parseInt(productId)
        const product = await productManager.getProductById(numId);

        if (numId <= 0 || isNaN(numId)) {
            return res.status(404).send({
                status: "error",
                error: `The product ID ${numId} is not valid`
            })
        }

        if (!product) {
            return res.status(400).send({
                status: "error",
                error: `Sorry! We didn't find any product with the ID: ${productId}.`
            })
        }

        return res.send({
            status: "success",
            message: {product: product}
        })

    } catch (error) {
        console.error(error);
    }
});

router.post('/',uploader.array('thumbnails'), async (req,res) => {
    const newProduct = req.body;
    const photos = req.files;


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
            newProduct.thumbnails.push(file.filename);
        })
    } else {
        newProduct.thumbnails = []
    }

    const products = await productManager.getProducts();
    const indexProduct = products.findIndex((prod) => prod.code === newProduct.code);

    if (indexProduct !== -1) {
        return res.status(400).send({
            status: "error",
            error: `There's already a product with the code ${newProduct.code}`
        })
    }

    await productManager.addProduct(newProduct);
    return res.send({
        status: "success",
        message: `${newProduct.title} uploaded successfully`
    })
})

router.put('/:pid',uploader.array('thumbnails'), async (req,res) => {
    const productId = parseInt(req.params.pid);
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

    

    if (isNaN(productId) || productId <= 0) {
        return res.status(400).send({
            status: "error",
            error: `${productId} is not a valid value`
        })
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
        message: `product updated suffessfully.`
    })
})

router.delete('/:pid', async (req,res) => {
    const prodId = parseInt(req.params.pid);
    const product = await productManager.getProductById(prodId);
    const deleted = await productManager.deleteProduct(prodId);

    if (isNaN(prodId) || prodId <= 0) {
        return res.status(400).send({
            status: "error",
            error: "please check the submited information"
        })
    }

    if (!product) {
        return res.status(404).send({
            status: "error",
            error: `Product with ID ${prodId} was not found`
        })
    }

    if (!deleted) {
        return res.status(404).send({
            status: "error",
            error: `Something went wrong while deleting the product`
        })
    }

    return res.send({
        status: "success",
        message: "product deleted successfully"
    })
})

export default router