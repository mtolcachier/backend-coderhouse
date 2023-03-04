import ProductManager from "./ProductManager.js";
import express, {urlencoded} from 'express' ;

const productManager = new ProductManager('./Products.json');

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.get('/products', async (req,res)=> {
    try {
        const products = await productManager.getProducts();
        const limit = req.query.limit;
        if (limit > 0 && limit <= 10) {
            const limitedProds = products.slice(0,limit);
            res.send({products: limitedProds});
        } else if (limit <= 0 || limit > 10){
            res.send({eror: `We couldn't fulfill your request. Please check the submited information.`});
        } else {
            res.send({products: products});
        }

    } catch (error) {
        console.error(error)
    }
});

app.get('/products/:pid', async (req,res)=> {
    try {
        const productId = req.params.pid;
        const numId = parseInt(productId)
        const product = await productManager.getProductByID(numId);
        if (product) {
            res.send({product: product})
        } else {
            res.send({error: `Sorry! We didn't find any product with the ID: ${productId}`})
        }
    } catch (error) {
        console.error(error);
        res.send({error: `OOPS! An error has ocurred, please try later.`})
    }
});

app.listen(8080, () => {
    console.log("Express server listening on port 8080");
});