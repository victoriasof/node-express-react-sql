import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
