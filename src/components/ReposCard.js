import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Moment from "react-moment";
import { IoIosStar, IoIosPaper } from "react-icons/io";



class ReposCard extends Component {
  render() {
    return (
      <div className="repoCard">
        <Card style={{ width: "50rem"}} >
          <Card.Body className="shadow-box-example hoverable">
            <Container className="containerCard">
              <a
                href="#"
                onClick={() => this.props.getIssue(this.props.repo.full_name)}
              >
                <Card.Title>{this.props.repo.full_name}</Card.Title>
              </a>

              <Row>
                <Col>
                  <Card.Text>
                    {this.props.repo.description}
                    <br />
                    <div >
                      <sub style={{ marginRight: 20 }}>
                        Updated{" "}
                        <Moment fromNow>{this.props.repo.updated_at}</Moment>{" "}
                      </sub>
                      <sub>
                        Open Issues:{" "}
                        {this.props.repo.open_issues_count}
                      </sub>
                    </div>
                  </Card.Text>
                </Col>
                <Col md="auto">
                  {" "}
                  <p  style={{fontSize: 13}}><IoIosPaper style={{marginBottom: 3, marginRight: 3}}/>{this.props.repo.language}</p>
                </Col>
                <Col xs lg="2">
                  <p  style={{fontSize: 13}}><IoIosStar style={{marginBottom: 3, marginRight: 3}}/>{this.props.repo.stargazers_count}</p>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default ReposCard;
