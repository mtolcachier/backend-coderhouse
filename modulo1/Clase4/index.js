import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();

const env = async () => {
    
    let firstCheck = await productManager.getProducts();
    console.log(firstCheck);

    const product1 = {
        title: "producto prueba",
        description:"Este es un producto prueba",
        price:200,
        thumbnail:"Sin imagen",
        code:"abc123",
        stock:25
    };

    let firstProduct = await productManager.addProduct(product1);
    console.log(firstProduct)

    let secondCheck = await productManager.getProducts();
    console.log(secondCheck);

    const product2 = {
        title: "producto prueba 2",
        description:"Este es un producto prueba",
        price:150,
        thumbnail:"Sin imagen",
        code:"def666",
        stock:33
    };

    let secondProduct = await productManager.addProduct(product2);
    console.log(secondProduct);

    let thirdCheck = await productManager.getProducts();
    console.log(thirdCheck);
    
    let searchById = await productManager.getProductByID("abc123");
    console.log(searchById);
    
    
    let toUpdate = await productManager.updateProduct("abc123","thumbnail","como estas");
    console.log(toUpdate);
    
    let deleteItem = await productManager.deleteProduct("def666");
    console.log(deleteItem);
};

env()