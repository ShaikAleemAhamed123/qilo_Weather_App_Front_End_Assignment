export default function WeatherData({weatherData}){
    return <div className='container'>
    <div className='card'>
      <h3>Avg Temp of Week</h3>
      <p>{weatherData.avgTemp}°C</p>
    </div>
    <div className='card'>
      <h3>Avg Rainfall of Week</h3>
      <p>{weatherData.avgRainfall}mm</p>
    </div>
    <div className='card'>
      <h3>Avg Humidity of Week</h3>
      <p>{weatherData.avgHumidity}%</p>
    </div>
    <div className='card'>
      <h3>Current Temp</h3>
      <p>{weatherData.currentTemp}°C</p>       
    </div>
    <div className='card'>
      <h3>Weather Description</h3>
      <p>{weatherData.weatherDescription} <img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt={`${weatherData.weatherDescription} weather icon`}></img></p>
    </div>
  </div>
}