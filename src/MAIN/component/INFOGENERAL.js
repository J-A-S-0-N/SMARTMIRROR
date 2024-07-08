import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ElectProgressBar from './electricProgressBar';
import ElectTrend from './electricityTrend';
import WaterTrend from './waterTrend';
import WaterProgressBar from './waterProgressBar';

import axios from 'axios';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { useState, useEffect } from 'react';


const INFOGENERAL = () => {

  const [liveElect, setLiveElect] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [liveWater, setLiveWater] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  useEffect(() => {
    const fetchLiveElect = async () => {
      const response = await axios.get('http://127.0.0.1:5000/liveElectValue');
      const json = response.data;
      const formattedData = {
        labels: json.all_values.map((_, index) => `Label ${index + 1}`), 
        datasets: [{
          data: json.all_values
        }]
      };
      setLiveElect(formattedData);
    };
    fetchLiveElect();
    const electIntervalId = setInterval(fetchLiveElect, 5000);

    const fetchLiveWater = async () => {
      const response = await axios.get('http://127.0.0.1:5000/liveWaterValue');
      const json = response.data;
      const formattedData = {
        labels: json.all_values.map((_, index) => `Label ${index + 1}`), 
        datasets: [{
          data: json.all_values
        }]
      };
      setLiveWater(formattedData);
    };
    fetchLiveWater();
    const waterIntervalId = setInterval(fetchLiveWater, 10000);


  })

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

  //not needed
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
              },
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
          data={liveWater}
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
            },
            propsForDots: {
              r: "0",
            },
            formatXLabel: () => '', 
          }}
          withDots = {false}
          style={{
            marginVertical: 8,
            borderRadius: 9
          }}
        />
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={liveElect}
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
            },
            propsForDots: {
              r: "0",
            },
            formatXLabel: () => '', 
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
    alignSelf: 'flex-start',
    fontSize: 20,
    color: "white",
    marginBottom: 10,
    marginRight: 380,
    fontWeight: "bold"
  },
  liveuseageStyle: {
    alignSelf: 'flex-start',
    marginLeft: 200,
    fontSize: 20,
    color: "white",
    marginBottom: 13,
    marginRight: 380,
    fontWeight: "bold"
  }
});

export default INFOGENERAL;