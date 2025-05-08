/**
 * API Router orchestrates endpoint routing and security configuration for the QR processing system.
 * Implements RESTful endpoint management with JWT authentication for protected resources.
 * 
 * This router acts as the central routing configuration hub, enforcing security policies
 * and coordinating request flow between controllers and services.
 */
import { Router } from 'express';
import { QRController } from '../controllers/qrController';
import { authenticateJWT } from '../middleware/jwtMiddleware';
import { loginHandler } from '../services/loginService';

const router = Router();

/**
 * Protected QR Processing Endpoint
 * @route POST /qr
 * @security bearerAuth
 * @group QR Operations
 * @param {Matrix.model} request.body.required - Matrix input payload
 * @returns {QRResult.model} 200 - QR decomposition with statistics
 * @returns {ErrorResponse.model} 401 - Missing/invalid authentication
 * @returns {ErrorResponse.model} 403 - Forbidden (invalid token)
 * @returns {ErrorResponse.model} 500 - Processing error
 */
router.post('/qr', authenticateJWT, QRController.processMatrix);

/**
 * Authentication Gateway Endpoint
 * @route GET /login
 * @group Authentication
 * @returns {AuthToken.model} 200 - JWT access token
 * @returns {ErrorResponse.model} 401 - Invalid credentials
 */
router.get('/login', loginHandler);

export default router;

/** 
 * Architectural Responsibilities:
 * 1. Route Dispatching: Maps HTTP verbs/paths to controller handlers
 * 2. Security Enforcement: Applies JWT middleware to protected routes
 * 3. API Segmentation: Organizes endpoints into logical groups
 * 4. Error Handling: Propagates error responses through middleware chain
 * 
 * Security Model:
 * - Public route: /login (authentication entry point)
 * - Protected route: /qr (requires valid JWT)
 * - Implements zero-trust architecture for protected resources
 * 
 * OpenAPI Compliance:
 * - Annotations follow OpenAPI 3.0 specification format
 * - Enables automated API documentation generation
 */