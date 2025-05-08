# QR Decomposition Microservices System

## Overview
Sistema de microservicios para Factorización QR de matrices y análisis estadístico, implementando una arquitectura serverless en AWS Lambda. 

### Componentes Principales
1. **QR-API**: Realiza factorización QR de matrices
2. **Stats-API**: Calcula métricas estadísticas de matrices

## Diagrama de Flujo
```bash
Cliente 
  │ 
  ▼ (1) Envía matriz original
API A (Node.js) 
  │ 
  ▼ (2) Calcula Q y R (Factorización QR)
API A (Node.js) 
  │ 
  ▼ (3) Envía Q y R a API B
API B (Node.js) 
  │ 
  ▼ (4) Calcula estadísticas de Q y R
API B (Node.js) 
  │ 
  ▼ (5) Devuelve estadísticas a API A
API A (Node.js) 
  │ 
  ▼ (6) Responde al cliente con Q, R y estadísticas
Cliente
```

## Requisitos Técnicos
- Node.js 18.x
- Docker 20.10+
- AWS CLI v2.4+

## Configuración Inicial
```bash
# Clonar repositorio
git clone https://github.com/ShoLee01/qr-factorization-v1.git

# Instalar dependencias
npm i
```

## Variables de Entorno
| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| JWT_SECRET | Secreto para firmar tokens | 'sup3rS3cr3tK3y!' |
| STATS_API_URL | Endpoint del servicio Stats-API | 'https://stats-api.example.com' |
| JWT_STATS_SECRET | Secreto para autenticación entre servicios | 's3rv1c3S3cr3t!' |

## Uso de las APIs

### 1. Autenticación
```bash
curl -X GET https://8jom7289of.execute-api.us-east-1.amazonaws.com/dev/api/login
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Procesamiento de Matriz
```bash
curl -X POST https://8jom7289of.execute-api.us-east-1.amazonaws.com/dev/api/qr \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "matrix": [
      [1, 0],
      [0, 1]
    ]
  }'
```

**Respuesta Exitosa:**
```json
{
  "q": [[1,0],[0,1]],
  "r": [[1,0],[0,1]],
  "max": 1,
  "min": 0,
  "total": 4,
  "average": 0.5,
  "isQDiagonal": true,
  "isRDiagonal": true
}
```

### 3. Estadísticas de Matrices (Comunicación Interna)
```bash
curl -X POST https://xzg4fjaitj.execute-api.us-east-1.amazonaws.com/dev/api/stats \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "q": [[1,0],[0,1]],
    "r": [[1,0],[0,1]]
  }'
```

**Respuesta:**
```json
{
  "max": 1,
  "min": 0,
  "total": 4,
  "average": 0.5,
  "isQDiagonal": true,
  "isRDiagonal": true
}
```

## Despliegue Local con Docker
```bash
# Construir imágenes
docker compose build

# Iniciar servicios
docker compose up -d

# Ver logs
docker compose logs -f
```

## Despliegue en AWS
```bash
# Autenticación en ECR
aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY

# Desplegar QR-API
docker push $ECR_REGISTRY/qr-api:latest

# Desplegar Stats-API
docker push $ECR_REGISTRY/stats-api:latest
```

## Testing
```bash
# Ejecutar tests unitarios
npm test

# Generar reporte de cobertura
npm run test:coverage
```

## Estructura del Proyecto
```
.
├── qr-api/
│   ├── src/
│   │   ├── controllers/   # Lógica de endpoints
│   │   ├── services/      # Factorización QR
│   │   └── middleware/    # Autenticación JWT
├── stats-api/
│   ├── src/
│   │   ├── controllers/   # Manejo de estadísticas
│   │   └── services/      # Cálculos matemáticos
│   │   └── middleware/    # Autenticación JWT
```


## Licencia
Distribuido bajo licencia MIT. Ver [LICENSE](LICENSE) para detalles.
