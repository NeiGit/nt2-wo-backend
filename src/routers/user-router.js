import { BaseRouter } from "./base-router.js";
import { User } from "../business-models/user.js";
import UserRepo from "../repositories/user-repository.js";
import { Logger } from 'neilog'
import Joi from '@hapi/joi'

export class UserRouter extends BaseRouter {
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
    router.route("/login/").post(async (req, res, next) => {
      logger.info(`Requested login for ${JSON.stringify(req.body)}`)
      try {
        await this.validateUserBasicData(req.body);
        const document = await repo.findLogin(req.body);
        res.status(200).json(document);
      } catch (err) {
        logger.error(`An error ocurred when trying to login for ${req.body}`, err)
        next(err);
      }
    });
    router.route("/signup/").post(async (req, res, next) => {
      logger.info(`Requested signup for ${JSON.stringify(req.body)}`)
      try {
        await this.validateUserBasicData(req.body);
        const document = await repo.signup(req.body);
        res.status(200).json(document);
      } catch (err) {
        logger.error(`An error ocurred when trying to signup for ${req.body}`, err)
        next(err);
      }
    });
  }

  async validateUserBasicData(query) {
    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required()
    })
    const { error } = schema.validate(query);
    if (error) {
      throw error;
    }
  }
  
  static getInstance() {
    return new UserRouter(User, UserRepo, new Logger());
  }
}
