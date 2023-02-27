//HOMEWORK FOR 2ND CLASS

class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        console.log(this.products);
        return;
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {

        const product = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Error: all fields are required");
            return;
        }

        if (this.products.some(p => p.code === code)) {
            console.log("Error: The product code already exists");
            return;
        }

        this.products.push(product);
    }

    getProductByID = (code) => {
        const findProduct = this.products.find((product) => product.code === code);
        if (!findProduct) {
            console.log("error: Not Found");
            return;
        }
        console.log(findProduct);
        return;
    }
}

const productManager = new ProductManager();

console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.getProducts());
console.log(productManager.addProduct("producto prueba","Este es un producto prueba",200,"sin imagen","abc123",25));
console.log(productManager.getProductByID("abc123"));

