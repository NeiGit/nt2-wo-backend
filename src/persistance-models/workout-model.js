import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workoutSchema = new Schema ({
    title: {type: String, required: true},
    rounds: {type: Number, required: true},
    userId: {type: String, required: true},
    sets: []
}, {timestamps: {createdAt: 'created',  updatedAt: 'updated'}})

export default mongoose.model('Workout', workoutSchema, 'Workouts')