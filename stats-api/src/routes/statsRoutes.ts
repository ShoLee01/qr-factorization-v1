/**
 * Statistics API Router manages statistical processing endpoints and authentication flows.
 * Implements security policies and routes configuration for data analysis operations.
 * 
 * This router centralizes access control and request routing for the statistics subsystem,
 * enforcing authentication requirements and endpoint organization.
 */
import { Router } from 'express';
import { StatsController } from '../controllers/statsController';
import { authenticateJWT } from '../middleware/jwtMiddleware';
import { loginHandler } from '../services/loginService';

const router = Router();

/**
 * Protected Statistics Endpoint
 * @route POST /stats
 * @security bearerAuth
 * @group Data Analytics
 * @param {StatsRequest.model} request.body.required - QR matrices input
 * @returns {StatsResponse.model} 200 - Success response with computed metrics
 * @returns {ErrorResponse.model} 401 - Missing/invalid authentication
 * @returns {ErrorResponse.model} 403 - Forbidden (invalid token)
 * @returns {ErrorResponse.model} 500 - Computation error
 */
router.post('/stats', authenticateJWT, StatsController.calculateStats);

/**
 * Authentication Endpoint
 * @route GET /login
 * @group Authentication
 * @returns {AuthToken.model} 200 - JWT access token
 * @returns {ErrorResponse.model} 500 - Server configuration error
 */
router.get('/login', loginHandler);

export default router;