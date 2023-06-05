const mongoose = require('mongoose')
const validator = require('validator')

/* {
    "name": "Carlos",
    "email": "cebracho94@gmail.com",
    "avatar": "https://s5.vcdn.biz/static/f/5463117401/image.jpg",
    "role": "admin",
    "password": "admin",
    "passwordConfirm": "admin"
}*/

const invoiceSchema = new mongoose.Schema({
    createdAt: {
        type: String,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'A student must be created by a valid user']
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    code: {
        type: Number,
    },
    customer_type: {
        type: String,
        enum: ['V', 'E', 'J', "G"],
        required: [true, "Please select a customer type between V (venezuelan), E (foreign), J (company) and G (government)."]
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'An invoice must have a valid customer']
    },
    customer_name: {
        type: String,
        required: true,
    },
    customer_address: {
        type: String,
        required: true,
    },
    customer_phone: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
    },
    customer_city: {
        type: String,
        default: "Maracaibo"
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: [true, 'An invoice must have a valid student']
    },
    student_name: {
        type: String,
        required: true,
    },
    student_surname: {
        type: String,
        required: true,
    },
    student_year: {
        type: String,
        required: true,
        enum: ["Sala de 3", "Sala de 4", "Sala de 5", "1er Grado", "2do Grado", "3er Grado", "4to Grado", "5to Grado", "6to Grado", "1er Año", "2do Año", "3er Año", "4to Año", "5to Año"]
    },
    concepts: {
        type: [String],
        required: true
    },
    usd_amounts: {
        type: [Number],
        required: true
    },
    bs_amounts: {
        type: [Number],
        required: true
    },
    bcv_rates: {
        type: [Number],
        required: true
    },
    transaction_type: {
        type: String,
        enum: ["T", "E", "C"],
        default: "T"
    },
    transaction_id: {
        type: String,
        default: null
    },
    cash: {
        type: Number,
        default: 0
    },
    bank: {
        type: String,
        default: null
    },
    bs_subtotal: {
        type: Number,
        required: true
    },
    usd_subtotal: {
        type: Number,
        required: true
    },
    bs_total: {
        type: Number,
        required: true
    },
    usd_total: {
        type: Number,
        required: true
    },
    sales_tax: {
        type: Boolean,
        default: false
    },
    tax_rate: {
        type: Number,
        default: 16
    },
    credit: {
        type: Boolean,
        default: false
    },
    observations: {
        type: String,
        default: ""
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const invoice = mongoose.model('invoice', invoiceSchema)

module.exports = invoice
