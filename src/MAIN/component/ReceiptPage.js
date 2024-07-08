import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReceiptPage = () => {
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

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.SUBContainer}>
                <Text style={styles.headerText}>
                    {"Stats\n"}
                </Text>
                <Text style={styles.boldText}> 
                    {"Total Charge: $82\n"}
                </Text>
                <Text style={styles.normalText}> 
                    Basic charges $35
                </Text>
                <Text style={styles.normalText}> 
                    Energy charges $23
                </Text>
            </View>

            <View style={styles.SUBContainer}>
                <Text style={styles.boldText}> 
                    {"Total saved: $82\n"}
                </Text>
                <Text style={styles.normalText}> 
                    climate charges $35
                </Text>
                <Text style={styles.normalText}> 
                    Resource charges$23
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end', // Align children to the right
        justifyContent: 'flex-start', // Align children to the top
        padding: 10,
        backgroundColor: 'rgb(0,0,0)', // Light background color for contrast
    },
    SUBContainer: {
        width: 400,
        margin: 10,
        marginBottom: 50,
        backgroundColor: "rgb(10,10,10)", // Corrected color format
        padding: 40,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "white",
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "white",
    },
    normalText: {
        fontSize: 18,
        color: "white",
    }
});

export default ReceiptPage;
