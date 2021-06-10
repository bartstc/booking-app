import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HttpException } from '@nestjs/common';
import { Request } from 'express';

import { RequestManager } from './request.manager';

export const corsOptionsDelegate: unknown = (
  req: Request,
  callback: (err: Error, options: CorsOptions) => void,
) => {
  const allowedOrigins = ['http://localhost:3001', 'https://localhost:3001'];
  const allowedPaths = [];

  const corsOptions: CorsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    origin: false,
  };
  let error: Error | null = null;

  const origin = RequestManager.getOrigin(req);
  const path = RequestManager.getPath(req);

  if (
    !origin ||
    !allowedOrigins.length ||
    allowedOrigins.indexOf(origin) !== -1
  ) {
    corsOptions.origin = true;
    error = null;
  } else if (allowedPaths.length && allowedPaths.indexOf(path) !== -1) {
    corsOptions.origin = true;
    error = null;
  } else {
    corsOptions.origin = false;
    error = new HttpException({ status: 400, error: 'CORS_NOT_ALLOWED' }, 400);
  }

  callback(error, corsOptions);
};
