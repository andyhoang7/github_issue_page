import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';






const clientId = process.env.REACT_APP_CLIENT_ID;

export default class App extends Component {

  

constructor(props) {
  super(props);
  const existingToken = sessionStorage.getItem('token');
  const accessToken = (window.location.search.split("=")[0] === "?access_token") ? window.location.search.split("=")[1] : null;

  if (!accessToken && !existingToken) {
    window.location.replace(`https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`)
  }

  if (accessToken) {
    console.log(`New accessToken: ${accessToken}`);

    sessionStorage.setItem("token", accessToken);
    this.state = {
      token: accessToken
    }
  }

  if (existingToken) {
    this.state = {
      token: existingToken
    };
  }
}

componentDidMount = () => {
  this.fetchUser()
}

fetchUser = async() => {
  const response = await fetch('https://api.github.com/users/andyhoang7')
  const data = await response.json()

  console.log('data', data)
}





  render() {
    return (
      <div>
        <h1>GitHub Issues Page</h1>
      </div>
    )
  }
}

