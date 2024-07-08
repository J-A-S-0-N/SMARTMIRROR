import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const categories = ['business', 'entertainment', 'health', 'science', 'technology'];
const API_KEY = '6af89881631140be8710282f3dbc80e9'; 

const BASE_URL = 'https://newsapi.org/v2/top-headlines';
const HEADLINES_PER_CATEGORY = 3;

const CombinedComponent = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';

  const generateRandomData = (length, scale) => {
    return Array.from({ length }, () => Math.floor(Math.random() * scale));
  };

  const simulateStockData = () => {
    const symbols = ['IBM', 'AAPL', 'MSFT', 'GOOGL', 'AMZN'];
    return symbols.map(symbol => ({
      symbol,
      price: Math.random() * 1000,
      historical: generateRandomData(30, 1000)
    }));
  };

  const [news, setNews] = useState({});
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsByCategory = {};
        for (const category of categories) {
          const response = await fetch(`${BASE_URL}?country=us&category=${category}&apiKey=${API_KEY}`);
          const json = await response.json();
          newsByCategory[category] = json.articles.slice(0, HEADLINES_PER_CATEGORY);
        }
        setNews(newsByCategory);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  /*
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch('http://0.0.0.0:5000/stocks'); // Replace 'your_server_ip' with your actual server IP
        const data = await response.json();
        console.log(data);
        setStockData(data);
      } catch (error) {
        //console.error('Failed to fetch stock data:', error);
      }
    }, 3000);  // Fetches data every 10 seconds

    return () => clearInterval(intervalId);
  }, []);
  */

  /*
  useEffect(() => {
    const stockData = simulateStockData();
    setStocks(stockData);
    setSelectedStock(stockData[0]); // Select the first stock initially
  }, []);
  */


  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} contentContainerStyle={styles.scrollViewContent}>
        {categories.map(category => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
            {news[category]?.map((article, index) => (
              <Text key={index} style={styles.title}>{article.title}</Text>
            ))}
          </View>
        ))}
      </ScrollView>

      {/*}
      <View style={styles.stockcontainer}>
        <ScrollView style={styles.stockListContainer}>
          {stocks.map((stock, index) => (
            <Text key={index} style={styles.stockBox} onPress={() => setSelectedStock(stock)}>
              {stock.symbol}: ${stock.price.toFixed(2)}
            </Text>
          ))}
        </ScrollView>
        {selectedStock && (
          <View style={styles.graphContainer}>
            <LineChart
              data={{
                labels: Array.from({ length: 30 }, (_, i) => i + 1).map(String),
                datasets: [{ data: selectedStock.historical }]
              }}
              width={900}
              height={300}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: "rgb(10,10,10)",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 10
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 10
              }}
              bezier
            />
          </View>
        )};
      </View>
        */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  stockcontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end', // aligns children to the right
    alignItems: 'flex-start' // aligns children to the top

  },
  stockBoxContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  graphContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  stockListContainer: {
    flex: 1,
    padding: 10
  },
  stockBox: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#ddd',
    textAlign: 'center'
  },
  categoryContainer: {
    width: 250,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  stockItem: {
    width: '45%',
    backgroundColor: 'rgb(255,255,0)',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  stockText: {
    color: 'white',
    fontSize: 16,
  },
  symbolStyle: {
    color: "white",
    fontSize: 20,
  },
  stockcontainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end', // aligns children to the right
    alignItems: 'flex-start' // aligns children to the top

  },
  stockBoxContainer: {
    flex: 1,
    padding: 10
  },
  graphContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10
  },
  stockListContainer: {
    flex: 1,
    padding: 10
  },
  stockBox: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#ddd',
    textAlign: 'center'
  }
});

export default CombinedComponent;
