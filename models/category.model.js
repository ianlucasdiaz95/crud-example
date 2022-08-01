const {Schema, model} = require('mongoose');

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

//Modify response to return only the necessary data
categorySchema.methods.toJSON = function () {
    const { __v, ...category } = this.toObject();

    return category;
}


module.exports = model('Category', categorySchema);