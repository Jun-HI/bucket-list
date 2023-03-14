import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { Dimensions, StatusBar } from 'react-native';
import Input from './components/Input';
import Task from './components/Task';
import { images } from './images';
import IconButton from './components/IconButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  background-color: #2c2c2c;
  padding: 0px 90px
  display: flex;
  border-radius: 10px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.ttle};
  align-self: center;
  justify-content: center;
  margin: 0px 30px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState({
    1: { id: '1', text: 'Reset Native', completed: true },
    2: { id: '2', text: '세계여행', completed: false },
    3: { id: '3', text: '도서 10000 권 읽기', completed: false },
  });

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    setTasks({ ...tasks, ...newTaskObject });
  };

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    setTasks(currentTasks);
  };
  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />

        <Title>버킷 리스트</Title>

        <Input
          placeholder=" +항목추가"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}
