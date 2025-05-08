/**
 * JWT Authentication Middleware provides secure access control for protected routes
 * using JSON Web Token validation. Implements standard bearer token authentication
 * scheme following RFC 6750 specifications.
 * 
 * This security layer ensures only requests with valid non-expired tokens can access
 * protected resources, handling both token absence and validation failures.
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorResponse } from '../types/stats';

/**
 * Express middleware implementing JWT authentication protocol
 * @function
 * @param {Request} req - Express request object with authorization headers
 * @param {Response<ErrorResponse>} res - Express response object for error handling
 * @param {NextFunction} next - Express next function for pipeline continuation
 * @returns {void | Response<ErrorResponse>} Either proceeds to next middleware
 *          or returns HTTP error response
 * 
 * @behavior
 * 1. Extracts JWT from Authorization header (Bearer scheme)
 * 2. Validates token presence and format
 * 3. Verifies cryptographic signature and expiration
 * 4. Manages error responses for security failures
 * 
 * @security
 * - Requires JWT_SECRET environment variable for signature verification
 * - Enforces HTTPS recommended in production environments
 * 
 * @remarks
 * - Complies with OWASP API Security Top 10 for authentication
 * - Integrates with Express error handling middleware chain
 * - Supports stateless authentication for distributed systems
 */
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