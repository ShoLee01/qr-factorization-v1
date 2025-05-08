import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../types/stats';


export const loginHandler: RequestHandler<{}, { token: string } | ErrorResponse> = (_req, res) => {
    const secret = process.env.JWT_SECRET!;
    if (!secret) {
      res
        .status(500)
        .json({ error: 'JWT_SECRET no está definido en las variables de entorno' });
      return;  
    }
    const token = jwt.sign({}, secret, { expiresIn: '4d' });
    res.json({ token });
  };