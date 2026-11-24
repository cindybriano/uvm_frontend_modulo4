require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/weather', async (req, res) => {
  const city = typeof req.query.city === 'string' ? req.query.city.trim() : '';
  if (!city) return res.status(400).json({error:'Escribe una localidad.'});
  if (!process.env.WEATHERSTACK_KEY) return res.status(503).json({error:'Falta configurar la clave de WeatherStack.'});
  try {
    const url = new URL('https://api.weatherstack.com/current');
    url.search = new URLSearchParams({access_key:process.env.WEATHERSTACK_KEY,query:city,units:'m'}).toString();
    const response = await fetch(url, {signal:AbortSignal.timeout(15000)});
    const data = await response.json();
    if (!response.ok || data.error || !data.current || !data.location) return res.status(400).json({error:'No se pudo consultar el clima. Revisa la localidad, la clave y los límites de tu plan WeatherStack.'});
    const c = data.current;
    res.json({location:`${data.location.name}, ${data.location.country}`,temperature:c.temperature,feelslike:c.feelslike,humidity:c.humidity,wind:c.wind_speed,description:c.weather_descriptions?.[0] || ''});
  } catch { res.status(502).json({error:'No se pudo conectar con el servicio del clima. Intenta nuevamente.'}); }
});
app.listen(process.env.PORT || 3000, () => console.log('Servidor del clima iniciado.'));
