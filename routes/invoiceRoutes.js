const express = require('express')
const invoiceController = require('../controllers/invoiceController')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, invoiceController.getAllInvoices)
    .post(authController.protect, invoiceController.createInvoice)

router
    .route('/:id')
    .get(authController.protect, invoiceController.getInvoice)
    .patch(
        authController.protect, authController.restrictTo('admin', "coordinator"), invoiceController.updateInvoice)
    .delete(
        authController.protect, authController.restrictTo('admin'), invoiceController.deleteInvoice)

module.exports = router 


