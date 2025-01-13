import React, { useState, useEffect } from 'react';
import useWeatherData from './hooks/useWeatherData';

const WeatherDashboard = () => {
  const [city, setCity] = useState(() => sessionStorage.getItem('lastSearchedCity') || '');
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = sessionStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [showFavorites, setShowFavorites] = useState(() => {
    const savedShowFavorites = sessionStorage.getItem('showFavorites');
    return savedShowFavorites ? JSON.parse(savedShowFavorites) : false;
  });
  const [units, setUnits] = useState(() => sessionStorage.getItem('units') || 'metric');
  const { weather, forecast, loading, error } = useWeatherData(city, units);

  useEffect(() => {
    sessionStorage.setItem('lastSearchedCity', city);
  }, [city]);

  useEffect(() => {
    sessionStorage.setItem('units', units);
  }, [units]);

  useEffect(() => {
    sessionStorage.setItem('showFavorites', JSON.stringify(showFavorites));
  }, [showFavorites]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputCity = e.target.elements.city.value.trim();
    if (inputCity) {
      setCity(inputCity);
      e.target.reset();
    }
  };

  const handleFavoriteClick = (selectedCity) => {
    setCity(selectedCity);
    setShowFavorites(false);
  };

  const addFavorite = () => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter((favCity) => favCity !== cityToRemove);
    setFavorites(updatedFavorites);
    sessionStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Clear weather details if the removed city was the last viewed
    if (city === cityToRemove) {
      setCity('');
      sessionStorage.removeItem('lastSearchedCity');
    }
  };

  const toggleFavorites = () => {
    setShowFavorites((prevShowFavorites) => !prevShowFavorites);
  };

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city name" />
        <button type="submit">Search</button>
      </form>

      <button className="action-button" onClick={addFavorite}>Add to Favorites</button>
      <button className="action-button" onClick={toggleUnits}>
        Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>

      <button className="action-button" onClick={toggleFavorites}>
        {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
      </button>

      {showFavorites && (
        <div>
          <h2>Favorite Cities</h2>
          <ul>
            {favorites.map((favCity) => (
              <li key={favCity}>
                {favCity}
                <button className="action-button" onClick={() => handleFavoriteClick(favCity)}>View</button>
                <button className="action-button" onClick={() => removeFavorite(favCity)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>
            Current Weather in {weather.city}, {weather.country}
          </h2>
          <p>
            Temperature: {weather.temperature}°{units === 'metric' ? 'C' : 'F'}
          </p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Condition: {weather.condition}</p>
          <h3>5-Day Forecast</h3>
          <ul>
            {forecast.map((day) => (
              <li key={day.date}>
                {day.date}: {day.temperature}°{units === 'metric' ? 'C' : 'F'} - {day.condition}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
