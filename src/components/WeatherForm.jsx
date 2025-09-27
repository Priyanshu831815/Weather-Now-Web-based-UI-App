import React, { useState } from "react";

const WeatherForm = (props) => {
  const { onSearch, loading } = props;

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (!trimmedCity) return;
    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter city name"
        className="p-2 rounded border border-gray-400 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        }`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Weather"}
      </button>
    </form>
  );
};

export default WeatherForm;
