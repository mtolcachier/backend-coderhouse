// npm i -y
// npm i nodemon -D
// npm i express
// modificar los scripts del package.json --> "start:dev": "nodemon ./src/app.js"


const express = require("express");

const app = express();

// Ejemplo: consulta en express
app.get("/bienvenida", (req, res) => {
    res.send(`<p style="color: blue;">Bienvenida</p>`);
});

app.get("/usuario", (req, res) => {
    const user = {
        nombre: "Alfredo",
        apellido: "Mercurio",
        edad: 60,
        correo: "alfredo.mercurio@gmail.com"
    }
    res.send(user);
});

app.listen(8080, () => {
    console.log("Servidor arriba en el puerto 8080");
});