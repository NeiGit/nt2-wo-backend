import { Logger } from 'neilog'
import Models from '../business-models/business-models-provider.js'
import Repos from '../repositories/repositories-provider.js'
import { BaseRouter } from './base-router.js'
import { UserRouter } from './user-router.js'
import { WorkoutRouter } from './workout-router.js'

const userRouter = () => UserRouter.getInstance().getRouter()
const exerciseRouter = () => BaseRouter.newInstance(Models.Exercise, Repos.ExerciseRepo, new Logger ('Exercise router')).getRouter()
const workoutRouter = () => WorkoutRouter.getInstance().getRouter()


export default { userRouter, exerciseRouter, workoutRouter }