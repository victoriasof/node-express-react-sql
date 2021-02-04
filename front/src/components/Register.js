import React, { Component } from "react";

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password:""
        };
    }

    handleRegister = () => {
        // TODO use fetch on /api/register, get token and save it to localStorage
        // localStorage.getItem('token');
    }

    handleChange = (name, value) => {
        // console.log('name', name);
        // console.log('value', value);
        this.setState({
            [name]: value
        });
    }

    render() {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={this.handleRegister}>
          <input type="text" 
            name="name" 
            id="name" 
            placeholder="Your name" 
            value={this.state.name}
            onChange={e => this.handleChange(e.target.name, e.target.value)}
          />
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
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }
}
