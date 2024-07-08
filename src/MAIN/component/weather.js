import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNSVGSymbol } from 'react-native-svg';

const API_KEY = 'e6e1f6448833aa00707c5c1210ecfc3c';
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=Qingdao&appid=${API_KEY}&units=metric`;

const weatherEmojis = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅️',
    '02n': '⛅️',
    '03d': '🌥',
    '03n': '🌥',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧',
    '09n': '🌧',
    '10d': '🌦',
    '10n': '🌦',
    '11d': '⛈',
    '11n': '⛈',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫',
    '50n': '🌫',
};

const WeeklyWeather = () => {
    const [forecast, setForecast] = useState([]);

    const [currentLocation, setCurrentLocation] = useState('');
    const [currentTemperature, setCurrentTemperature] = useState('');

    const [currentWind, setCurrentWind] = useState('');
    const [currentWindDi, setCurrentWindDi] = useState('');

    const [currentUVInd, setCurrentUVInd] = useState('');
    const [currentVisability, setCurrentVisability] = useState('');


    useEffect(() => {
        fetchWeatherData();
        fetchCurrentWeather();
    }, []);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setForecast(data.list.filter((item, index) => index % 8 === 0)); // Filter to get only one forecast per day

        } catch (error) {
            console.error('Error fetching weather forecast:', error);
        }
    };

    const fetchCurrentWeather = async () => {
        const CURRENT_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Qingdao&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(CURRENT_WEATHER_API_URL);
            const data = await response.json();
            if (response.ok) {
                console.log("noice API connection");
                setCurrentLocation(data.name);
                setCurrentTemperature(data.main.temp);
                setCurrentWind(data.wind.speed);
                setCurrentWindDi(data.wind.deg);
                setCurrentUVInd(data.uvi);
                setCurrentVisability(data.visibility);
            } else {
                console.log('Error current weather:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.SUBcontainer}>
                    <Text style={styles.currentLocation}>{currentLocation}</Text>
                    <Text style={styles.currentTemperature}>{currentTemperature}°C</Text>
                </View>
            </View>
            <View style = {styles.weatherDay}>
                {forecast.map((item, index) => (
                    <View key={index} style={styles.dayContainer}>
                        <Text style={styles.weatherEmoji}>{weatherEmojis[item.weather[0].icon]}</Text>
                        <Text style={styles.day}>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</Text>
                        <Text style={styles.temperature}>
                            {Math.round(item.main.temp_max)}° / {Math.round(item.main.temp_min)}°
                        </Text>
                    </View>
                ))}
            </View>
            <View style = {styles.container}>
                <Text style = {styles.test}>Current Wind Speed: </Text>
                <Text>
                    {"\n"}
                </Text>
                <Text style = {{justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: 24}}>              {currentWind} m/s</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.test}>Current Visability: </Text>
                <Text>
                    {"\n"}
                </Text>
                <Text style = {{justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: 24}}>            {currentVisability} m/s</Text>
            </View>
            <View style = {styles.container}>
                <Text style = {styles.test}>Current UVIndex: </Text>
                <Text>
                    {"\n"}
                </Text>
                <Text style = {{justifyContent: "center", alignItems: "center", color: "white", fontWeight: "bold", fontSize: 24}}>            {currentUVInd} m/s</Text>
            </View>
       </View>


    );
};

const testAPIKey = async (apiKey) => {
    const city = 'qingdao';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            console.log('API key is valid.');
            console.log('Weather data:', data);
        } else {
            console.log('API key is invalid.');
        }
    } catch (error) {
        console.error('Error testing API key validity:', error);
    }
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'rgb(10,10,10)',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'flex-end',
    },
    SUBcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40
    },
    currentLocation: {
        color: "rgb(255,255,255)",
        fontSize: 22,
        marginBottom: 10,
    },
    currentTemperature: {
        color: "rgb(255,255,255)",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
    },
    dayContainer: {
        width: 250,
        marginLeft: 10,
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    weatherEmoji: {
        fontSize: 10,
        marginRight: 5,
        fontSize: 18,
    },
    weatherDay: {
        marginHorizontal: 10,
        backgroundColor: "rgb(10,10,10)"
    },
    day: {
        flex: 1,
        marginLeft: 5,
        fontSize: 20,
        color: "rgb(255,255,255)"
    },
    temperature: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "rgb(255,255,255)"
    },
    test: {
        color: "rgb(255,255,255)"
    }
});


export default WeeklyWeather;
