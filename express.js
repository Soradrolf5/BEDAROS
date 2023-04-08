const productManager = require("./ProductManager")
const express = require('express')

const PUERTO  = 8080

const app = express()

app.get('/products/:pid?', (req, res) => {
    const productId = req.params.pid
    const product = productManager.getProductById(productId)
    res.send(product)
    }
);
app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts()
 const productLimit = products.slice(0, limit)
    if (limit === undefined) {
        res.send(products);
    } else {
        res.send(productLimit)
    }
});

app.listen(PUERTO, () => {
    console.log(`Servidor Express activo en puerto ${PUERTO}`);
})