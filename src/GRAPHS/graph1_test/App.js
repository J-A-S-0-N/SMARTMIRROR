import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ElectProgressBar from './component/electProgressBar';
import WaterProgressBar from "./component/waterProgressBar";
import WaterTrend from "./component/waterTrend";
import ElectTrend from "./component/electricityTrend";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useEffect, useState } from 'react';


export default function App() {
  //const axios = require("axios");

  const data = {
    labels: ['day1', 'day2', 'day3', 'day4', 'day5'],
    datasets: [{
      data: [200, 300, 100, 320, 200],
    }]
  };

  const data2 = {
    labels: ['day1', 'day2', 'day3', 'day4', 'day5'],
    datasets: [{
      data: [100, 300, 400, 320, 500]
    }]
  };

  const testData = {
    labels: [],
    datasets: [{
      data: [1.5, 1.2, 1.0, 1.3, 1.5, 2, 1.2, 1.1, 2.1, 1.7, 1.8, 1.2, 1.4, 1.5, 2]
    }]
  }

  const testData2 = {
    labels: [],
    datasets: [{
      data: [1.5, 1.5, 2, 1, 1.1, 2.1, 1.2, 1.6, 1.8, 1.9, 1.9, 1.7, 1.8, 1.2, 1.4, 1.5, 2]
    }]
  }


  const [currentElectricity, setCurrentElectricity] = useState(null);
  const [currentWaterFlow, setCurrentWaterFlow] = useState(null);
  const [dailyElectricity, setDailyElectricity] = useState(null);
  const [dailyWaterUseage, setDailyWaterUseage] = useState(null);

  useEffect(() => {
    const fetchEletData = async() => {
      const response = await fetch('http://0.0.0.0:5000/returnElect');
      const data = await response.json();
      setCurrentElectricity(data);
    }

    const fetchWaterData = async() => {
      const response = await fetch('http://0.0.0.0:5000/returnWater');
      const data = await response.json();
      setCurrentElectricity(data);
    }

    const fetchDailyElect = async() => {
      const response = await fetch('http://0.0.0.0:5000/returnDailyElect');
      const data = await response.json();
      setDailyElectricity(data);
    }

    const fetchDailyWaterUseeage = async() => {
      const response = await fetch("http://0.0.0.0:5000/returnDailyWaterUseage");
      const data = await response.json();
      setDailyWaterUseage(data);
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.useageStyle}>
        USEAGE
      </Text>
      <View style={styles.progressBarsContainer}>
        <ElectProgressBar style={styles.barStyle} percentage={20} />
        <WaterProgressBar percentage={40} />
      </View>
      <Text style={styles.useageStyle}>
        TREND
      </Text>
      <View style={styles.trendContainer}>
        <ElectTrend style={styles.barStyle}></ElectTrend>
        <WaterTrend></WaterTrend>
      </View>
      <View style={styles.trendContainer}>
        <View>
          <BarChart
            data={data}
            width={300}
            height={300}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: 'rgb(10,10,10)',
              backgroundGradientFrom: 'rgb(10,10,10)',
              backgroundGradientTo: 'rgb(10,10,10)',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                fontFamily: "Arial",
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 9
            }}
          />
        </View>
        <View>
          <BarChart
            data={data2}
            width={300}
            height={300}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: 'rgb(10,10,10)',
              backgroundGradientFrom: 'rgb(10,10,10)',
              backgroundGradientTo: 'rgb(10,10,10)',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                fontFamily: "Arial",
              }
            }}
            style={{
              marginVertical: 8,
              borderRadius: 9
            }}
          />
        </View>
      </View>
      <Text style={styles.liveuseageStyle}>
        LIVE POWER USEAGE
      </Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={testData}
          width={600}
          height={300}
          yAxisLabel=''
          chartConfig={{
            backgroundColor: 'rgb(10,10,10)',
            backgroundGradientFrom: 'rgb(10,10,10)',
            backgroundGradientTo: 'rgb(10,10,10)',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(20, 80, 20, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForLabels: {
              fontFamily: "Arial",
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 9
          }}
        />
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={testData2}
          width={600}
          height={300}
          yAxisLabel=''
          chartConfig={{
            backgroundColor: 'rgb(10,10,10)',
            backgroundGradientFrom: 'rgb(10,10,10)',
            backgroundGradientTo: 'rgb(10,10,10)',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(20, 20, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForLabels: {
              fontFamily: "Arial",
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 9
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 20,
  },
  progressBarsContainer: {
    padding: 20,
    flexDirection: 'row',
    marginBottom: 80,
    borderRadius: 10,
    alignItems: 'center',
  },
  barStyle: {
    marginRight: 20
  },
  trendContainer: {
    borderRadius: 10,
    backgroundColor: "rgb(10,10,10)",
    flexDirection: "row",
    padding: 20,
    marginBottom: 80,
  },
  chartContainer: {
    backgroundColor: "rgb(10,10,10)",
    borderRadius: 10,
    padding: 10,
  },
  useageStyle: {
    alighSelf: 'flex-start',
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginRight: 380,
    fontWeight: "bold"
  },
  liveuseageStyle: {
    alighSelf: 'flex-start',
    marginLeft: 200,
    fontSize: 20,
    color: "white",
    marginBottom: 13,
    marginRight: 380,
    fontWeight: "bold"
  }
});