  
const jwt = require('jsonwebtoken')

exports.getId = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userId = decodedToken.userId
    return userId
}

exports.getRole = (req) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    const userRole = decodedToken.userRole
    return userRole
}