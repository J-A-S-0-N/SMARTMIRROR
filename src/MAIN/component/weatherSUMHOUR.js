import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WeatherHourly = () => {
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'e6e1f6448833aa00707c5c1210ecfc3c';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=Qingdao&units=metric&appid=${apiKey}`;

      try {
        const response = await axios.get(url);
        setHourlyData(response.data.list.slice(0,7)); // Show only the first 7 hours for demonstration
      } catch (error) {
        console.error('Error fetching hourly weather:', error);
      }
    };

    fetchWeather();
  }, []);

  const renderItem = ({ item, index }) => {
    const itemCount = hourlyData.length;
    const opacity = Math.max(0.2, 1 - (index / (itemCount - 1)));

    return (
      <View style={styles.item}>
        <Text style={[styles.text, {opacity}]}>{new Date(item.dt * 1000).getHours()}:00</Text>
        <Icon name="weather-cloudy" size={30} color={`rgba(255, 255, 255, ${opacity})`} />
        <Text style={[styles.text, {opacity}]}>{item.weather[0].description}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={hourlyData}
      renderItem={renderItem}
      keyExtractor={item => item.dt.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    color: "rgb(255,255,255)",
    fontSize: 15
  }
});

export default WeatherHourly;
