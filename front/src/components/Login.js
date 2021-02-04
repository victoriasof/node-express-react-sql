import React, { Component } from "react";

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };
    fetch("http://localhost:3000/api/login", options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const token = data.token;
      if (token) {
        localStorage.setItem('token', token);
      }
    });
}

  handleChange = (name, value) => {
    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
