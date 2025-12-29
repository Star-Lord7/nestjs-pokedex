<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

### Proyecto de NestJS
Pequeña API para aprender a usar el framework de NestJS y conocer todos los recursos y fácilidades que ofrece esta técnologia. La API consiste en obtener los pokemons desde la APIPOKEMON V2 y guardarlos en MongoDB, usando támbien un contenedor de Docker.

## Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm i
```
3. Tener CLI instalado
```
npm i -g @nest/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
6. Llenar las variables de entorno definidas en el __.env__
7. Ejecutar la aplicacion en dev:
```
npm run start:dev
```

6. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```
## Endpoints
1. Producción: 
* https://nestjs-pokedex-rbdw.onrender.com/api/v2/pokemon?limit=10
* https://nestjs-pokedex-rbdw.onrender.com/api/v2/pokemon?limit=10&offset=10

2. Desarrollo:
* SEED: http://localhost:3000/api/v2/seed
* GET: http://localhost:3000/api/v2/pokemon
* POST: http://localhost:3000/api/v2/pokemon
* PATCH: http://localhost:3000/api/v2/pokemon/[id del pokemon]
* DELETE: http://localhost:3000/api/v2/pokemon/[id del pokemon]


## Stack usado
* NestJS
* MongoDB
* Docker
