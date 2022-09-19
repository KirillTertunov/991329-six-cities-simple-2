import 'reflect-metadata';
import {inject, injectable} from 'inversify';

import { LoggerInterface } from '../common/logger/logger.interface.js';
import { ConfigInterface } from '../common/config/config.interface.js';
import { Component } from '../types/component.types.js';

@injectable()
export default class Application {
  private logger!: LoggerInterface;
  private config!: ConfigInterface;

  constructor(
  @inject(Component.ConfigInterface) config: ConfigInterface,
  @inject(Component.LoggerInterface) logger: LoggerInterface) {
    this.logger = logger;
    this.config = config;
  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
