const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');



const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    // Details Template 
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
                </div>
    `;

    // remove d-none
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets,
        weather
    };
};
cityForm.addEventListener('submit', e => {
    // Reset Default, dont let page refresh
    e.preventDefault();

    // Get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
   
    // Update
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
})