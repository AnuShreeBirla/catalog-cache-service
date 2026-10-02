const productModel = require('../models/productModel');

async function getAllProducts(){
    return productModel.findAll();
}


async function getProductById(id){
    return productModel.findById(id);
}

// Service function to add a new product
async function createProduct(productData) {
    return productModel.create(productData);
}


// Service function to update an existing product
async function updateProduct(id, updatedData) {
    return productModel.update(id, updatedData);
}

// Service function to delete a product by ID
async function deleteProduct(id) {
    return productModel.deleteById(id);
}

async function patchProduct(id, partialData) {
    return productModel.update(id, partialData);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    patchProduct
};
