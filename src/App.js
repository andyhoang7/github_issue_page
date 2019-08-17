import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import Repos from "./components/Repos";
import DisplayIssue from "./components/DisplayIssue";
import { Button, Container, Row, Col } from "react-bootstrap";
import ReactModal from "react-modal";

const clientId = process.env.REACT_APP_CLIENT_ID;

class GetRepoName extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log("this.props.userRepos", this.props.userRepos)
    return (
      <div>
        {this.props.userRepos !== undefined &&
          this.props.userRepos.map(repo => {
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

    if (!accessToken && !existingToken) {
      window.location.replace(
        `https://github.com/login/oauth/authorize?scope=user:email,repo&client_id=${clientId}`
      );
    }

    if (accessToken) {
      console.log(`New accessToken: ${accessToken}`);

      sessionStorage.setItem("token", accessToken);
      this.state = {
        token: accessToken,
        username: null,
        userRepos: [],
        repos: [],
        userInput: "",
        allRepos: [],
        page: 1,
        issues: [],
        isShow: true,
        isOpen: false,
        issueContent: ""
      };
    }

    if (existingToken) {
      this.state = {
        token: existingToken,
        username: null,
        userRepos: [],
        repos: [],
        userInput: "",
        allRepos: [],
        page: 1,
        issues: [],
        isShow: true,
        isOpen: false,
        issueContent: ""
      };
    }
  }

  componentDidMount = () => {
    this.fetchUser();
    this.fetchUserRepo();
  };

  getIssue = async value => {
    const response = await fetch(
      `https://api.github.com/repos/${value}/issues`
    );
    const data = await response.json();

    this.setState({
      issues: data,
      isShow: false
    });
    console.log("data", data);
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
    // console.log("response", response);

    this.setState({ userRepos: data });

    // console.log("data", data);
  };

  handleClick = e => {
    e.preventDefault();
    this.searchRepos();
  };
  searchRepos = async () => {
    let repos = [];

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${
        this.state.userInput
      }&page=${this.state.page}`
    );
    const jsonData = await response.json();
    // console.log("phuong",jsonData.items[0].full_name)
    // this.setState({userFullName: jsonData.items[0].full_name})
    console.log("mai", jsonData.items);
    // console.log('khoa',this.state.repos)

    // console.log('para',repos)
    if (jsonData.items.length === 0) {
      alert("there is an error");
    } else {
      this.setState({
        repos: repos.concat(jsonData.items),
        allRepos: this.state.allRepos.concat(jsonData.items),
        page: this.state.page + 1
      });
      console.log("khoa", this.state.allRepos);
    }
  };

  // getIssue = async () => {
  //   const response = await fetch(`https://api.github.com/repos/${this.state.}/issues`)
  // }

  handleOnchange = e => {
    e.preventDefault();
    this.setState({ userInput: e.target.value });
  };

  filterRepos = searchTerm => {
    const filteredRepos = this.state.allRepos.filter(repo => {
      return repo.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    this.setState({ repos: filteredRepos, userInput: "" });
    console.log("filterrepo", this.state.repos);
  };

  openModal = value => {
    this.setState({
      isOpen: true,
      issueContent: value
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    // console.log("userRepos", this.state.userRepos)
    return (
      <div>
        <NavBar
          handleClick={this.handleClick}
          handleOnchange={this.handleOnchange}
          searchRepos={this.searchRepos}
        />

        {this.state.allRepos.length === 0 && (
          <>
            <Container
              style={{
                width: "100vw",
                heigh: "100vh",
                marginLeft: 0,
                marginRight: 0
              }}
            >
              <Row style={{ width: "100vw", height: "100vh", marginTop: 50 }}>
                <Col sm={3} className="column-one">
                  <h1>{this.state.hello}</h1>
                  <h1>GitHub Issues Page</h1>
                  <h2>My username: {this.state.username}</h2>
                  <GetRepoName userRepos={this.state.userRepos} />

                  

                </Col>
                <Col sm={6} className="column-two">
                  <div className="row-one">
                    <div className="box-one">
                      <h1>Learn Git and Github without any code!</h1>
                      <span>
                        Using the Hello World guide, yoiu'll create the
                        repository,start a branch,write common, and open a pull
                        request
                      </span>
                      <div>
                        <button>Read the Guide</button>
                        <button>Start a Project</button>
                      </div>
                    </div>
                  </div>
                  <div className="row-one" />
                  <div className="row-one">
                    <Row>
                      <Col xs={5}>2019 Github, Inc</Col>
                      <Col>
                        <div>
                          <a href="#">Blog</a>
                        </div>
                        <div>
                          <a href="#">About</a>
                        </div>
                        <div>
                          <a href="#">Shop</a>
                        </div>
                        <div>
                          <a href="#">Contact Github</a>
                        </div>
                        <div>
                          <a href="#">Pricing</a>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          <a href="#">API</a>
                        </div>
                        <div>
                          <a href="#">Training</a>
                        </div>
                        <div>
                          {" "}
                          <a href="#">Status</a>
                        </div>
                        <div>
                          <a href="#">Security</a>
                        </div>
                      </Col>
                      <Col>
                        <div>
                          {" "}
                          <a href="#">Terms</a>
                        </div>
                        <div>
                          {" "}
                          <a href="#">Privacy</a>
                        </div>
                        <div>
                          {" "}
                          <a href="#">Terms</a>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm={3} className="column-three">
                  <div className="row-one-col-three">
                    <div className="box-two">
                      <h5>GitHub Actions beta, now with CI/CD</h5>
                      <span>
                        Automate any workflow with GitHub Actions. See the
                        latest updates and register for the beta.
                      </span>
                    </div>
                  </div>
                  <div className="row-one-col-three">
                    <div className="box-three">
                      <h5>GitHub Sponsors Matching Fund</h5>
                      <span>
                        Ready to support open source? GitHub will match your
                        contribution to developers during their first year in
                        GitHub Sponsors.
                      </span>
                    </div>
                  </div>
                  <div className="row-one-col-three">
                    <div className="box-four">
                      Welcome to the new dashboard. Get closer to the stuff you
                      care about most.
                    </div>
                  </div>
                  <div className="row-one-col-three" />
                </Col>
              </Row>
            </Container>
          </>
        )}

        {this.state.allRepos.length > 0 && (
          <>
          {this.state.issues.length === 0 && (
          <>
          <Repos
                    allRepos={this.state.allRepos}
                    getIssue={this.getIssue}
                  />
                  <Button onClick={() => this.searchRepos(this.state.page)}>
                    More
                  </Button>
                  </>
        )}

        {this.state.issues.length > 0 && (
          <>
            <DisplayIssue
              issues={this.state.issues}
              openModal={this.openModal}
            />
          </>
        )}
        </>)}

        <ReactModal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.closeModal()}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: 50
            },
            content: {
              backgroundColor: "black",
              borderRadius: 5,
              Width: 400,
              Height: 300,
              margin: "0 auto",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <h1>{this.state.issueContent}</h1>
        </ReactModal>
      </div>
    );
  }
}
