import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const App = () => {
  const [faceDetected, setFaceDetected] = useState(false);
  const [helloShown, setHelloShown] = useState(false);
  const [showMainScreen, setShowMainScreen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;  
  const intervalRef = useRef(null); // Reference to store the interval ID

  const checkFaceDetection = () => {
    fetch('http://0.0.0.0:5000/run_script')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data received:', data);
        if (data.face_present && !helloShown) {
          setFaceDetected(true);
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
    setHelloShown(true); 
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
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
          clearInterval(intervalRef.current); // Stop the interval here
        });
      }, 4000); 
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(checkFaceDetection, 2000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <View style={styles.container}>
      {helloShown && (
        <Animated.View style={[styles.fadeContainer, {opacity: fadeAnim}]}>
          <View style={styles.summaryBlock}>
            <View>
              <Text style = {{fontSize:15}}>Good morning Jason!!</Text>
              <Text style = {{fontSize:18,fontWeight:"bold"}}>Sun, Apr 14</Text>
              <Text>Last month power usage: 123</Text>
              <Text>This month power usage: 123</Text>
            </View>
          </View>
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
  summaryBlock: {
    justifyContent: 'center',
    alignItems: "center",
    width: 400,
    height: 100,
  },
  fadeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
