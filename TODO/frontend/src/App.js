// import "./App.css";
import React from "react";
import Navbar from "./components/Menu";
import UserList from "./components/User";
import Footer from "./components/Footer";
// import React, { useState, useEffect } from "react";
import axios from "axios";

const DOMAIN = "http://127.0.0.1:8000/api/";
const get_url = (url) => `${DOMAIN}${url}`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarItems: [{ name: "User", href: "/" }],
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(get_url("users/"))
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Navbar navbarItems={ this.state.navbarItems }/>
        <UserList users={ this.state.users } />
        <Footer />
      </div>
    );
  }
}

export default App;
