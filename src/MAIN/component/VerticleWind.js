import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import axios from 'axios';

const WindSpeedList = () => {
  const [windSpeeds, setWindSpeeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'YOUR_API_KEY';  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
          params: {
            lat: 36.0671,
            lon: 120.3826,
            exclude: 'current,minutely,hourly,alerts',
            units: 'metric',
            appid: apiKey
          }
        });
        const dailyData = response.data.daily;
        const windData = dailyData.map(day => ({
          date: new Date(day.dt * 1000).toLocaleDateString('en-US'),
          speed: `${day.wind_speed} m/s`
        }));
        setWindSpeeds(windData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
        {windSpeeds.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.speed}>{item.speed}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#ccc',  // Grey background
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  item: {
    width: 110,  // Each item has a fixed width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaa', // Darker grey for the item
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: '#333',  // Dark text for better readability
    marginBottom: 5
  },
  speed: {
    fontSize: 14,
    color: '#333',  // Dark text for better readability
  }
});

export default function App() {
  return <WindSpeedList />;
}
