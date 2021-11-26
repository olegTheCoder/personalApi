const $weatherForm = document.forms.weatherForm;

function insertCard(city, temp, wet, wind, weather, img, color) {
  return `
  <div data-allSearch class="card m-2" col-sm style="width: 12rem; background-color: ${color}">
      <div><b><p class='card-text'>City: ${city}</p>
      <p class='card-text'>Temperature: ${temp}°C</p>
      <p class='card-text'>Humidity: ${wet}%</p>
      <p class='card-text'>Wind: ${wind} m/s</p>
      <p class='card-text'>${weather}</p></b></div>
      <br>
      <img src=${img} alt="weather">
   </div>
  `;
}

$weatherForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityInputs = Object.fromEntries(new FormData($weatherForm));
  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityInputs),
  });
  const { city, temp, wet, wind, weather } = await response.json();
  let img = '';
  let color = '';
  if (weather === 'Warmly!') {
    img = '/img/clothes.png';
    color = 'rgb(250, 242, 137, 0.95)';
  }
  else if (weather === 'Сold!') {
    img = '/img/trench-coat.png';
    color = 'rgb(240, 255, 255, 0.95)';
  }
  else if (weather === 'Too Cold!') {
    img = '/img/jacket.png';
    color = 'rgb(207, 226, 255, 0.95)';
  }
  else {
    img = '/img/bikini.png';
    color = 'rgb(255, 159, 81, 0.95)';
  }

  const $allPostsContainer = document.querySelector('[data-allSearch]');
  $allPostsContainer.insertAdjacentHTML('afterbegin', insertCard(city, temp.toFixed(0), wet, wind.toFixed(0), weather, img, color));

  $weatherForm.reset();
});
