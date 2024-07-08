import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Button } from 'react-native';

const TODOapp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const returnTaskLength = () => {
        return (
            <Text>total task left: {tasks.length}</Text>
        );
    }

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DAILY TODO</Text>
            <View style={styles.innerView}>
                <TextInput
                    style={styles.input}
                    value={newTask}
                    onChangeText={text => setNewTask(text)}
                    placeholder="Add new task..."
                //onSubmitEditing={addTask}
                />
                <Button style={styles.button} title="click me" onPress={addTask}></Button>
            </View>
            <ScrollView style={styles.taskList}>
                {tasks.map(task => (
                    <TouchableOpacity
                        key={task.id}
                        onPress={() => toggleTaskCompletion(task.id)}
                        onLongPress={() => deleteTask(task.id)}
                        style={[styles.taskItem, { backgroundColor: task.completed ? '#90EE90' : '#FFFFFF' }]}
                    >
                        <Text style={styles.taskText}>{task.text}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0)',
        alignItems: 'right',
        justifyContent: 'right',
        padding: 20,
    },
    title: {
        color: "rgb(255,255,255)",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: "30%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    taskList: {
        width: '100%',
    },
    taskItem: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    taskText: {
        fontSize: 18,
    },
    innerView: {
        flex: 1
    },
    button: {
        width: 10
    }
});

export default TODOapp;