import { BaseRouter } from "./base-router.js";
import { Workout } from "../business-models/workout.js";
import WorkoutRepo from "../repositories/workout-repository.js";
import { Logger } from 'neilog'

export class WorkoutRouter extends BaseRouter {
  constructor(model, repo, logger) {
    super(model, repo, logger);
    this.addExtraConfig();
  }

  addExtraConfig() {
    const { router, repo, logger } = this;
    router.route("/userid/:user_id").get(async (req, res, next) => {
      logger.info(`Requested get workouts for ${req.params.user_id}`)
      try {
        await this.validateSingleStringQuery(req.params.user_id);
        const document = await repo.findUserWorkouts(req.params.user_id);
        res.status(200).json(document);
      } catch (err) {
        logger.error(`An error ocurred when trying to get workouts for ${req.params.user_id}`)
        next(err);
      }
    });
  }
  
  static getInstance() {
    return new WorkoutRouter(Workout, WorkoutRepo, new Logger());
  }
}
