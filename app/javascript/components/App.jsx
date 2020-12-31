import React, { useState, useEffect } from "react";
import Routes from "../routes/Index";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state={isLogin:"none"}
  }

  logout() {
    localStorage.clear();
    window.location.href="/Login";
  }

  render() {
    return (
      <div>
        <div className="container home">
          <div className="header">
            <a className="header_brand" href="/">
              <div className="header_brand_logo">
                <div className="zapper_logo "></div>
              </div>
              <span className="header_brand_name">Money Printer</span>
            </a>
            <div className="header_right hidden-mobile">
              <div className="header_home">
                <a
                  href="#"
                  
                  rel="noopener noreferrer"
                >
                  Coins
                </a>
                <a
                  href="#"
                  
                  rel="noopener noreferrer"
                >
                  DeFi Calc (Coming soon)
                </a>
                <a
                  href="#"
                  rel="noopener noreferrer"
                  style={{display:this.state.isLogin}}
                  
                  id="logout"
                  onClick={this.logout}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
          <div
            className="__react_component_tooltip tb36b7df7-f596-49b5-b096-72d555733f08 place-top type-dark"
            data-id="tooltip"
          ></div>
        </div>
        <div className="container">{this.props.children}</div>
        <div className="footer">
          <div className="container">
            <a
              className="footer_link"
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="icon undefined twitter"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </div>
            </a>
            <a
              className="footer_link"
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="icon icon--accent discord"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
                </svg>
              </div>
            </a>
            <a
              className="footer_link"
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
            >
              FAQ
            </a>
            <a
              className="footer_link"
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
            <a
              className="footer_link"
              href="javascript:;"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Support
            </a>
            <a className="footer_link" href="javascript:;">
              Supported Platforms
            </a>
            <div className="dropdown dropdown_locale">
              <div className="dropdown_locale_header">
                en
                <div className="flex flex-center">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    className="icon undefined"
                    height="1.1em"
                    width="1.1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M128 192l128 128 128-128z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="footer_copyright">© Money Printer 2020</div>
          </div>
        </div>
      </div>
    );
  }
}
// export default App;

export default (props) => <App>{Routes}</App>;
