import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import statsRoutes from './routes/statsRoutes';
import { ErrorResponse } from './types/stats';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());

// Rutas
app.use('/api', statsRoutes);

// Manejo de errores
app.use((
  err: Error, 
  req: express.Request, 
  res: express.Response<ErrorResponse>, 
  next: express.NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
// Desarrollo local
if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`QR API escuchando en http://localhost:${PORT}`);
  });
}