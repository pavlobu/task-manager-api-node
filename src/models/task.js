const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // same model name as we provided when defining User model
    }
}, {
    timestamps: true
})

// mongoose middleware for hashing password logic
// arrow function is not allowed in mongoose middleware as you need proper access to "this" keyword with isModified
taskSchema.pre('save', async function(next) {
    // this here is access to individual user that we are about to save
    const task = this

    // console.log('before saving task is triggered')

    // important to call next at the end to prevent hanging
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task