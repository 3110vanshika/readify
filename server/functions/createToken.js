const jwt = require('jsonwebtoken')

function createToken(obj){
    return jwt.sign(obj, process.env.JWT_SECRET, {expiresIn: '1d'});
}

module.exports = createToken