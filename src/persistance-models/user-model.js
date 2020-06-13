import mongoose from 'mongoose'

const Schema = mongoose.Schema

const User = new Schema ({
    name: {type: String, required: true, unique},
    password: {type: String, required: true}
}, {timestamps: {createdAt: 'created',  updatedAt: 'updated'}})

export default mongoose.model('User', exampleSchema, 'Users')