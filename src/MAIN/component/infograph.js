//prerequistes:
//install axios using npm 
//install react-native-vector-icons using npm
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const InfoGraph = () => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      }
    ]
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/data');
      console.log(response);
      const json = await response.json();
      setChartData(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // fetch new data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text stlye={styles.text}>
          Power useage
        </Text>
        <LineChart
          style={styles.lineChartStyle}
          data={chartData}
          width={800} // from react-native
          height={400}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "rgb(10,10,10)",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "2",
              strokeWidth: "2",
              stroke: "rgb(50,50,50)"
            },
            propsForLabels: {
              fontFamily: 'Arial', // Change to your desired font family
              fontSize: 12, // Set the size you want
            },
            withVerticalLines: true, 
            withHorizontalLines: false 
          }}
        />
      </View>
      <View style={styles.container}>
        <Text stlye={styles.text}>
          water useage
        </Text>
        <LineChart
          backgroundColor = {"rgb(10,10,10)"}
          backgroundColorGradientFrom ={"rgb(10,10,10)"}
          backgroundColorGradientTo ={"rgb(10,10,10)"}

          style={styles.lineChartStyle}
          data={chartData}
          width={800} // from react-native
          height={400}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForLabels: {
              fontFamily: 'Arial', // Change to your desired font family
              fontSize: 12, // Set the size you want
            },
            propsForDots: {
              r: "2",
              strokeWidth: "2",
              stroke: "rgb(50,50,50)"
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    borderRadius: 10,
    padding: 20,
    paddingTop: 30,
    flex: 1,
  },
  lineChartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    flex: 1,
  },
  text: {
    color: "rgb(255,255,0)"
  }
});

export default InfoGraph;
