import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }) => {
  // Ensure percentage does not exceed 100 or fall below 0
  const width = Math.max(0, Math.min(100, percentage)) + '%'; 

  return (
    <View style={styles.container}>
      <View style={[styles.filler, { width: width }]}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 100, 
    backgroundColor: 'rgb(230,230,230)', 
    borderRadius: 4,
    overflow: 'hidden',
  },
  filler: {
    height: '100%', 
    backgroundColor: 'rgb(20,80,20)',
    borderRadius: 4,
  }
});

export default ProgressBar;
