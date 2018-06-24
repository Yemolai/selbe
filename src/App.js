import React from 'react';
import PostList from './components/PostList';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <PostList/>
      </div>
    );
  }
}

export default App;
