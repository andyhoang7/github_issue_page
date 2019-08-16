import React, { Component } from 'react';
import {
  
    Button,
    
    
    Card,


  } from "react-bootstrap";

class ReposCard extends Component {
    
    render() {
        return (
            <div>
            <Card style={{ width: '18rem' }}>
  
  <Card.Body>
    
  <a href="#" onClick={()=> this.props.getIssue(this.props.repo.full_name)}><Card.Title >{this.props.repo.full_name}</Card.Title></a>
    <Card.Text>
      {this.props.repo.description}
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
                
            </div>
        );
    }
}

export default ReposCard;