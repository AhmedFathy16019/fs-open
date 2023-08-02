const mongoose = require('mongoose')

const url =  process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    })

const personSchema = mongoose.Schema({
    name: {
        type: String, 
        minLength: 3,
        required: true
    },
    number: {
        type:String,
        validate: {
            validator: testNumber = (v) => {
                return /^\d{2,3}-\d{6,}/.test(v)
            }
        },
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)