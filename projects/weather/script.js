
// ===== FLOATING PARTICLES =====
(function () {
  const container = document.getElementById('pt');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'p';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -10px;
      animation-duration: ${Math.random() * 10 + 7}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
})();
 
// ===== STATE =====
let weatherData = null;
let unit = 'C';
 
// ===== FETCH WEATHER =====
async function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) { shake(); return; }
 
  document.getElementById('goTxt').textContent = '…';
  hide('result');
  hide('errState');
  hide('emptyState');
 
  try {
    const key = '1d0a21fac1244296ac473241262005';
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(city)}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('not found');
    weatherData = await response.json();
    render();
  } catch (e) {
    const msg = e.message.includes('not found') || e.message.includes('No matching')
      ? 'City not found. Check spelling.'
      : 'Network error. Please try again.';
    showErr(msg);
  }
 
  document.getElementById('goTxt').textContent = 'GO';
}
 
// ===== RENDER WEATHER DATA =====
function render() {
  const c = weatherData.current;
  const l = weatherData.location;
 
  document.getElementById('cityName').textContent  = l.name + ', ' + l.country;
  document.getElementById('localTime').textContent = formatTime(l.localtime);
  document.getElementById('wIcon').src             = 'https:' + c.condition.icon.replace('64x64', '128x128');
  document.getElementById('condBadge').textContent = c.condition.text;
  document.getElementById('sHumidity').textContent = c.humidity + '%';
  document.getElementById('sWind').textContent     = c.wind_kph + ' kph';
  document.getElementById('sUV').textContent       = c.uv;
 
  updateTemp();
  show('result');
  hide('errState');
  hide('emptyState');
}
 
// ===== TEMPERATURE DISPLAY =====
function updateTemp() {
  if (!weatherData) return;
  const c = weatherData.current;
  document.getElementById('tempVal').textContent = unit === 'C'
    ? Math.round(c.temp_c) + '°C'
    : Math.round(c.temp_f) + '°F';
  document.getElementById('sFeels').textContent = unit === 'C'
    ? Math.round(c.feelslike_c) + '°C'
    : Math.round(c.feelslike_f) + '°F';
}
 
function setUnit(u) {
  unit = u;
  document.getElementById('btnC').className = 'u-btn' + (u === 'C' ? ' on' : '');
  document.getElementById('btnF').className = 'u-btn' + (u === 'F' ? ' on' : '');
  updateTemp();
}
 
// ===== ERROR STATE =====
function showErr(msg) {
  document.getElementById('errMsg').textContent = msg;
  show('errState');
  hide('result');
  hide('emptyState');
}
 
// ===== HELPERS =====
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }
 
function formatTime(raw) {
  const d = new Date(raw);
  return d.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}
 
function shake() {
  const wrap = document.getElementById('searchWrap');
  wrap.style.animation = 'none';
  void wrap.offsetWidth; // force reflow
  wrap.style.animation = 'shake 0.4s ease';
  setTimeout(() => wrap.style.animation = '', 400);
}
 
