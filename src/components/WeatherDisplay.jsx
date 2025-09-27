import React from "react";

const WeatherDisplay = (props) => {
  const { city, weather } = props; 

  if (!weather) return null;

  return (
    <div className="bg-white p-4 rounded shadow-md text-center mt-4">
      <h2 className="text-xl font-semibold mb-2">{city}</h2>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind Speed: {weather.windspeed} km/h</p>
      <p>Weather Code: {weather.weathercode}</p>
    </div>
  );
};

export default WeatherDisplay;
