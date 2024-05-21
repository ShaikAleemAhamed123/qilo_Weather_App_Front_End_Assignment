import React, { useState, useEffect, useRef } from 'react';
import './App.css';
 
import 'chart.js/auto';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer'
import WeatherData from './components/WeatherData';
import Chart from './components/Chart';
import Notepad from './components/Notepad';

const App = () => {
 
  const [weatherData, setWeatherData] = useState({
    avgTemp: 0,
    avgRainfall: 0,
    avgHumidity: 0,
    currentTemp: 0,
    weatherDescription: '',
    weeklyTemps: []
  });
  const [locationInput, setLocationInput] = useState('London');
  const inputRef = useRef(null);

  const fetchWeatherData = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: location,
            units: 'metric',
            appid: process.env.REACT_APP_API_KEY
          }
        }
      );

      const weather = response.data;
      const currentWeather = weather.weather[0].main.toLowerCase();
      const currentTemp = weather.main.temp;
      const weatherDescription = weather.weather[0].description;
      const icon=weather.weather[0].icon;
      const avgHumidity = weather.main.humidity;
      const avgTemp = weather.main.temp;
      const avgRainfall = weather.rain ? weather.rain['1h'] : 0;

      setWeatherData({
        avgTemp,
        avgRainfall,
        avgHumidity,
        currentTemp,
        weatherDescription,
        weeklyTemps: Array(7).fill(avgTemp),
        currentWeather,
        icon
      });
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  const handleGoButtonClick = () => {
    if (locationInput.trim()) {
      fetchWeatherData(locationInput);
      inputRef.current.focus();
    }
  };
 

  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Avg Temp (°C)',
        data: weatherData.weeklyTemps,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'black',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: 'black' 
        }
      },
      y: {
        ticks: {
          color: 'black' 
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'black' 
        }
      },
      title: {
        display: true,
        text: 'Weather Data',  
        color: 'black' 
      }
    }
  };
  

  const getWeatherBackground = weather => {
    switch (weather) {
      case 'clear':
        return 'sunny-bg';
      case 'sunny':
        return 'sunny-bg';
      case 'clouds':
        return 'cloudy-bg';
      case 'rain' :
        return 'rainy-bg';
      case 'drizzle' :
        return 'rainy-bg';
      case 'snow':
        return 'snowy-bg';
      case 'thunderstorm':
        return 'thunderstorm-bg';
      case 'haze':
        return 'haze-bg';
      default:
        return 'sunny-bg';
    }
  };

  return (
    <div className={`App ${getWeatherBackground(weatherData.currentWeather)}`}>
      <Header/>
      <div className='location-input'>
        <input
          type='text'
          ref={inputRef}
          value={locationInput}
          onChange={e => setLocationInput(e.target.value)}
          placeholder='Enter location'
        />
        <button onClick={handleGoButtonClick}>Go</button>
      </div>
      <WeatherData weatherData={weatherData}/>
       <Chart chartData={chartData} chartOptions={chartOptions}/>
       <Notepad/>
      <Footer/>
    </div>
  );
};

export default App;
