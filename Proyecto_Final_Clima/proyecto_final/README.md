# Proyecto final: clima en tiempo real
Aplicación web con Node.js, Express y WeatherStack.

## Ejecución local
1. Ejecutar `npm install` en esta carpeta.
2. Copiar `.env.example` a `.env` y asignar la clave personal de WeatherStack a `WEATHERSTACK_KEY`.
3. Ejecutar `npm start` y abrir http://localhost:3000.
4. Probar una ciudad, una búsqueda vacía y una localidad inexistente.

La clave permanece en el servidor y no debe publicarse en GitHub. El servicio requiere un plan de WeatherStack compatible con HTTPS.

## Despliegue
Heroku requiere configurar WEATHERSTACK_KEY como variable de entorno y usar `npm start`. Si el proyecto se conserva dentro de un repositorio con varias prácticas, desplegar esta carpeta como raíz de una aplicación Node.js. Verificar costos y requisitos de cuenta antes de contratar un plan.
