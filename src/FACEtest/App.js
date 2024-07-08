import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const App = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [helloShown, setHelloShown] = useState(false);
  const [showMainScreen, setShowMainScreen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;  

  const checkFaceDetection = () => {
    fetch('http://127.0.0.1:4000/check_face')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data);
        if (data.face_present && !helloShown) {
          setFaceDetected(true);  // Trigger the useEffect below for face detected
        }
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  };

  useEffect(() => {
    if (faceDetected && !helloShown) {
      animateHelloScreen();
    }
  }, [faceDetected, helloShown]);

  const animateHelloScreen = () => {
    console.log("Animating Hello Screen");
    setHelloShown(true); // Mark that the hello screen has been shown
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setShowMainScreen(true); 
          setFaceDetected(false);  
          setHelloShown(false);     
        });
      }, 4000);  // Time the Hello screen stays visible
    });
  };

  useEffect(() => {
    const interval = setInterval(checkFaceDetection, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {helloShown && (
        <Animated.View style={[styles.fadeContainer, {opacity: fadeAnim}]}>
          <Text style={styles.fadeText}>Welcome back Jason!</Text>
        </Animated.View>
      )}
      {showMainScreen && (
        <View style={styles.mainScreen}>
          <Text>Main Screen Content Here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fadeText: {
    fontSize: 28,
    color: 'white',  
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

