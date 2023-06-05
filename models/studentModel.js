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

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    student_type: {
        type: String,
        required: true
    },
    student_id: {
        type: Number,
        required: false
    },
    year: {
        type: String,
        required: true,
        enum: ["Sala de 3", "Sala de 4", "Sala de 5", "1er Grado", "2do Grado", "3er Grado", "4to Grado", "5to Grado", "6to Grado", "1er Año", "2do Año", "3er Año", "4to Año", "5to Año"]
    },
    student_level: {
        type: String,
        required: true,
        enum: ["Preescolar", "Básica", "Bachillerato"]
    },
    gender: {
        type: String,
        required: false,
        enum: ["Girl", "Boy"]
    },
    age: {
        type: Number,
        required: false,
        min: [3, 'Age must be above 3'],
        max: [18, 'Age must be below 18']
    },
    scholarship: {
        type: Number,
        required: false,
        default: false
    },
    discount: {
        type: Number,
        required: false,
        default: 0,
        min: [0, 'Discount must be above -1'],
        max: [100, 'Discount must be below 101']
    },
    coll_start: {
        type: Number,
        required: true,
        min: [0, 'Collection must start above 0'],
        max: [11, 'Collection must start below 11']
    },
    coll_end: {
        type: Number,
        required: true,
        min: [0, 'Collection must end above 0'],
        max: [11, 'Collection must end below 11']
    },
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
    retirement_date: {
        type: String,
        required: false
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: [true, 'A student must have a valid customer']
    },
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Invoice",
    }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const student = mongoose.model('student', studentSchema)

module.exports = student
