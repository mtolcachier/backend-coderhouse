class ProductManager {

    constructor() {
        this.products = [];
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
            console.log("please submit all the categories: title, description, price, thumbnail, code, stock");
            return
        }

        const productIndex = this.products.indexOf((product) => product.code === productCode);
        if(productIndex >= 0 ) {
            console.log(`The product code ${productCode} already exists`);
            return;
        }

        this.products.push(product)
    }

    getProducts = () => {
        console.log(this.products);
        return
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

console.log(productManager.addProduct("hola","a","b",64654,"d",10,8));
console.log(productManager.addProduct("hola","a","b",15,"d",20,17));

console.log(productManager.getProducts());

console.log(productManager.getProductByID(2));
console.log(productManager.getProductByID(20));