import { BaseRouter } from "./base-router.js";
import { Example } from "../business-models/example.js";
import ExampleRepo from "../repositories/example-repository.js";
import { Logger } from 'neilog'

export class ExampleRouter extends BaseRouter {
  constructor(model, repo, logger) {
    super(model, repo, logger);
    this.addExtraConfig();
  }

  addExtraConfig() {
    const { router, repo, logger } = this;
    router.route("/floor/:_floor").get(async (req, res, next) => {
      logger.info(`Requested get max`)
      try {
        await this.validateSingleStringQuery(req.params._floor);
        const document = await repo.findGreaterOrEqualsThan(req.params._floor);
        res.status(200).json(document);
      } catch (err) {
        logger.error(`An error ocurred when trying to get max`, err)
        next(err);
      }
    });
  }
  
  static getInstance() {
    return new ExampleRouter(Example, ExampleRepo, new Logger());
  }
}
