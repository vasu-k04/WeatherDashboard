const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your weather API key
const weatherChart = null;

document.getElementById('search-btn').addEventListener('click', async () => {
  const location = document.getElementById('location-search').value;
  if (!location) {
    alert("Please enter a location.");
    return;
  }

  try {
    // Fetch current weather data
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
      throw new Error("Location not found.");
    }
    const data = await response.json();
    updateWeatherDisplay(data);
  } catch (error) {
    alert(error.message);
  }
});

function updateWeatherDisplay(data) {
  document.getElementById('city-name').textContent = data.name;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;

  // Update the chart
  updateWeatherChart([data.main.temp, data.main.feels_like, data.main.temp_min, data.main.temp_max]);
}

function updateWeatherChart(temperatures) {
  const ctx = document.getElementById('weather-chart').getContext('2d');
  if (weatherChart) {
    weatherChart.destroy();
  }
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Current', 'Feels Like', 'Min Temp', 'Max Temp'],
      datasets: [{
        label: 'Temperature (°C)',
        data: temperatures,
        backgroundColor: ['#007bff', '#17a2b8', '#28a745', '#ffc107'],
        borderColor: '#333',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

