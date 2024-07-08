import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const waterTrend= ({ percentage }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.TextST}>
                Water
            </Text>
            <Text style={styles.DelLater}>
            ⬆️ by 12%
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
        justifyContent: 'center', // Centers the child vertically
        alignItems: 'center', // Centers the child horizontally
    },

    TextST: {
        fontWeight: 'bold',
        paddingTop: 13,
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

export default waterTrend;