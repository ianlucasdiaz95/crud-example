module.exports = {
    ...require('./fields.middleware'),
    ...require('./auth.middleware'),
    ...require('./role.middleware')
}