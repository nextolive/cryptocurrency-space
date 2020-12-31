import React, { useState } from "react";


class Register extends React.Component {
  constructor(props) {
    super(props);
   
     this.state = {  
       name:"",   
      email: "",
      password_digest:""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
   onChange(event) {   
    this.setState({ [event.target.name]: event.target.value });    
  }
  onSubmit(event) {
    event.preventDefault();
     const { name,email,password_digest} = this.state;
    if (name.length == 0||email.length == 0 || password_digest.length == 0 ) {
      return;
    }
    const body = {
      name,
      email,
      password_digest
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/v1/user/create`, {
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
    // setUsername("");
    // setPassword("");
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Register</h1>

            <form onSubmit={this.onSubmit}>
               <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  className="input"
                  placeholder="Enter Full Name"
                  id="name"
                  name="name"
                  className="form-control"
                  required
                  value={this.state.name}
                  onChange={this.onChange}
                ></input>
              </div>
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
                <label htmlFor="password_digest">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  id="password_digest"
                  name="password_digest"
                  className="form-control"
                  required
                  value={this.state.password_digest}
                  onChange={this.onChange}
                ></input>
              </div>

              <button className="button button-main" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
