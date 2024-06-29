import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks([...tasks, { id: Date.now(), title: taskTitle, status: false }]);
      setTaskTitle('');
      setIsButtonDisabled(true);
    }
  };

  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskTitle}>{item.title}</Text>
      <TouchableOpacity
        style={[styles.checkbox, item.status ? styles.checkboxChecked : styles.checkboxUnchecked]}
        onPress={() => toggleTaskStatus(item.id)}
      >
        {item.status && <Text style={styles.checkboxText}>✓</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleTitleChange = (title) => {
    setTaskTitle(title);
    setIsButtonDisabled(title.trim() === '');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task Title"
          value={taskTitle}
          onChangeText={handleTitleChange}
        />
        <Button title="Add Task" onPress={addTask} disabled={isButtonDisabled} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxUnchecked: {
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  checkboxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
  },
});

export default HomePage;
