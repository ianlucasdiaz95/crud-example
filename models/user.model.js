const {Schema, model} = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//Modify response to return only the necessary data
userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    
    user.uid = _id;
    
    return user;
}

module.exports = model('User', userSchema);