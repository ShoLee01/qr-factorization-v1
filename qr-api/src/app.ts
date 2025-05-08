import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import qrRoutes from './routes/qrRoutes';
import { ErrorResponse } from './types/qr';
import serverless from '@codegenie/serverless-express';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rutas
app.use('/api', qrRoutes);

// Manejo de errores global
app.use((
  err: Error, 
  req: express.Request, 
  res: express.Response<ErrorResponse>, 
  next: express.NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// AWS Lambda Handler
const handler = serverless({ app });
export const main = async (event: any, context: any) => {
  return handler(event, context);
};

// Desarrollo local
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`QR API escuchando en http://localhost:${PORT}`);
  });
}