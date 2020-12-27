import * as express from 'express';

interface JsonBody {
  message: string;
  error?: string;
}

export abstract class BaseController {
  public static jsonResponse(
    res: express.Response,
    code: number,
    body: JsonBody,
  ) {
    return res.status(code).json({ ...body });
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, { message, error }: JsonBody) {
    return BaseController.jsonResponse(res, 400, {
      message: message ?? 'Unauthorized',
      error,
    });
  }

  public unauthorized(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 401, {
      message: message ?? 'Unauthorized',
    });
  }

  public paymentRequired(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 402, {
      message: message ?? 'Payment required',
    });
  }

  public forbidden(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 403, {
      message: message ?? 'Unauthorized',
    });
  }

  public notFound(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 404, {
      message: message ?? 'Not found',
    });
  }

  public methodNotAllowed(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 405, {
      message: message ?? 'Method not allowed',
    });
  }

  public conflict(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 409, {
      message: message ?? 'Conflict',
    });
  }

  public tooMany(res: express.Response, { message }: JsonBody) {
    return BaseController.jsonResponse(res, 429, {
      message: message ?? 'Too many requests',
    });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public fail<T>(res: express.Response, error: T | string) {
    const err = typeof error === 'string' ? { message: error } : error;
    return res.status(500).json(err);
  }
}
