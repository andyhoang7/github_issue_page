import React, { Component } from "react";
import ReactModal from "react-modal";
import { Button, Form, Tabs, Tab, ListGroup, Row, Col } from "react-bootstrap";
import moment from "moment";
// import {images} from "./images"
// const ReactMarkdown = require("react-markdown");
const cancel= "./images/cancel.png"
export default class DisplayIssue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newIssue: { title: "", body: "" },
      issues: this.props.issues,
      repoName: this.props.repoName
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
    this.postIssue(value);
  };

  handleChange = ({ currentTarget: input }) => {
    const newIssue = { ...this.state.newIssue };
    newIssue[input.name] = input.value;
    this.setState({ newIssue });
  };
  postIssue = async value => {
    const data = {
      title: this.state.newIssue.title,
      body: this.state.newIssue.body
    };
    const token = this.props.token.split("&");
    const tokenPick = token[0];
    const url = `https://api.github.com/repos/${value}/issues`;

    const config = {
      method: "POST",
      headers: new Headers({
        Authorization: `token ${tokenPick}`,
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
    // console.log('hehehe', this.props.issues)

    const { newIssue } = this.state;
    console.log("ananan", this.props.repoName);

    return (
      <div>
        <div style={{ width: "100vw", height: "3rem"}}>
          <img src={require('./images/title.png')}></img><a href="#" style={{marginLeft:"30px", fontSize:"30px", fontWeight:"bold" }}>{this.props.repoName}</a>
        </div>
        <div>
          <Tabs defaultActiveKey="Issue" id="uncontrolled-tab-example">
            <Tab eventKey="Code" title="Code" />
            <Tab eventKey="Issue" title="Issue" />
            <Tab eventKey="Pull Request" title="Pull Request" />
          </Tabs>
        </div>
        <div style={{marginRight:"30px"}}>
        <Button variant="success" size="lg" style={{marginTop:"30px", marginBottom:"20px"}} onClick={() => this.openModal()}>Create New Issue</Button>
          {/* <button onClick={() => this.openModal()}>Create New Issue</button> */}
        </div>
        <div className="issue-container">
          <ListGroup style={{width:"80vw"}}>
            <ListGroup.Item>
              <div>
                <Row>
                  <Col>
                    <div>
                      <Row>
                        <Col xs={3}>Open</Col>
                        <Col>Close</Col>
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div>
                      <Row>
                        <Col>Author</Col>
                        <Col>Labels</Col>
                        <Col>Projects</Col>
                        <Col>Milestones</Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </div>
            </ListGroup.Item>
            {this.state.issues.length > 0 &&
              this.state.issues.map(issue => (
                <ListGroup.Item action variant="light">
                  <Row>
                    <Col >
                      <div >
                        <a
                          href="#"
                          onClick={() => this.props.openModal(issue.body, issue.user.login)}
                        >
                          
                            
                            {issue.state === "open" ? 
                            <div>
                              <img src={require('./images/check.png')}></img><strong>{issue.title}</strong>
                              
                            </div> :
                            <div>
                              <img src={require('./images/cancel.png')}></img><strong>{issue.title}</strong>
                              
                            </div>  }
                            
                        </a>
                      </div>
                      <div> 
                      {issue.labels.map((label)=>{
                        return(
                          <span href="#" style={{backgroundColor:`#${label.color}`,color: "black",
                          fontWeight: "bold"}}>{label.name}</span>
                          
                        )
                      })}
                      </div>
                    </Col>
                    <Col sm lg={2} >
                    <img src={require('./images/conversation.png')} alt=""></img>
                    <a href="#" >{issue.comments}</a>
                    </Col>
                  </Row>
                  <Row style={{marginTop:"5px", marginLeft:"5px"}}>
                    <small>#{issue.number} opened {moment(issue.created_at).fromNow()} by {issue.user.login}</small>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
        {/* <div>
          {this.state.issues.length > 0 &&
            this.state.issues.map(issue => (
              <a href="#" onClick={() => this.props.openModal(issue.body)}>
                <ul>{issue.title}</ul>
              </a>
            ))}
        </div> */}
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
          <Form onSubmit={e => this.handleSubmit(e, this.props.repoName)}>
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
