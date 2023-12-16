const apiKey = '0bf5bf64fbddcc66bd3d48dc3c0a1dc8'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            displayWeather(data);
        },
        error: function () {
            alert('Error fetching weather data. Please try again.');
        }
    });
}

function displayWeather(data) {
    const currentWeather = data.list[0];
    const hourlyForecast = data.list.slice(1, 5);
    const dailyForecast = data.list.slice(5, 10);

    $('#current-weather').html(`
        <h2>${data.city.name}, ${data.city.country}</h2>
        <p>Temperature: ${currentWeather.main.temp}°C</p>
        <p>Condition: ${currentWeather.weather[0].description}</p>
    `);

    $('#hourly-forecast').html(renderForecast(hourlyForecast));
    $('#daily-forecast').html(renderForecast(dailyForecast));
}

function renderForecast(forecast) {
    let html = '';
    forecast.forEach(item => {
        const date = new Date(item.dt_txt);
        const time = `${date.getHours()}:00`;
        html += `
            <div class="forecast-item">
                <p>${time}</p>
                <p>${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
    });
    return html;
}

$('#get-weather-btn').on('click', function () {
    const city = $('#city-input').val();
    if (city.trim() !== '') {
        getWeather(city);
    } else {
        alert('Please enter a city.');
    }
});