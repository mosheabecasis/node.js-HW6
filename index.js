const express = require('express')
const path = require('path')

const product_repo = require('./product_repo')

const port = 8080

const app = express()

// to server static pages
//app.use(express.static(path.join(__dirname, '/')))

// for POST json 
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get('/products', async (req, res) => {
    const products = await product_repo.getAllProducts();
    res.status(200).json({ products })
});

app.get('/products/:product_id', async (req, res) => {
    const product_id = req.params.product_id
    const product = await product_repo.getProductById(product_id);
    res.status(200).json({ product })
});

app.delete('/products/:product_id', async (req, res) => {
    try {
        const product_id = req.params.product_id
        const result = await product_repo.deleteProduct(product_id)
        res.status(200).json({
            res: 'success',
            url: `localhost:8080/products/${product_id}`,
            result
        })
    }
    catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.put('/products/:product_id', async (req, res) => {
    try {
        const product_id = req.params.product_id
        product = req.body
        const result = await product_repo.updateProduct(product, product_id)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/products/${product.ID}`,
            result
        })

    }
    catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
});

app.post('/products', async (req, res) => {
    try {
        product = req.body
        const result = await product_repo.addProduct(product)
        res.status(201).json({
            res: 'success',
            url: `localhost:8080/products/${result[0]}`,
        })
    }
    catch (e) {
        res.status(400).send({
            status: 'fail',
            message: e.message
        })
    }
})

app.listen(port, () => console.log(`Listening to port ${port}`));