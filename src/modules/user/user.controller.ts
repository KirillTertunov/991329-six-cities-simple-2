import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import {JWT_ALGORITM} from './user.constant.js';

import LoginUserDto from './dto/login-user.dto.js';
import CreateUserDto from './dto/create-user.dto.js';
import HttpError from '../../common/errors/http-error.js';
import UserResponse from './response/user.response.js';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UserServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import LoggedUserResponse from './response/logged-user.response.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface)
    private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface)
    private readonly configService: ConfigInterface
  ) {
    super(logger);
    this.logger.info('Register routes for UserControllerâ€¦');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByEmail(req.user.email);

    this.ok(res, fillDTO(LoggedUserResponse, user));
  }

  public async create(
    {
      body,
    }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email Â«${body.email}Â» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT')
    );
    this.send(res, StatusCodes.CREATED, fillDTO(UserResponse, result));
  }

  public async login(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    console.log('user =>>>>', JWT_ALGORITM, this.configService.get('JWT_SECRET'));

    let token = null;

    try {
      token = await createJWT(
        JWT_ALGORITM,
        this.configService.get('JWT_SECRET'),
        { email: user.email, id: user.id}
      );

    } catch(err) {
      console.log(err);
    }


    console.log('user =>>>>', token);

    this.ok(res, fillDTO(LoggedUserResponse, {email: user.email, token}));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }
}
