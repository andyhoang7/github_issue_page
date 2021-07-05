import React, { Component } from "react";
import logo from "./logo.svg";

import NavBar from "./components/NavBar";
import Repos from "./components/Repos";
import DisplayIssue from "./components/DisplayIssue";
import {
  Button,
  Container,
  Row,
  Col,
  Pagination,
  ListGroup,
  ButtonToolbar
} from "react-bootstrap";
import ReactModal from "react-modal";
import { IoIosGitMerge} from "react-icons/io";


import "./App.css";

const clientId = process.env.REACT_APP_CLIENT_ID;
const ReactMarkdown = require("react-markdown");
const ReactDOM = require("react-dom");

const parse = require("parse-link-header");
const parsed = parse(
  '<https://api.github.com/search/repositories?q=react&page=2>; rel="next", <https://api.github.com/search/repositories?q=react&page=34>; rel="last"'
);
const total_pages = parsed.last.page;

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.75)"
};
const modalStyle = {
  position: "absolute",
  top: "100px",
  left: "100px",
  right: "100px",
  bottom: "100px",
  border: "1px solid #ccc",
  background: "#fff",
  overflow: "auto",
  WebkitOverflowScrolling: "touch",
  borderRadius: "4px",
  outline: "none",
  padding: "20px"
};

