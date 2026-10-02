const { readFileWithDelay, writeFile } = require('../database/db');

async function findAll() {
    return readFileWithDelay();
}

async function findById(id) {
    const products = await readFileWithDelay();
    return products.find((product) => product.id === id) || null;
}

async function create(productData) {
    const products = await readFileWithDelay();
    const id = products.length ? Math.max(...products.map((product) => product.id)) + 1 : 1;
    const product = { id, name: productData.name, price: productData.price };
    products.push(product);
    await writeFile(products);
    return product;
}

async function update(id, updatedData) {
    const products = await readFileWithDelay();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    products[index] = {
        ...products[index],
        ...(updatedData.name !== undefined && { name: updatedData.name }),
        ...(updatedData.price !== undefined && { price: Number(updatedData.price) })
    };
    await writeFile(products);
    return products[index];
}

async function deleteById(id) {
    const products = await readFileWithDelay();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    const [deleted] = products.splice(index, 1);
    await writeFile(products);
    return deleted;
}

module.exports = { findAll, findById, create, update, deleteById };
