class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        console.log(this.products);
        return;
    }

    addProduct = (title, description, price, thumbnail, code, stock, productCode) => {

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

        if (this.products.some(p => p.code === productCode)) {
            console.log("Error: The product code already exists");
            return;
        }

        this.products.push(product);
    }

    getProductByID = (productId) => {
        const findProduct = this.products.find((product) => product.id === productId);
        if (!findProduct) {
            console.log("error: Not Found");
            return;
        }
        console.log(findProduct);
        return;
    }
}

const productManager = new ProductManager();

console.log(productManager.addProduct("hola",10,8));
console.log(productManager.addProduct("hola","a","b",15,"d",20,17));
console.log(productManager.addProduct("hola","a","b",15,"d",1,17));

console.log(productManager.getProducts());

console.log(productManager.getProductByID(1));
console.log(productManager.getProductByID(15));
