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
  handleSubmit = (e, value) => {
    e.preventDefault();
    // this.setState({
    //   issues: this.state.issues.concat(this.state.newIssue)
    // });
    this.postIssue(value)
  };

  handleChange = ({ currentTarget: input }) => {
    const newIssue = { ...this.state.newIssue };
    newIssue[input.name] = input.value;
    this.setState({ newIssue });
  };

  postIssue = async (value) => {
   
    const data = {
      title: this.state.newIssue.title,
      body: this.state.newIssue.body
    };
    const token = this.props.token.split("&")
    const tokenPick = token[0]
    const url = `https://api.github.com/repos/${value}/issues`;
    const config = {
      method: "POST",
      headers: new Headers ({
        "Authorization" : `token ${tokenPick}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(data)
    };
    this.setState({ isOpen: false });
    const response = await fetch(url, config);
    if (response.status === 200) {
      this.props.getIssue();
    }
  };

  render() {

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
              borderRadius: 15,
              
              margin: 50,
              padding: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <Form onSubmit={(e)=>this.handleSubmit(e, this.props.repoName)}>
            <Form.Group controlId="formBasicEmail" className="formInput"
>
              <Form.Label>Issue Title</Form.Label>
              <Form.Control
              required
                type="text"
                placeholder="Issue Title"
                value={newIssue.title}
                onChange={this.handleChange}
                id="title"
                name="title"
                className="titleInput"
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
                className="bodyInput"
                as="textarea" rows="5" cols='120' 

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
