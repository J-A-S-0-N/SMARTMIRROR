


import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from "react";
import { Calendar as CalendarComponent } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';

import WeatherSUM from "./component/weatherSUM";
import HourlyWeather from "./component/weatherSUMHOUR"
import NewsFeed from './component/newsSUM';
import WeeklyWeather from './component/weather';
import CombinedComponent from "./component/newsNstock"
import TODOapp from './component/todoAPP';
import InfoGeneral from './component/INFOGENERAL';
import Interconnected from './component/Interconnected';
import ReceiptPage from './component/ReceiptPage';
import VerticleWind from './component/VerticleWind';

import moment from "moment";
import { Dimensions } from 'react-native';

export default function App() {
  //date variables
  const _date = moment();
  var currentMonth = _date.format('MMMM');
  var currentDay = _date.format("dddd");
  var currentDate = _date.format("D");
  var currentSec = _date.second();


  const [dt, setDt] = useState(moment(new Date().toLocaleString()).format("hh:mm"));
  const [second, setSecond] = useState(moment().second());

  /*
  const runScript = async () => {
    try {
      const response = await fetch('http://0.0.0.0:5000/run_script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const json = await response.json();
      console.log(json);
      const foundFace = json.found_face;
      setResult(foundFace);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  */

  //for live clock
  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(moment(new Date().toLocaleString()).format("hh:mm"));
    }, 1000)
    return () => clearInterval(secTimer);
  }, []);

  //for live second
  useEffect(() => {
    const interval = setInterval(() => {
      setSecond(moment().second());
    }, 1000);
  })

  return (
    <ScrollView style={styles.scrollStyle} pagingEnabled={true} horizontal={true}>
      <View style={styles.container}>
        <View style={styles.topLeftView}>
          <NewsFeed></NewsFeed>
        </View>

        <View style={styles.weatherStat}>{/* main weather summary*/}
          <WeatherSUM />
        </View>

        <View style={styles.timeStyles}>
          <Text style={styles.txtcurrentDate}>{currentDay}, {currentMonth} {currentDate}</Text>
          <Text style={[styles.txtcurrentDate, styles.txtcurrentTime]}>{dt}:{currentSec}</Text>
        </View>


        <View style={styles.hlyWeather}>
          <HourlyWeather></HourlyWeather>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.calnedarContainer}>
          <CalendarComponent
            style={styles.calendarStyle}
            theme={{
              calendarBackground: 'rgb(10,10,10)',
              textSectionTitleColor: 'rgb(170,170,170)',
              textDayHeaderFontSize: 14,
              textMonthFontSize: 26,
              textDayFontSize: 18,
              todayTextColor: 'rgb(10,10,10)',
              dayTextColor: 'rgb(200,200,200)',
              textDisabledColor: 'rgb(10,10,10)',
              dotColor: 'rgb(7,7,7)',
              selectedDotColor: 'rgb(255,255,255)',
              arrowColor: 'rgb(40,40,40)',
              monthTextColor: 'rgb(255,255,255)',
              indicatorColor: 'rgb(0,0,0)',
              selectedDayBackgroundColor: 'rgb(0,0,0)',
              selectedDayTextColor: 'rgb(255,255,255)',
              todayBackgroundColor: 'rgb(240,240,240)',
              dayBackgroundColor: 'rgb(255,255,255)',
              textDayStyle: { fontWeight: 'bold' },
              textMonthStyle: { fontWeight: 'bold' },
            }}
          />
        </View>
        <WeeklyWeather>
        </WeeklyWeather>
      </View>

      <View style={styles.container}>
        <CombinedComponent></CombinedComponent>
      </View>

      <View style={styles.container}>
        <InfoGeneral></InfoGeneral>
      </View>

      <View style={styles.container}>
        <Interconnected></Interconnected>
      </View>

      <View style={styles.container}>
        <ReceiptPage></ReceiptPage>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calendarStyle: {
    width: 500,
    borderRadius: 10,
  },
  hlyWeather: {
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    width: 340,
    borderRadius: 10,
    backgroundColor: "rgb(10,10,10)"
  },
  scrollStyle: {
    backgroundColor: "black",
  },
  weatherStat: {
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: "rgb(10,10,10)"
  },
  timeStyles: {
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: "rgb(10,10,10)"
  },
  txtcurrentDate: {
    marginLeft:10 ,
    fontSize: 15,
    padding: 10,
    color: 'rgb(255,255,255)'
  },
  txtcurrentTime: {
    fontSize: 24,
    fontWeight: "bold"
  },
  topLeftView: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 999,
    backgroundColor: "rgb(10,10,10)",
    width: 400,
  },
});
