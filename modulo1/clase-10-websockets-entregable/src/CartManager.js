import fs from 'fs';

export default class CartManager {
    constructor() {
        this.path = './src/files/Carts.json'
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    };

    addToCart = async (prodId, cartId) => {
        try {
            const carts = await this.getCarts();

            const productToAdd = {
                id: prodId,
                quantity: 1,
            }

            const cart = carts.find((cart) => cart.id === cartId);
            const productIndex = cart.products.findIndex((product) => product.id === prodId);

            productIndex === -1 
                ? cart.products.push(productToAdd)
                : cart.products[productIndex].quantity++;

            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts, null, "\t")
            )
        } catch (error) {
            console.error(error)
        }
}

    getCartById = async (cartId) => {

        const carts = await this.getCarts();
        const findCart = carts.findIndex((cart) => cart.id === cartId);
        if (findCart >= 0) {
            return carts[findCart];
        } else {
            return
        }
    }

    createCart = async () => {
        try {
            const carts = await this.getCarts();
            const newCart = {
                id: 0,
                products: []
            }

            carts.length === 0 
                ? (newCart.id = 1)
                : (newCart.id = carts[carts.length - 1].id + 1);

            carts.push(newCart);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(carts, null, "\t")
            )
        } catch (error) {
            console.error(error)
        }
    }
}