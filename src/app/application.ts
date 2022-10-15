import 'reflect-metadata';
import express, {Express} from 'express';
import { inject, injectable } from 'inversify';

import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
// import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    // @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.OfferController) private OfferController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
  ) {
    this.expressApp = express();
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.OfferController.router);
    this.expressApp.use('/users', this.userController.router);
  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    const url = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(url);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

    // const res = await this.offerService.findById('633997aeb234e976d8fe8460');
    // console.log(res);
  }
}
