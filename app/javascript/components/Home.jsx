import React from "react";
import { Link } from "react-router-dom";
import "../../assets/stylesheets/variable.scss";
import "../../assets/stylesheets/homepage.scss";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/images/funnyImage.gif";
import audiofile from "../../assets/images/funnySound.wav";

class Home extends React.Component {
  //_isMounted = false;
  
  constructor(props) {
    super(props);
     
     this.state = {
            shitcoins: [],
            time: {},
            seconds: 30,
            show: false,
            playSound: true,
          };
          this.timer = 0;
          this.startTimer = this.startTimer.bind(this);
          this.countDown = this.countDown.bind(this);  
  }

  componentDidMount() {
    // this._isMounted = true;
     document.getElementById('logout').style.display="inline"; 
 const token = localStorage.getItem("token");
    if (token) {
      fetch(`/api/v1/auth/auto_login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => {
            localStorage.setItem("user_id",response.id);
          this.setState({user_id:response.id});
          const url = "/api/v1/shit_coins/index/" + localStorage.getItem("user_id");

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        //if (this._isMounted) {
        
        this.setState({ shitcoins: response });
        //}
      })
      .catch(() => this.props.history.push("/"));
        })
        .catch(() => alert("An error occured"));
    }
    else{
       this.props.history.push("/Login");
    }
    
    
  }
  componentWillUnmount() {
    //this._isMounted = false;
  }
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours.toString().length < 2 ? "0" + hours : hours,
      m: minutes.toString().length < 2 ? "0" + minutes : minutes,
      s: seconds.toString().length < 2 ? "0" + seconds : seconds,
    };
    return obj;
  }
  startTimer(rowIndex) {
    //  if (this._isMounted) {
    if (
      (this.state.shitcoins[rowIndex].timer == undefined ||
        this.state.shitcoins[rowIndex].timer == 0) &&
      (this.state.shitcoins[rowIndex].seconds == undefined ||
        this.state.shitcoins[rowIndex].seconds > 0)
    ) {
      var startAt = new Date(this.state.shitcoins[rowIndex].startAt);
      var hour = this.state.shitcoins[rowIndex].length;
      startAt.setHours(startAt.getHours() + parseInt(hour));
      var seconds = (startAt.getTime() - new Date().getTime()) / 1000;
      if (seconds > 0) {
        this.state.shitcoins[rowIndex].seconds = seconds;
        this.state.shitcoins[rowIndex].timer = setInterval(
          () => this.countDown(rowIndex),
          1000
        );
      } else {
        let obj = {
          h: "00",
          m: "00",
          s: "00",
        };
        this.state.shitcoins[rowIndex].time = obj;
      }
    }
    // }
  }

  countDown(index) {
    // Remove one second, set state so a re-render happens.
    // if (this._isMounted) {
    let seconds = this.state.shitcoins[index].seconds - 1;

    // Check if we're at zero.
    if (seconds <= 0) {
      let obj = {
        h: "00",
        m: "00",
        s: "00",
      };
      this.state.shitcoins[index].time = obj;
      clearInterval(this.state.shitcoins[index].timer);
      this.setState({
        show: true,
      });
    } else {
      this.state.shitcoins[index].seconds = seconds;
      this.state.shitcoins[index].time = this.secondsToTime(seconds);
      this.setState({
        shitcoins: this.state.shitcoins,
      });
    }
    // }
  }
  handleClose() {
    this.setState({
      show: false,
    });
  }
  confirmDelete(id, index) {
    var action = confirm("Are you sure to delete this?");
    if (action) {
      const url = "/api/v1/shit_coins/destroy/" + id;
      const token = document.querySelector('meta[name="csrf-token"]').content;
      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => {
          debugger;
          alert("Record deleted successfully");
          var shitcoins = this.state.shitcoins;
          delete shitcoins[index];
          this.setState({ shitcoins: shitcoins });
        })
        .catch(() => alert("Error in deleting record"));
    }
  }

  render() {
    const { shitcoins } = this.state;

    const allShitcoins = shitcoins.map((shitcoin, index) => (
      <tr key={index}>
        <td>
          <a href={shitcoin.url ?? "javascript:;"}>{shitcoin.name}</a>
        </td>
        <td>
          {this.state.shitcoins[index].time != null
            ? this.state.shitcoins[index].time.h
            : this.startTimer(index)}
          :
          {this.state.shitcoins[index].time != null
            ? this.state.shitcoins[index].time.m
            : this.startTimer(index)}
          :
          {this.state.shitcoins[index].time != null
            ? this.state.shitcoins[index].time.s
            : this.startTimer(index)}
        </td>
        <td>{shitcoin.length}hr</td>
        <td>{shitcoin.epochNo}</td>
        <td>
          <Link
            className="button button-main"
            to={`/shitcoin_create/${shitcoin.id}`}
          >
            Edit
          </Link>
          <span className="button-gutter hidden-mobile"></span>
          <button
            className="button button-alt"
            onClick={() => {
              this.confirmDelete(shitcoin.id, index);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    const noShitcoin = (
      <tr>
        <td>
          No shitcoins yet. <Link to="/shitcoin_create"> Create one</Link>
        </td>
      </tr>
    );

    return (
      <>
        <div>
          <div className="home_hero home_section">
            <div className="home_hero_block">
              <h1>
                Manage your
                <span className="accent_color"> DeFi </span>
                assets and liabilities in one simple interface.
              </h1>
              <h3>Get unique access to opportunities in open finance.</h3>
            </div>
          </div>
          <Link className="button button-main link" to="/shitcoin_create">
            Add New
          </Link>
          <div className="home_section home_stats">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Next EPOCH</th>
                  <th>Settings</th>
                  <th>EPoch</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{shitcoins.length > 0 ? allShitcoins : noShitcoin}</tbody>
            </table>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={() => {
            this.handleClose();
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            Woohoo!
            <img
              src={logo}
              alt="loading..."
              style={{ width: 300, height: 300 }}
            />
            <audio autoPlay={this.state.playSound} loop={true}>
              <source src={audiofile} />
            </audio>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
export default Home;
