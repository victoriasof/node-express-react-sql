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

    handleRegister = (e) => {
        // function getCookie(cname) {
        //   var name = cname + "=";
        //   var decodedCookie = decodeURIComponent(document.cookie);
        //   var ca = decodedCookie.split(';');
        //   for(var i = 0; i <ca.length; i++) {
        //     var c = ca[i];
        //     while (c.charAt(0) == ' ') {
        //       c = c.substring(1);
        //     }
        //     if (c.indexOf(name) == 0) {
        //       return c.substring(name.length, c.length);
        //     }
        //   }
        //   return "";
        // }

        // TODO use fetch on /api/register, get token and save it to localStorage
        // localStorage.getItem('token');
        e.preventDefault();
        const options = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
        };
        fetch("http://localhost:3000/api/register", options)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const token = data.token;
          if (token) {
            localStorage.setItem('token', token);
            // localStorage.getItem('token');
            // localStorage.removeItem('token');

            // document.cookie = 'token="' + token + '"';
            // document.cookie = `token="${token}"`;
            // getCookie('token');
          }
        });
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
