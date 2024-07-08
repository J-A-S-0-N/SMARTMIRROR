import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const electTrend = ({ percentage }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/');

                setData(response.data.message);
                console.log(response.data.message);
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
            <Text style={styles.TextST}>
                Electricity
            </Text>
            <Text style={styles.DelLater}>
                {"⬇️ by 10%"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        backgroundColor: 'rgb(20,20,20)',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    TextST: {
        fontWeight: 'bold',
        paddingTop: 10,
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
    DelLater: {
        color: "white",
        paddingTop: 50,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filler: {
        alignContent: "center",
        justifyContent: "center",
        width: '100%',
        backgroundColor: 'rgb(80,80,80)',
        borderRadius: 5,
        position: "absolute",
        bottom: 0,
    }
});

export default electTrend;