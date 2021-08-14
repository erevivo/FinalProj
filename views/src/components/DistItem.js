import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
class DistItem extends Component {
        constructor(props) {
                super(props);
        }

        render() {
                return (

                                <Card>
                                        <Card.Header>{this.props.item.address} {this.props.item.city}</Card.Header>
                                        <Card.Body>
                                                <blockquote className="blockquote mb-0">
                                                        <p>
                                                                {this.props.item.details}
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                        {this.props.item.date}
                                                        </footer>
                                                </blockquote>
                                        </Card.Body>
                                </Card>
                );

        }
}

export default DistItem;