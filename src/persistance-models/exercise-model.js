import mongoose from 'mongoose'

const Schema = mongoose.Schema

const exerciseSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    muscleGroups: [],
}, {timestamps: {createdAt: 'created',  updatedAt: 'updated'}})

export default mongoose.model('Exercise', exerciseSchema, 'Exercises')