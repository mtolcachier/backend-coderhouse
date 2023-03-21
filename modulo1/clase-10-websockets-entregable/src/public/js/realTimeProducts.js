const socket = io(); //client side
socket.emit('message','data send through websocket');

const productList = document.getElementById('productList');
const createProductForm = document.getElementById('create-product-form');
const deleteProductForm = document.getElementById('delete-product-form');

createProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('addTitle').value;
    const description = document.getElementById('addDescription').value;
    const price = parseFloat(document.getElementById('addPrice').value);
    const code = document.getElementById('addCode').value;
    const stock = document.getElementById('addStock').value;
    const category = document.getElementById('addCategory').value;
    const thumbnails = document.getElementById('addThumbnails').files;

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('price', price);
    data.append('code', code);
    data.append('stock', stock);
    data.append('category', category);

    for (let i = 0; i < thumbnails.length; i++) {
        const thumbnail = thumbnails[i];
        data.append('thumbnails[]', thumbnail);
    };

    fetch('/api/products/', {
        method: 'POST',
        body: data
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
});

deleteProductForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const prodId = parseInt(document.getElementById('deleteId').value)

    fetch(`/api/products/${prodId}`, {
        method: 'delete',
        body: prodId
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
});

socket.on('products', products =>{
    productList.innerHTML = "";
    products.forEach(prod => {
        productList.innerHTML += `
                                <div>
                                    <p>Title: ${prod.title}</p>
                                    <p>Price: ${prod.price}</p>
                                    <p>Description: ${prod.description}</p>
                                    <p>ID: ${prod.id}</p>
                                    <p>Code: ${prod.code}</p>
                                </div>
                                <hr/>
                                `
    });
});