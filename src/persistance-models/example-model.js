import mongoose from 'mongoose'

const Schema = mongoose.Schema

const exampleSchema = new Schema ({
    count: {type: Number, required: true}
}, {timestamps: {createdAt: 'date_created',  updatedAt: 'updated'}})

export default mongoose.model('Example', exampleSchema, 'Examples')

