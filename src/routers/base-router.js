import Joi from "@hapi/joi";
import express from "express";

export class BaseRouter {
    constructor (Model, repo, logger) {
        this.createModel = dto => new Model(dto)
        this.repo = repo
        this.router = express.Router();
        this.logger = logger
        this.configureBasicCrud()
    }

  configureBasicCrud() {
    const {router, repo, createModel, logger} = this
    
    router.route("/create").post(async (req, res, next) => {
      try {
        logger.info(`Requested creation for ${JSON.stringify(req.body)}`)
        const newModel = createModel(req.body);
        const created = await repo.create(newModel);
        res.status(200).json(created);
      } catch (err) {
        logger.error(`An error ocurred when trying to create for ${JSON.stringify(req.body)}`, err)
        next(err);
      }
    });
  
    router.route("/update").post(async (req, res, next) => {
      try {
        logger.info(`Requested update for ${JSON.stringify(req.body)}`)
        await this.validateSingleStringQuery(req.body._id);
        const updatedModel = createModel(req.body);
        const updated = await repo.update(updatedModel);
        res.status(200).json(updated);
      } catch (err) {
        logger.error(`An error ocurred when trying to update for ${JSON.stringify(req.body)}`, err)
        next(err);
      }
    });
  
    router.route("/name/:name").get(async (req, res, next) => {
      try {
        logger.info(`Requested list by name for ${JSON.stringify(req.params.name)}`)
        await this.validateSingleStringQuery(req.params.name);
        const document = await repo.listByName(req.params.name);
        res.status(200).json(document);
      } catch (err) {
          logger.error(`An error ocurred when trying to list by name for ${JSON.stringify(req.params.name)}`, err)
          next(err);
      }
    });
  
    router
      .route("/id/:_id")
      .get(async (req, res, next) => {
        logger.info(`Requested find by id for ${JSON.stringify(req.params._id)}`)
        try {
          await this.validateSingleStringQuery(req.params._id);
          const document = await repo.find(req.params._id);
  
          res.status(200).json(document);
        } catch (err) {
          logger.error(`An error ocurred when trying to find by id for ${JSON.stringify(req.params.name)}`, err)
          next(err);
        }
      })
      .delete(async (req, res, next) => {
        logger.info(`Requested delete by id for ${JSON.stringify(req.body)}`)
        try {
          await this.validateSingleStringQuery(req.params._id);
          await repo.deleteById(req.params._id);
          res.status(200).send(`${req.params._id} succesfully deleted`);
        } catch (err) {
          logger.error(`An error ocurred when trying to delete by id for ${req.params._id}`, err)
          next(err);
        }
      });
  
    router.route("/all").get(async (req, res, next) => {
      logger.info(`Requested get all`)
      try {
        const documents = await repo.listAll();
        res.status(200).json(documents);
      } catch (err) {
        logger.error(`An error ocurred when trying get all`, err)
        next(err);
      }
    });
  }

  async validateSingleStringQuery(query) {
    const schema = Joi.string().required().min(1)
    const { error } = schema.validate(query);
    if (error) {
      throw error;
    }
  }

  getRouter() {
    return this.router
  }

  static getInstance(businessModel, repository, logger) {
    return new BaseRouter(businessModel, repository, logger);
  }
}

