#1. Usamos una imagen base con node instalacion
FROM node:24

#Creamos carpeta dentro contenedor
WORKDIR /app

#Copiamos todas las dependencias (package.json)
COPY package*.json ./

#Instalamos las dependencias
RUN npm install

#Copiamos todo el proyecto
COPY . .

#Exponemos el puerto (Tu backend usa 3000)
EXPOSE 3000

#Ejecutamos el servidor
CMD ["npm","run","dev<"]
