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
    width: 300,
    height: 45, // Changed from 80 to 20 for a more typical progress bar height
    backgroundColor: 'rgb(230,230,230)', // Lighter background for better contrast
    borderRadius: 4,
    overflow: 'hidden',
  },
  filler: {
    height: '100%', // Ensures filler takes full height of the container
    backgroundColor: 'rgb(70,70,70)',
    borderRadius: 4, // Ensure this is less than or equal to container's borderRadius
  }
});

export default ProgressBar;
