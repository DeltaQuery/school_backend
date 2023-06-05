
const mongoose = require('mongoose')

/* {
    "name": "Carlos",
    "email": "cebracho94@gmail.com",
    "avatar": "https://s5.vcdn.biz/static/f/5463117401/image.jpg",
    "role": "admin",
    "password": "admin",
    "passwordConfirm": "admin"
}*/

const productSchema = new mongoose.Schema({
    concept: {
        type: String,
        required: true,
    },
    price_preescolar: {
        type: Number,
        required: false,
    },
    price_basica: {
        type: Number,
        required: false
    },
    price_bachillerato: {
      type: Number,
      required: false
  },
    scenario: {
        type: Number,
        required: false,
        min: [0, 'Scenario must be above 0'],
        max: [11, 'Scenario must be under 11']
    },
    product_type: {
        type: String,
        required: [true, "product_type must be: Full, Abono, Complemento or Otros."],
        enum: ["Full", "Abono", "Complemento", "Otros"]
    },
    description: {
        type: String,
        default: ""
    },
    sales_tax: {
        type: Boolean,
        default: false
    },
    tax_rate: {
        type: Number,
        required: false,
        default: 16
    },
    pp_preescolar: {
        type: Number,
        required: false,
    },
    pp_basica: {
        type: Number,
        required: false,
    },
    pp_bachillerato: {
      type: Number,
      required: false,
  },
    late_preescolar: {
        type: Number,
        required: false
    },
    late_basica: {
        type: Number,
        required: false
    },
    late_bachillerato: {
      type: Number,
      required: false
  },
    createdAt: {
        type: String,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'A product must be created by a valid user']
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const product = mongoose.model('product', productSchema)

module.exports = product
