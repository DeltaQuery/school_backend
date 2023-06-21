const Customer = require('../models/customerModel')
const Student = require('../models/studentModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllCustomers = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Customer.find()
        .populate({ path: "students", model: Student })

        //if I want to show certain fields, use select:
        //.populate({ path: "student", model: Student, select: { "orders_history": 0, "photo": 0, "user_type": 0 } })
        ,
        req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const customers = await features.query

    res.status(200).json({
        status: 'success',
        results: customers.length,
        data: {
            customers
        }
    })
})

exports.getCustomer = catchAsync(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id).populate({ path: "student", model: Student })

    if (!customer) {
        return next(new AppError('No customer found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            customer
        }
    })
})

exports.createCustomer = catchAsync(async (req, res, next) => {
    const newCustomer = await Customer.create(req.body)
    if (!newCustomer) return next(new AppError('The customer could not be created', 404))

    res.status(201).json({
        status: 'success',
        data: {
            customer: newCustomer
        }
    })
})

exports.updateCustomer = catchAsync(async (req, res, next) => {
    const originalCustomer = await Customer.findById(req.params.id)
    if (!originalCustomer) return next(new AppError('The customer id you provided could not be found!', 404))
    // 2) Name only wwanted fields names that are allowed to be updated
    const filteredBody = req.body

    const newCustomer = await Customer.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    })

    if (!newCustomer) {
        return next(new AppError('No customer found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            newCustomer
        }
    })
})

exports.deleteCustomer = catchAsync(async (req, res, next) => {
    const originalCustomer = await Customer.findById(req.params.id)

    if (!originalCustomer) {
        return next(new AppError('No customer found with that ID', 404))
    }

    if (originalCustomer?.students.length > 0) {
        return next(new AppError('Cannot delete the customer until associated students are removed. Associate students to new customer before deleting this one.', 400))
    }

    await Customer.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})