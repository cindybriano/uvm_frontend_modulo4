const byId = id => document.getElementById(id);
byId('search').addEventListener('submit', async event => {
  event.preventDefault();
  const city = byId('city').value.trim();
  const button = event.currentTarget.querySelector('button');
  byId('result').hidden = true;
  if (!city) { byId('status').textContent = 'Escribe una localidad antes de consultar.'; return; }
  button.disabled = true;
  byId('status').textContent = 'Consultando clima...';
  try {
    const response = await fetch('/weather?' + new URLSearchParams({city}));
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    byId('location').textContent = data.location;
    byId('temperature').textContent = data.temperature + ' °C';
    byId('description').textContent = data.description;
    byId('feelslike').textContent = data.feelslike + ' °C';
    byId('humidity').textContent = data.humidity + ' %';
    byId('wind').textContent = data.wind + ' km/h';
    byId('status').textContent = '';
    byId('result').hidden = false;
  } catch (error) { byId('status').textContent = error.message || 'Error de conexión.'; }
  finally { button.disabled = false; }
});
