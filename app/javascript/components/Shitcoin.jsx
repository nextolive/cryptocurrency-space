import React from "react";
import { Link } from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime';
import * as moment from 'moment'


class NewShitCoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      length: "",
      startAt: "",
      epochNo: "",
      user_id: localStorage.getItem("user_id"),
      url:""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    const {
      match: {
        params: { id },
      },
    } = this.props;

    if (id != undefined) this.loadShitcoin();
  }

  loadShitcoin() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `/api/v1/shit_coins/show/${id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        this.setState({
          id: response.id,
          name: response.name,
          length: response.length,
          startAt: response.startAt,
          epochNo: response.epochNo,
          user_id: response.user_id,
          url:response.url??""
        });
      })
      .catch(() => this.props.history.push("/"));
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  onChange(event) {
    if(event.target!=undefined)
    {
    this.setState({ [event.target.name]: event.target.value });
    }
    else
    {
    this.setState({"startAt": event._d });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.state.id > 0) {
      this.updateExisting();
    } else {
      this.createNew();
    }
  }

  createNew() {
    const requestUrl = "/api/v1/shit_coins/create";
    const { id, name, length, startAt,epochNo, user_id, url } = this.state;
    if (name.length == 0 || length.length == 0 || startAt.length == 0) {
      return;
    }
    const body = {
      name,
      length,
      startAt,
      epochNo,
       user_id,
      url
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        alert("Record added successfully");
        this.props.history.push("/");
      })
      .catch(() => alert("Error in inserting record"));
  }

  updateExisting() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const requestUrl = `/api/v1/shit_coins/update/${id}`;

    const { name, length, startAt ,epochNo,user_id, url} = this.state;

    if (name.length == 0 || length.length == 0 || startAt.length == 0) {
      return;
    }
    const body = {
      id,
      name,
      length,
      startAt,
      epochNo,
      user_id, 
      url
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(requestUrl, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        alert("Record updated successfully");
        this.props.history.push("/");
      })
      .catch(() => alert("Error in inserting record"));
  }

  render() {
    const today = moment();
const disableFutureDt = current => {
  return current.isBefore(today)
}
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add/edit ShitCoin</h1>

            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="shitCoinName">Name</label>
                <input
                  className="input"
                  placeholder="Enter ShitCoin Name"
                  id="shitCoinName"
                  name="name"
                  className="form-control"
                  required
                  value={this.state.name}
                  onChange={this.onChange}
                ></input>
              </div>
               <div className="form-group">
                <label htmlFor="shitCoinName">EPOCH No</label>
                <input
                  className="input"
                  placeholder="Enter EPoch Number"
                  id="shitCoinEPoch"
                  name="epochNo"
                  className="form-control"
                  required
                  value={this.state.epochNo}
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="shitCoinLength">Length</label>
                <input
                  className="input"
                  placeholder="Enter Length in Hrs"
                  id="shitCoinLength"
                  name="length"
                  className="form-control"
                  required
                  value={this.state.length}
                  onChange={this.onChange}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="shitCoinStartAt">Start At</label>                
                <Datetime className="input"
                  placeholder="Enter ShitCoin Start Time"
                  id="shitCoinStartAt"
                  name="startAt"
                  value={new Date(this.state.startAt)}                  
                  required={true}
                  isValidDate={disableFutureDt}                  
                  onChange={this.onChange}/>
              
              </div>
               <div className="form-group">
                <label htmlFor="shitCoinUrl">Url</label>
                <input
                  className="input"
                  placeholder="Enter Url"
                  id="shitCoinUrl"
                  name="url"
                  className="form-control"
                  required
                  value={this.state.url}
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
export default NewShitCoin;
