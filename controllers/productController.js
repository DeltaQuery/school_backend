const Product = require('../models/productModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Product.find()
        ,
        req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const products = await features.query

    res.status(200).json({
        status: 'success',
        results: products.length,
        data: {
            products
        }
    })
})

exports.getProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new AppError('No product found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
})

exports.createProduct = catchAsync(async (req, res, next) => {
    const newProduct = await Product.create(req.body)
    if (!newProduct) return next(new AppError('The product could not be created', 404))

    res.status(201).json({
        status: 'success',
        data: {
            ride: newProduct
        }
    })
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    const originalProduct = await Product.findById(req.params.id)
    if (!originalProduct) return next(new AppError('The product id you provided could not be found!', 404))
    // 2) Name only wwanted fields names that are allowed to be updated
    const filteredBody = req.body

    const newProduct = await Product.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    })

    if (!newProduct) {
        return next(new AppError('No product found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            newProduct
        }
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})


