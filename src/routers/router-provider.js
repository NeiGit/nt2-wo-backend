import { Logger } from 'neilog'
import Models from '../business-models/business-models-provider.js'
import Repos from '../repositories/repositories-provider.js'
import { BaseRouter } from './base-router.js'

//const exampleRouter = () => ExampleRouter.getInstance().getRouter();
const exerciseRouter = () => BaseRouter.getInstance(Models.Exercise, Repos.ExerciseRepo, new Logger ('Exercise router')).getRouter()
const workoutRouter = () => BaseRouter.getInstance(Models.Workout, Repos.WorkoutRepo, new Logger ('Workout router')).getRouter()

export default { exerciseRouter, workoutRouter }