# Backend

El backend es el encargado de procesar la lógica del negocio, exponer la api al front de la aplicación

## Levantar docker

```sh

# Levantar solo el servicio del backend y sus dependecias
$ docker-compose up autominder_backend

# Levantar solo el servicio de base de datos
$ docker-compose up autominder_postgres

# O levantar todos los contenedores
$ docker-compose up -d
```

## Frameork

Se utiliza el framework [Express](https://expressjs.com/)

## Estructura de archivos

- config
- Controller
- interfaces
- model
- route
- service
- tests
- types
- utils
main.ts -> archivo principal en donde se ejecuta el servidor

## Librerias pendientes

Pendiente
