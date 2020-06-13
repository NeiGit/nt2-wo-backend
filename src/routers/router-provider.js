import { Logger } from 'neilog'
import Models from '../business-models/business-models-provider.js'
import Repos from '../repositories/repositories-provider.js'
import { BaseRouter } from './base-router.js'

const userRouter = () => BaseRouter.newInstance(Models.User, Repos.UserRepo, new Logger('User router')).getRouter()
const exerciseRouter = () => BaseRouter.newInstance(Models.Exercise, Repos.ExerciseRepo, new Logger ('Exercise router')).getRouter()
const workoutRouter = () => BaseRouter.newInstance(Models.Workout, Repos.WorkoutRepo, new Logger ('Workout router')).getRouter()


export default { userRouter, exerciseRouter, workoutRouter }