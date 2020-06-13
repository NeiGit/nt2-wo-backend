import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: {createdAt: 'created',  updatedAt: 'updated'}})

export default mongoose.model('User', userSchema, 'Users')