class GetRepoName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log("this.props.userRepos", this.props.userRepos)
    console.log("map", total_pages);
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
        ? window.location.search.split("=")[1].slice(0, -6)
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
        issueContent: "",
        total_page: 0,
        issueUser: ""
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
        issueContent: "",
        total_page: 0,
        issueUser: ""
      };
    }
  }

  componentDidMount = () => {
    // this.fetchUser();
    // this.fetchUserRepo();
  };

  getIssue = async value => {
    // const response = await fetch(
    //   `https://api.github.com/repos/${value}/issues`
    // );
    // const data = await response.json();
    // let total_issue=0
    const response = await fetch(
      `https://api.github.com/search/issues?q=repo:${value}+type:issue`
    );
    const data = await response.json();
    console.log("kimkim", data.total_count);

    this.setState({
      issues: data.items,
      isShow: false,
      repoName: value,
      total_issue: data.total_count
    });
    console.log("Totalcount", this.state.total_issue);
    console.log("issueUser", data.items[0].user)
    // console.log(repoName );
  };


 

  fetchUserRepo = async () => {
    const response = await fetch(
      "https://api.github.com/users/andyhoang7/repos"
    );
    const data = await response.json();
    console.log("typeOF", typeof data);

  //   const username = data.login;
  //   this.setState({ username: username });
  //   // console.log('data', username)
  // };

  // fetchUserRepo = async () => {
  //   const response = await fetch(
  //     "https://api.github.com/users/andyhoang7/repos"
  //   );
  //   const data = await response.json();
  //   console.log("typeOF", typeof data);

  //   this.setState({ userRepos: data });

  //   // console.log("data", data);
  // };

  handleClick = e => {
    e.preventDefault();
    this.searchRepos();
    
  };
  searchRepos = async page => {
    let repos = [];

    const response = await fetch(
      `https://api.github.com/search/repositories?q=${
        this.state.userInput
      }&page=${page}`
    );
    const jsonData = await response.json();
    // console.log("phuong",jsonData.items[0].full_name)

    console.log("mai", jsonData);
    // console.log('khoa',this.state.repos)

    if (jsonData.items.length === 0) {
      alert("there is an error");
    } else {
      this.setState({
        repos: repos.concat(jsonData.items),
        allRepos: this.state.allRepos.concat(jsonData.items),
        page: page,
        total_page: total_pages
      });
      console.log("khoa", this.state.allRepos);
    }
  };

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

  openModal = (value1, value2) => {
    this.setState({
      isOpen: true,
      issueContent: value1,
      issueUser: value2
    });
    // console.log("mommyyyy", value);
  };

  closeModal = () => {
    this.setState({
      isOpen: false
    });
  };
  renderPagination() {
    let pages = [];
    for (let i = 1; i <= Math.min(this.state.total_pages, 30); i++) {
      pages.push(i);
    }
    return pages.map(page => {
      if (page <= this.state.page + 3 && page >= this.state.page - 3) {
        return (
          <Pagination.Item
            active={page === this.state.page}
            onClick={() => this.searchRepos(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
    });
  }

  render() {
    // console.log("userRepos", this.state.userRepos
    // console.log("hahaha", this.state.total_page);
    return (
      <wrap>
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
              <Row
                style={{
                  width: "100vw",
                  height: "100vh",
                  marginTop: 50,
                  fontWeight: "200px"
                }}
              >
                <Col lg={2} className="column-one">
                  <ButtonToolbar>
                    <Button variant="success" className="float-right">
                      New
                    </Button>
                  </ButtonToolbar>
                  <h1>{this.state.hello}</h1>
                  <h1 style={{ fontWeight: "600", fontSize: "1rem" }}>
                    Repositories{" "}
                  </h1>
                  <h2 style={{ fontWeight: "500", fontSize: "1rem" }}>
                    My username: {this.state.username}
                  </h2>

                  <GetRepoName userRepos={this.state.userRepos} />
                </Col>
                <Col lg={7} className="column-two">
                  <div className="box-one">
                    <div className="one">
                      <h1
                        style={{
                          fontWeight: "500",
                          fontSize: "30px",
                          lineHeight: "1.5"
                        }}
                      >
                        Learn Git and GitHub without any <br />
                        code!
                      </h1>
                      <span
                        style={{
                          fontWeight: "450",
                          fontSize: "18px",
                          lineHeight: "1.5",
                          color: "#586069",
                          marginBottom: "30px",
                          marginTop: "10px"
                        }}
                      >
                        Using the Hello World guide, you'll create the
                        repository, start a <br /> branch, write common, and
                        open a pull request
                      </span>
                      <div>
                        <div className="buttonGroup">
                          <Button
                            variant="primary"
                            size="lg"
                            style={{
                              backgroundColor: "#28a745",
                              fontSize: "x-large",
                              lineHeight: "unset",
                              color: "white",
                              borderColor: "#28a745"
                            }}
                          >
                            Read the guide
                          </Button>
                          <Button
                            variant="secondary"
                            size="lg"
                            style={{
                              backgroundColor: "white",
                              fontSize: "x-large",
                              lineHeight: "unset",
                              paddingLeft: "10px",
                              color: "black",
                              borderColor: "white"
                            }}
                          >
                            {" "}
                            Start a project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row-one" />
                  <div className="row-one">
                    <Row style={{ paddingTop: 50 }}>
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
                <Col lg={3} className="column-three">
                  <div className="row-one-col-three">
                    <div className="box-two">
                      <h5
                        style={{
                          fontSize: "medium",
                          fontWeight: "600",
                          marginTop: "0.5rem",
                          padding: "1rem",
                          lineHeight: "0.5rem"
                        }}
                      >
                      GitHub Actions beta, now with CI/CD
                        
                      </h5>
                      <span>
                        Automate any workflow with GitHub Actions. See the
                        latest updates and register for the beta.
                      </span>
                    </div>
                  </div>
                  <div className="row-one-col-three">
                    <div className="box-three">
                      <h5
                        style={{
                          fontSize: "medium",
                          fontWeight: "600",
                          marginTop: "0.5rem",
                          padding: "0.5rem",
                          lineHeight: "0.5rem"
                        }}
                      >
                        GitHub Sponsors Matching Fund
                      </h5>
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
                  // allRepos={this.state.allRepos}
                  getIssue={this.getIssue}
                  repos={this.state.repos}
                />
                <Pagination>
                  <Pagination.First onClick={() => this.searchRepos(1)} />
                  <Pagination.Prev
                    disabled={this.state.page === 1}
                    onClick={() => this.searchRepos(this.state.page - 1)}
                  />
                  {this.renderPagination()}
                  <Pagination.Next
                    disabled={
                      this.state.page === Math.min(this.state.total_pages, 30)
                    }
                    onClick={() => this.searchRepos(this.state.page + 1)}
                  />
                  <Pagination.Last
                    onClick={() =>
                      this.searchRepos(Math.min(this.state.total_pages, 30))
                    }
                  />
                </Pagination>
              </>
            )}

            {this.state.issues.length > 0 && (
              <>
                <DisplayIssue
                  issues={this.state.issues}
                  openModal={this.openModal}
                  getIssue={this.getIssue}
                  repoName={this.state.repoName}
                  token={this.state.token}
                />
              </>
            )}
          </>
        )}

        <ReactModal
          isOpen={this.state.isOpen}
          onRequestClose={() => this.closeModal()}
          overlayClassName="ReactModal__Overlay"
          closeTimeoutMS={1000}
          style={{
            overlay: backdropStyle,
            content: modalStyle
          }}
        >
          {/* <h1>{this.state.issueContent}</h1> */}
          <ListGroup>
            <ListGroup.Item>{this.state.issueUser}</ListGroup.Item>
            <ListGroup.Item>
              <small>{this.state.issueContent}</small>
            </ListGroup.Item>
          </ListGroup>
        </ReactModal>
      </wrap>
    );
  }
}
