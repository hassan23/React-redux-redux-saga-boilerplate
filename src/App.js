import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import TodoList from './TodoList';

import configureStore from './store';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <TodoList />
        </div>
      </Provider>
    );
  }
}

export default App;
