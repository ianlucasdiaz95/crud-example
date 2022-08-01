
const jwt = require('jsonwebtoken');

require('dotenv').config();

const generate = ( data ) => {

    return new Promise((resolve, reject) => {
        
        const payload = {
            data
        }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });

    });
}

const verify = (token) => {

    try {

        return jwt.verify(token, process.env.JWT_KEY);
        
    } catch (error) {

        throw new Error('Invalid token.');

    }
   
}

module.exports = { 
    generate,
    verify
};