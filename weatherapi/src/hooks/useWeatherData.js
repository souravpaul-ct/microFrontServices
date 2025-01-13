import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeatherData = (city, units) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
        setWeather(null);
        setForecast([]);
        return;
      }
  

    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const unitParam = units === 'metric' ? 'C' : 'F';

        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=e83398a7584c49c798d185606250901&q=${city}&days=5`
        );

        const currentWeather = response.data.current;
        const forecastData = response.data.forecast.forecastday;

        setWeather({
          city: response.data.location.name,
          country: response.data.location.country,
          temperature: unitParam === 'C' ? currentWeather.temp_c : currentWeather.temp_f,
          humidity: currentWeather.humidity,
          condition: currentWeather.condition.text,
        });

        setForecast(
          forecastData.map((day) => ({
            date: day.date,
            temperature: unitParam === 'C' ? day.day.avgtemp_c : day.day.avgtemp_f,
            condition: day.day.condition.text,
          }))
        );
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, units]);

  return { weather, forecast, loading, error };
};

export default useWeatherData;
