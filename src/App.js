import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar"

const clientId = process.env.REACT_APP_CLIENT_ID;

class GetRepoName extends Component {
  constructor(props) {
    super(props);}
  render() {
    console.log("this.props.userRepos", this.props.userRepos)
    return (
      <div>
        
        {this.props.userRepos !== undefined && this.props.userRepos.map(repo => {
          return <ul>Repo name: {repo.name}</ul>;
        })}
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    const existingToken = sessionStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?access_token"
        ? window.location.search.split("=")[1]
        : null;

    this.state = {
      username: null,
      userRepos: []
    };

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken
      };
    }
  }

  componentDidMount = () => {
    this.fetchUser();
    this.fetchUserRepo();
  };

  fetchUser = async () => {
    const response = await fetch("https://api.github.com/users/andyhoang7");
    const data = await response.json();

    const username = data.login;
    this.setState({ username: username });
    // console.log('data', username)
  };

  fetchUserRepo = async () => {
    const response = await fetch(
      "https://api.github.com/users/andyhoang7/repos"
    );
    const data = await response.json();
    console.log("response", response);

    this.setState({ userRepos: data });

    console.log("data", data);
  };

  render() {
    console.log("userRepos", this.state.userRepos)
    return (
      <div>
        <NavBar/>
        <h1>GitHub Issues Page</h1>
        <h2>My username: {this.state.username}</h2>
        <GetRepoName userRepos={this.state.userRepos} />
      </div>
    );
  }
}
