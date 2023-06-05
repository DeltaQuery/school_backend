const Invoice = require('../models/invoiceModel')
const Student = require('../models/studentModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.getAllInvoices = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Invoice.find()
        ,
        req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()

    const invoices = await features.query

    res.status(200).json({
        status: 'success',
        results: invoices.length,
        data: {
            invoices
        }
    })
})

exports.getInvoice = catchAsync(async (req, res, next) => {
    const invoice = await Invoice.findById(req.params.id)

    if (!invoice) {
        return next(new AppError('No invoice found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            invoice
        }
    })
})

exports.createInvoice = catchAsync(async (req, res, next) => {
    const newInvoice = await Invoice.create(req.body)
    if (!newInvoice) return next(new AppError('The invoice could not be created', 404))

    await populateStudent(newInvoice.student_id, newInvoice._id)

    res.status(201).json({
        status: 'success',
        data: {
            ride: newInvoice
        }
    })
})

exports.updateInvoice = catchAsync(async (req, res, next) => {
    const originalInvoice = await Invoice.findById(req.params.id)

    if (!originalInvoice) return next(new AppError('The invoice id you provided could not be found!', 404))
    // 2) Name only wwanted fields names that are allowed to be updated
    const filteredBody = req.body

    const newInvoice = await Invoice.findByIdAndUpdate(req.params.id, filteredBody, {
        new: true,
        runValidators: true
    })

    if (!newInvoice) {
        return next(new AppError('No invoice found with that ID', 404))
    }

    if (originalInvoice.student_id !== newInvoice.student_id) {
        await depopulateStudent(originalInvoice.student_id, id)
        await populateStudent(newInvoice.student_id, id)
    }

    res.status(200).json({
        status: 'success',
        data: {
            newInvoice
        }
    })
})

exports.deleteInvoice = catchAsync(async (req, res, next) => {
    const originalInvoice = await Invoice.findById(req.params.id)

    if (!originalInvoice) {
        return next(new AppError('No invoice found with that ID', 404))
    }

    await Invoice.findByIdAndDelete(req.params.id)

    await depopulateStudent(originalInvoice.student_id, req.params.id)

    res.status(204).json({
        status: 'success',
        data: null
    })
})

const depopulateStudent = async (studentId, invoiceId) => {
    try {
            const student = await Student.findById(studentId)

            if (student !== undefined) {
                const idIndex = student.invoices.findIndex(id => {
                    return id == invoiceId
                  })
                student.invoices.splice(idIndex, 1)
                await student.save()
            }
    } catch (error) {
        throw error
    }
}

const populateStudent = async (studentId, invoiceId) => {
    try {
        const student = await Student.findById(studentId)

        if (student !== undefined && !student.invoices.includes(invoiceId)) {
            student.invoices.push(invoiceId)
            await student.save()
        }
    } catch (error) {
        throw error
    }
}
