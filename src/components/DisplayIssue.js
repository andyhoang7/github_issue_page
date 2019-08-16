import React, { Component } from 'react'
import ReactModal from "react-modal";
import { Button , Form} from "react-bootstrap";

export default class DisplayIssue extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            newIssue:{issueTitle:'', issueBody:''}
        }
    }
    openModal =(value)=>{
        this.setState({
          isOpen:true,
         
    
        })
      }
      closeModal =()=>{
        this.setState({
          isOpen: false
        })
      }
       handleSubmit = e => {
           e.preventDefault()
       }

       handleChange = ({ currentTarget: input}) => {
           const newIssue = {...this.state.newIssue};
           newIssue[input.name] = input.value;
           this.setState ({newIssue})
       }
    
    render() {
        // console.log('hehehe', this.props.issues)

        const { newIssue} = this.state;

        return (
            <div>
            <div>
                <button onClick={()=>this.openModal()}>New Issue</button>
            </div>
            <div>
            {this.props.issues.length > 0 && this.props.issues.map(issue => (
            <a href="#" onClick={()=> this.props.openModal(issue.body)}><ul>{issue.title}</ul></a>
            )
            )}
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
    <Form.Control type="text" placeholder="Issue Title" 
    value={newIssue.issueTitle}
    onChange={this.handleChange}
    id="issueTitle"
    name="issueTitle" />
   
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Description</Form.Label>
    <Form.Control type="text" placeholder="Description" 
    value={newIssue.issueBody}
    onCHange={this.handleChange}
    id="Description"
    name="Description"/>
  </Form.Group>
  <Form.Group controlId="formBasicChecbox">
    
  </Form.Group>
  <Button variant="primary" type="submit" >
    Submit
  </Button>
</Form>
        </ReactModal>


            
            </div>
        )}}
