import React, { useState } from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email.length == 0 || password.length == 0) {
      return;
    }
    const body = {
      email,
      password,
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Login</h1>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="input"
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  className="form-control"
                  required
                  value={this.state.email}
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  className="form-control"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-group" style={{display:'flex'}}>
                <button className="button button-main" type="submit">
                  Submit
                </button>

                <span className="button-gutter hidden-mobile"></span>
                <Link className="button button-alt" to="/Register">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
