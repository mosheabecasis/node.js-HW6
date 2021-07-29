const connectedKnex = require('./knex_connector');

function getAllProducts() {
    return connectedKnex('products').select('*');
}

function getProductById(id) {
    return connectedKnex('products').select('*').where('id', id).first();
}

function addProduct(product) {
    return connectedKnex("products").insert(product).returning('id');
}

function updateProduct(product, id) {
    return connectedKnex("products").where('id', id).update(product);
}

function deleteProduct(id) {
    return connectedKnex("products").where('id', id).del()
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}