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

const customerSchema = new mongoose.Schema({
    customer_type: {
        type: String,
        enum: ['V', 'E', 'J', "G"],
        required: [true, "Please select a customer type between V (venezuelan), E (foreign), J (company) and G (government)."]
      },
      customer_id: {
        type: Number,
        required: true,
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
      billing_type: {
        type: String,
        enum: ['V', 'E', 'J', "G"],
        required: [true, "Please select a customer type between V (venezuelan), E (foreign), J (company) and G (government)."]
      },
      billing_id: {
        type: Number,
        required: true,
      },
      billing_name: {
        type: String,
        required: true,
      },
      billing_address: {
        type: String,
        required: true,
      },
      billing_phone: {
        type: String,
        required: true,
      },
      billing_email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email.']
      },
      createdAt: {
        type: String,
        default: Date.now()
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'A customer must be created by a valid user']
      },
      active: {
        type: Boolean,
        default: true,
        select: false
    },
      students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
      }]
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const customer = mongoose.model('customer', customerSchema)

module.exports = customer
