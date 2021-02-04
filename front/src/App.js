import './App.css';
import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    // Always use fetch only in componentDidMount lifecycle method
    // https://reactjs.org/docs/faq-ajax.html
    fetch('http://localhost:3000/api/users')
    .then((res) => res.json())
    .then(data => this.setState({
      users: data
    }));

    // Get only one user by ID
    fetch('http://localhost:3000/api/users/1')
    .then((res) => res.json())
    .then(data => console.log(data));

    fetch(
      'http://localhost:3000/api/projects',
      {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
    .then((res) => res.json())
    .then(data => {
      console.log('projects fetch');
      console.log(data)
    });
  }

  handleLogout () {
    localStorage.removeItem('token');
  }

  render() {
    return (
      <div className="App">
        <p>App.js</p>
        {this.state.users.map(user => (
          <p>{user.name} {user.email}</p>
        ))}

        <Login />
        <Register />

          <br/>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default App;
