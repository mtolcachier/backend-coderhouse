import fs from 'fs';

export default class ProductManager {

    constructor() {
        this.path = "./src/files/Products.json"
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

    addProduct = async (product = {title, description, code, price, stock, category, thumbnails}) => {

        try {
            product.stock > 0 
                ? product = { status: true, ...product}
                : product = { status: false, ...product};

            const products = await this.getProducts();

            if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
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
            )
        } catch (error) {
            console.error(error)
        }
}

    getProductByID = async (id) => {

        const products = await this.getProducts();
        const findProduct = products.findIndex((product) => product.id === id);
        if (findProduct >= 0) {
            return products[findProduct];
        } else {
            return
        }
    }

    updateProduct = async (id, updates) => {
        const products = await this.getProducts();
        let index = products.findIndex((p) => p.id === id) ;

        if (index === -1) {
            return `Product with ID ${id} was not found`
        }

        if (index !== -1) {
            const product = products[index]
            for (const key in updates)
                product[key] = updates[key];
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(products, null, "\t")
            );
            return "product updadated successfully"
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
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