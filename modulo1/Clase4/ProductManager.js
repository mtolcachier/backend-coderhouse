//HOMEWORK FOR 4TH CLASS - file management
import fs from 'fs';

export default class ProductManager {

    constructor() {
        this.path = "./modulo1/clase4/Products.json"
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    };

    addProduct = async (product = {title, description, price, thumbnail, code, stock}) => {

        const products = await this.getProducts();

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return "Error: all fields are required";
        }

        if (products.some(p => p.code === product.code)) {
            return "Error: The product code already exists";
        }

        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }

        products.push(product)
        await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
        );
}

    getProductByID = async (code) => {

        const products = await this.getProducts();
        const findProduct = products.findIndex((product) => product.code === code);
        if (findProduct >= 0) {
            return products[findProduct];
        } else {
            return `error: Not Found`
        }
    }

    updateProduct = async (code, key, value) => {
        const products = await this.getProducts();
        let productCheck = products.find((p) => p.code === code) ;
        let checkKey = key in products ? true : false;
        if (productCheck && checkKey === true) {
            const index = products.findIndex((product) => product.code === code);
            products[index][key] = value;
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(products, null, "\t")
            );
            return "product updadated successfully"
        } else {
            return "error: please check the submited information"
        }
    }

    deleteProduct = async (code) => {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.code === code);
        if (index != -1) {
            products.splice(index, 1);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(products, null, "\t")
            );
            return "Product deleted successfully " + products;
        } else {
            return `Error: the product doesn't exist`
        }
    }
}