const express = require('express')
const studentController = require('../controllers/studentController')
const authController = require('../controllers/authController')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, studentController.getAllStudents)

router
    .route('/:id')
    .get(authController.protect, studentController.getStudent)
    .patch(
        authController.protect, authController.restrictTo('admin', "coordinator"), studentController.updateStudent)
    .delete(
        authController.protect, authController.restrictTo('admin'), studentController.deleteStudent)

module.exports = router 


