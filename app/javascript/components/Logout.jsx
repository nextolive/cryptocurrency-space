import React, { useState } from "react";



class Logout extends React.Component {
  constructor(props) {
    super(props);
    localStorage.clear();    
    props.history.push("/");
  }
   render() {
    return (
        <div></div>
    );
   }
}
export default Logout;