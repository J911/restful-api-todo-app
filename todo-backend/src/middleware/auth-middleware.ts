import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken'
import jwtConfig from '../config/jwt-config'

export const tokenValidationCheck = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(token, jwtConfig.secret, function (err, decoded) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    next();
  });
};