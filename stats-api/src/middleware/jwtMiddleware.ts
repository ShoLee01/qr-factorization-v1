import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../types/stats';

export const authenticateJWT = (
    req: Request,
    res: Response<ErrorResponse>,
    next: NextFunction
  ) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET!, (err) => {
      if (err) {
        res.status(403).json({ error: 'Token inválido o expirado' });
        return;
      }
      next();
    });
  };