const express = require('express')
const customerController = require('../controllers/customerController')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, customerController.getAllCustomers)

router
    .route('/:id')
    .get(authController.protect, customerController.getCustomer)
    .patch(
        authController.protect, authController.restrictTo('admin', "coordinator"), customerController.updateCustomer)
    .delete(
        authController.protect, authController.restrictTo('admin'), customerController.deleteCustomer)

module.exports = router 


