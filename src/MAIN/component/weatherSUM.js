//prerequistes:
//install axios using npm 
//install react-native-vector-icons using npm
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = 'e6e1f6448833aa00707c5c1210ecfc3c'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Qingdao&units=metric&appid=${apiKey}`;
    
    axios.get(url)
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Failed to load weather data');
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View>
      {weather && (
        <View>
          <Text style={styles.weatherText}>{`${weather.weather[0].description}`}</Text>
          <Text style={styles.tempText}>{`${weather.main.temp} °C`}</Text>
          <Text style={styles.windText}>{`Wind Speed: ${weather.wind.speed} m/s`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tempText: {
    marginLeft: 16,
    color: "rgb(255,255,255)",
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  weatherText: {
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 10,
    color: "rgb(255,255,255)",
    fontSize: 25,
  },
  windText: {
    marginLeft: 10,
    color: "rgb(255,255,255)",
    fontSize: 19,
    marginBottom: 10
  }
});

export default WeatherApp;
