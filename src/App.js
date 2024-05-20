import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
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

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput('');
    }
  };

  const deleteNote = index => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
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
    }
  };

  const getWeatherBackground = weather => {
    switch (weather) {
      case 'clear':
        return 'sunny-bg';
      case 'clouds':
        return 'cloudy-bg';
      case 'rain' :
        return 'rainy-bg';
      case 'drizzle' :
        return 'rainy-bg';
      case 'snow':
        return 'snowy-bg';
      default:
        return 'default-bg';
    }
  };

  return (
    <div className={`App ${getWeatherBackground(weatherData.currentWeather)}`}>
      <header className='App-header'>
        <h1><b>Aleem Ahamed Shaik</b></h1>
        <p><b>Maid ID: </b> shaikaleemahamed786@gmail.com</p>
        <p><b>Phone: </b> 8125636609</p>
      </header>
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
      <div className='container'>
        <div className='card'>
          <h3>Avg Temp of Week</h3>
          <p>{weatherData.avgTemp.toFixed(2)}°C</p>
        </div>
        <div className='card'>
          <h3>Avg Rainfall of Week</h3>
          <p>{weatherData.avgRainfall.toFixed(2)}mm</p>
        </div>
        <div className='card'>
          <h3>Avg Humidity of Week</h3>
          <p>{weatherData.avgHumidity.toFixed(2)}%</p>
        </div>
        <div className='card'>
          <h3>Current Temp</h3>
          <p>{weatherData.currentTemp.toFixed(2)}°C</p>       
        </div>
        <div className='card'>
          <h3>Weather Description</h3>
          <p>{weatherData.weatherDescription} <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt={`${weatherData.weatherDescription} weather icon`}></img></p>
        </div>}
      </div>
      <div className='chart-container'>
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className='notepad'>
        <h3>Notepad</h3>
        <input
          type='text'
          value={noteInput}
          onChange={e => setNoteInput(e.target.value)}
          placeholder='Enter note text'
        />
        <button onClick={addNote}>Add Note</button>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>
              {note} <button onClick={() => deleteNote(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <footer className='footer'>
        <p>&copy; 2024 Aleem Ahamed Shaik. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
