# Etapa de construcción optimizada
FROM node:18-alpine AS build

WORKDIR /app

# 1. Copiar solo lo necesario para instalar dependencias
COPY package*.json ./
COPY tsconfig*.json ./

# 2. Instalación limpia de dependencias
RUN npm ci --omit=dev && \
    npm cache clean --force

# 3. Copiar solo archivos relevantes para construcción
COPY src ./src

# 4. Compilar proyecto y limpiar
RUN npm run build && \
    rm -rf src test

# --------------------------------------------
# Etapa de producción ultra ligera
FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /var/task

# 5. Copiar solo lo esencial
COPY --from=build /app/dist ./
COPY --from=build /app/node_modules ./node_modules

# 6. Configuración de seguridad
RUN find . -type f -name "*.d.ts" -delete && \
    find . -type f -name "*.map" -delete

# 7. Permisos de ejecución
RUN chmod -R 755 /var/task

# 8. Variables de entorno (ejemplo)
ENV NODE_ENV=production

CMD ["app.main"]