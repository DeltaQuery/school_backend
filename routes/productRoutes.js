const express = require('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, productController.getAllProducts)
    .post(authController.protect, productController.createProduct)

router
    .route('/:id')
    .get(authController.protect, productController.getProduct)
    .patch(
        authController.protect, authController.restrictTo('admin', "coordinator"), productController.updateProduct)
    .delete(
        authController.protect, authController.restrictTo('admin'), productController.deleteProduct)

module.exports = router 


