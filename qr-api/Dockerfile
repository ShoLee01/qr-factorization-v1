# 1) Stage de build: instalamos dependencias y compilamos TS a JS
FROM node:18-alpine AS build

WORKDIR /app

# Copiamos package.json / lock
COPY package*.json ./

# Instalamos dependencias
RUN npm ci

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# basados en la imagen de Lambda Node.js
FROM public.ecr.aws/lambda/nodejs:18

# Copiamos solo el código compilado
COPY --from=build /app/dist /var/task
COPY --from=build /app/node_modules /var/task/node_modules
# Si usas .env u otro config, inclúyelo aquí:
# COPY --from=build /app/.env /var/task/.env

CMD ["app.main"]
