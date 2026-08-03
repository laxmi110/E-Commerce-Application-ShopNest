const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    category: { type: String, require: true },
    stock: { type: Number, require: true },
    imageUrl: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema) 