import { NextFunction, Request, Response } from 'express';
import { HttpError } from './HttpError';
import { ValidationError } from 'joi';
import { mailQueue } from '../workers/email';
import configs from '../../config/default';
import { userQuery } from '../interfaces';
// import configs from "../../config/default";

/*
 * This is from the library https://github.com/Abazhenov/express-async-handler
 * Made some customization for our project. With this, we can throw Error from
 * the handler function or internal function call stack, and parse the error,
 * send to the client with appropriate response (http error code & json body)
 *
 * USAGE: wrap the express handler with this function:
 *
 *  router.get("/xxx", handlerWrap(async (res, rep, next) => {
 *    ...
 *  }));
 *
 *  Then, add the errorHandler below to the express global error handler.
 *
 */
export const handlerWrapper = (fn: any) =>
  function wrap(...args: any[]): Promise<any> {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch((e) => {
      next(e);
    });
  };

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  //   log.error('catch error:', err);
  if (err instanceof HttpError) {
    res.status(err.status).send(err.message);
  } else if (err instanceof ValidationError) {
    res.status(422).send({
      code: 422,
      message: err.message,
    });
  } else {
    res.status(500).send({
      code: 500,
      message: `Unknown error (${err.message})`,
    });
  }
}

export function signUpHtmlContent(registrationId: string) {
  const verificationUrl = `http://${configs.host}:${configs.port}/auth/verify/${registrationId}`;
  return `<a href=${verificationUrl}>Click here to verify</a>`;
}
export function passwordResetContent(resetId: string) {
  const verificationUrl = `http://${configs.host}:${configs.port}/auth/verify/${resetId}`;
  return `<a href=${verificationUrl}>Click here to reset</a>`;
}

type TSendMail = {
  to: string;
  from: string;
  subject: string;
  html: string;
};
export function sendMail(name: string, mailData: TSendMail, options: object) {
  return mailQueue.add(name, mailData, options);
}
