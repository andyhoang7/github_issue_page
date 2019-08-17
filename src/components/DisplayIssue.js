import React, { Component } from "react";
import ReactModal from "react-modal";
import { Button, Form } from "react-bootstrap";

export default class DisplayIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newIssue: { title: "", body: "" },
      issues: this.props.issues
    };
  }
  openModal = value => {
    this.setState({
      isOpen: true
    });
  };
  closeModal = () => {
    this.setState({
      isOpen: false
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      issues: this.state.issues.concat(this.state.newIssue) 
    })
  };

  handleChange = ({ currentTarget: input }) => {
    const newIssue = { ...this.state.newIssue };
    newIssue[input.name] = input.value;
    this.setState({ newIssue });
  };

  // postIssue = async () => {
  //   let data = new URLSearchParams();
  //   data.append("title", this.state.newIssue.title);
  //   data.append("body", this.state.newIssue.body);
  //   const url = `https://api.github.com/repos/${value}/issues`;
  //   const config = {
  //     method: "POST",
  //     headers: {
  //       "Authorization" : `token ${this.state.token}`
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: data.toString(),
  //     json: true
  //   };
  //   this.setState({ isOpen: false });
  //   const response = await fetch(url, config);
  //   if (response.status == 200) {
  //     this.props.searchRepos();
  //   }
  // };


  render() {
    // console.log('hehehe', this.props.issues)

    const { newIssue } = this.state;

    return (
      <div>
        <div>
          <button onClick={() => this.openModal()}>Create New Issue</button>
        </div>
        <div>
          {this.state.issues.length > 0 &&
            this.state.issues.map(issue => (
              <a href="#" onClick={() => this.props.openModal(issue.body)}>
                <ul>{issue.title}</ul>
              </a>
            ))}
        </div>
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
              backgroundColor: "white",
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
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Issue Title"
                value={newIssue.title}
                onChange={this.handleChange}
                id="title"
                name="title"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={newIssue.body}
                onChange={this.handleChange}
                id="body"
                name="body"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </ReactModal>
      </div>
    );
  }
}
