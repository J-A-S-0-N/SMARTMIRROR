import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ProgressBar from './components/progressBar';
import BatteryBar from './components/batteryBar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.curStat}>
        CURRENT STAT
      </Text>
      <View style={styles.progressStyle}>
        <View style={styles.boxContainer}>
          <Text style={{ color: "white", marginBottom: 9 }}>
            HOUSE 1 :
          </Text>
          <ProgressBar percentage={40}></ProgressBar>
        </View>
        <View style={styles.boxContainer}>
          <Text style={{ color: "white", marginBottom: 9 }}>
            HOUSE 2 :
          </Text>
          <ProgressBar percentage={80}></ProgressBar>
        </View>
        <View style={styles.boxContainer}>
          <Text style={{ color: "white", marginBottom: 9 }}>
            MY HOUSE :
          </Text>
          <ProgressBar percentage={50}></ProgressBar>
        </View>
      </View>
      <View style={styles.Margin}>
      </View>
      <View style = {styles.SUBcontainer}>
        <Text style={styles.GRIDtext}>
          GRID
        </Text>
        <BatteryBar percentage={70}></BatteryBar>
        <Text style = {styles.wattTextt}>
          67W
        </Text>
        <View>
          <Text style={styles.TextContainer}>
            HOUSE 1: + 30W
          </Text>
          <Text style={styles.TextContainer}>
            HOUSE 2: - 20W
          </Text>
          <Text style={styles.TextContainer}>
            MY HOUSE: + 57W
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingRight: 80
  },
  Margin: {
    marginBottom: 100,
  },
  TextContainer: {
    fontWeight: "bold",
    color: "white",
    marginLeft: 140,
    marginTop: 10,
    marginBottom: 20,
  },
  SUBcontainer: {
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: "rgb(10,10,10)",
  },
  wattTextt: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    marginTop:15,
    alignItems: "center",
    justifyContent: "center"
  },
  progressStyle: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(10,10,10)",
  },
  curStat: {
    alighSelf: 'center',
    fontSize: 20,
    color: "white",
    marginBottom: 30,
    marginRight: 130,
    fontWeight: "bold"
  },
  boxContainer: {
    flexxDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  GRIDtext: {
    alighSelf: 'center',
    fontSize: 20,
    color: "white",
    marginBottom: 30,
    marginTop: 20,
    marginRight: 230,
    fontWeight: "bold"
  }
});
