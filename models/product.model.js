const {Schema, model} = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    }
});

//Modify response to return only the necessary data
productSchema.methods.toJSON = function () {
    const { __v, ...product } = this.toObject();

    return product;
}

module.exports = model('Product', productSchema);