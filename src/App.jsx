import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

const App = () => {
  const [city, setCity] = useState(""); 
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      setWeather(null);

      try {
        const geoRes = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${(city)}`
        );

        if (!geoRes.data.results || geoRes.data.results.length === 0) {
          setError("City not found");
          return;
        }

        const { latitude, longitude } = geoRes.data.results[0];
        const weatherRes = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        setWeather(weatherRes.data.current_weather);
      } catch (err) {
        setError("Failed to fetch weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);


  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Weather Now 🌤️</h1>

      <WeatherForm onSearch={handleSearch} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <WeatherDisplay city={city} weather={weather} />
    </div>
  );
};

export default App;
