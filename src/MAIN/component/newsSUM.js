import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const NewsHeadlines = () => {
  const [techNews, setTechNews] = useState([]);

  useEffect(() => {
    fetchNews('technology', setTechNews);
  }, []);

  const fetchNews = async (category, setState) => {
    const apiKey = '6af89881631140be8710282f3dbc80e9';  
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=us&apiKey=${apiKey}`;
    try {
      const response = await axios.get(url);
			console.log(response);
      setState(response.data.articles);
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
    }
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>News</Text>
      <FlatList
        data={techNews}
        renderItem={renderNewsItem}
        keyExtractor={(item, index) => `tech-${index}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(10,10,10)',
    borderRadius: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(40,40,40)'
  },
  title: {
    color: 'rgb(230,230,230)',
    fontSize: 14,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 5,
    paddingLeft: 10
  }
});

export default NewsHeadlines;
