import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import { Button } from "react-bootstrap";
class DistItem extends Component {

        render() {
                return (

                        <Card>
                                <Card.Header>{this.props.item.address} {this.props.item.city}</Card.Header>
                                <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                                <p>
                                                        {this.props.item.details}
                                                </p>
                                                {this.props.item.assigned &&
                                                        <p>
                                                                {this.props.item.done?"Delivered:":"Delivering:"} {this.props.item.assignee}
                                                        </p>
                                                }
                                                <footer className="blockquote-footer">
                                                        {this.props.item.date}
                                                </footer>
                                        </blockquote>
                                        {this.props.fromD && !this.props.item.done &&
                                        <div>
                                                <Button
                                                        className="btn btn-lg btn-primary btn-left" onClick={() => this.props.doneDist(this.props.item.ID, this.props.item.city)}>Done <span className="icon-arrow-right2 outlined"></span>
                                                </Button>
                                        </div>
                                        }

                                </Card.Body>
                        </Card>
                );

        }
}

export default DistItem;