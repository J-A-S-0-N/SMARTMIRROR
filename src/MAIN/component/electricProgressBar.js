import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ElectProgressBar = ({ percentage }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/overallPower');
        setData(response.data.power);
        console.log(response.data.power);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 500);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.filler, { height: `${percentage}%` }]}>
      </View>
      <Text style={styles.TextST}>
        Electricity
      </Text>
      <Text style={styles.Dellater}>
        {data} Wh
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: 'rgb(20,20,20)',
    borderRadius: 200 / 2,
    marginRight: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  TextST: {
    fontWeight: 'bold',
    paddingTop: 30,
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Dellater: {
    paddingTop: 7,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
  },
  filler: {
    alignContent: "center",
    justifyContent: "center",
    width: '100%',
    backgroundColor: 'rgb(20,80,20)',
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
  }
});

export default ElectProgressBar;