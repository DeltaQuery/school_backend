const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', authController.logout)

router.get('/myProfile', authController.protect, userController.getMyProfile)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
)

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)

module.exports = router



