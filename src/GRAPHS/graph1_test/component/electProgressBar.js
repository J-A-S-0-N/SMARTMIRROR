import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.filler, { height: `${percentage}%` }]}>
      </View>
      <Text style={styles.TextST}>
        Electricity
      </Text>
      <Text style={styles.Dellater}>
        43 W/200
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
    paddingTop:7,
    color:"white",
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

export default ProgressBar;