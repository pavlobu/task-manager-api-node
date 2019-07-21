const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain word "password"')
            }
        }
    },
    email: {
        type: String,
        unique : true, // a must
        required: true,
        trim: true,
        lowerCase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,

        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

/**
 * available as a method for created user from User model
 * using 'function' keyword is a must for proper binding
 * to "this"
 **/
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', // userid in userSchema
    foreignField: 'owner' // userid in tasks owner schema
})

/**
 * toJSON is method by mongoose
 * it gets called when you parse user object to json
 * so with this all sensitive data is being removed
 * from user object that is returned to client.
 * mongoose actually calls .toJSON on user object
 * every time we send it to client
 */
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// available as static method for User model
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// mongoose middleware for hashing password logic
// arrow function is not allowed in mongoose middleware as you need proper access to "this" keyword with isModified
userSchema.pre('save', async function(next) {
    // this here is access to individual user that we are about to save
    const user = this

    // isModified method can be used in middleware
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // important to call next at the end to prevent hanging
    next()
})

// Delete user tasks when user is removed from system
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User