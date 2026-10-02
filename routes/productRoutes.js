const express = require('express');
const productController = require('../controllers/productController');
const { checkCache, invalidateCacheOnSuccess } = require('../middleware/cacheMiddleware');
const router = express.Router();


router.get('/', checkCache, productController.getProducts);
router.get('/:id',checkCache, productController.getProductById);

// (No checkCache middleware here because POST,PUT,DELETE,PATCH is a mutation!)
router.post('/', invalidateCacheOnSuccess, productController.createProduct);
router.put('/:id', invalidateCacheOnSuccess, productController.updateProduct);
router.delete('/:id', invalidateCacheOnSuccess, productController.deleteProduct);
router.patch('/:id', invalidateCacheOnSuccess, productController.patchProduct);


module.exports = router;
