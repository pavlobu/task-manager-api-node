const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // find if user has a document with provided token in tokens array of documents
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        // passing retreived user value to next request after middleware function is executed
        // to prevent finding user object again in db, which is unnecessary operation
        req.token = token
        req.user = user
        next() // next happens only if auth is succeded
    } catch(e) {
        res.status(401).send({ error: "Please authenticate"})
    }
}

module.exports = auth