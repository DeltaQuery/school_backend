const Student = require('../models/studentModel')
const Customer = require('../models/customerModel')
const Invoice = require('../models/invoiceModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllStudents = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Student.find()
        .populate({ path: "customer", model: Customer })
        .populate({ path: "invoices", model: Invoice })

        //if I want to show certain fields, use select:
        //.populate({ path: "student", model: Student, select: { "orders_history": 0, "photo": 0, "user_type": 0 } })
        ,
        req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const students = await features.query

    res.status(200).json({
        status: 'success',
        results: students.length,
        data: {
            students
        }
    })
})

exports.getStudent = catchAsync(async (req, res, next) => {
    const student = await Student.findById(req.params.id)
        .populate({ path: "customer", model: Customer })
        .populate({ path: "invoice", model: Invoice })

    if (!student) {
        return next(new AppError('No student found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    })
})

exports.createStudent = catchAsync(async (req, res, next) => {
    const newStudent = await Student.create(req.body)
    if (!newStudent) return next(new AppError('The student could not be created', 404))

    await populateCustomer(newStudent.customer, newStudent._id)

    res.status(201).json({
        status: 'success',
        data: {
            ride: newStudent
        }
    })
})

exports.updateStudent = catchAsync(async (req, res, next) => {
    const originalStudent = await Student.findById(req.params.id)
    if (!originalStudent) return next(new AppError('The student id you provided could not be found!', 404))
    // 2) Name only wwanted fields names that are allowed to be updated
    const filteredBody = req.body

    const newStudent = await Student.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    })

    if (!newStudent) {
        return next(new AppError('No student found with that ID', 404))
    }

    if (originalStudent.customer !== newStudent.customer) {
        await depopulateCustomer(originalStudent.customer, req.params.id)
        await populateCustomer(newStudent.customer, req.params.id)
    }

    res.status(200).json({
        status: 'success',
        data: {
            newStudent
        }
    })
})

exports.deleteStudent = catchAsync(async (req, res, next) => {
    const originalStudent = await Student.findById(req.params.id)

    if (!originalStudent) {
        return next(new AppError('No student found with that ID', 404))
    }

    if (originalStudent?.students.length > 0) {
        return next(new AppError('Cannot delete the student until associated students are removed', 400))
    }

    await Student.findByIdAndDelete(req.params.id)

    await depopulateCustomer(originalStudent.customer, req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})

const depopulateCustomer = async (customerId, studentId) => {
    try {
        const customer = await Customer.findById(customerId)

        if (customer !== undefined) {
            const idIndex = customer.students.findIndex(id => id == studentId)
            if (idIndex !== -1) {
                customer.students.splice(idIndex, 1)
                await customer.save()
            }
        }
    } catch (error) {
        throw error
    }
}

const populateCustomer = async (customerId, studentId) => {
    try {
        const customer = await Customer.findById(customerId)

        if (customer !== undefined && !customer.students.includes(studentId)) {
            customer.ESTUDIANTES.push(studentId)
            await customer.save()
        }
    } catch (error) {
        throw error
    }
}
