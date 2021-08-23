import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
class ChatItem extends Component {
        render() {
                return (

                                <Card>
                                        <Card.Header>Sent by {this.props.sender} at {this.props.item.time}</Card.Header>
                                        <Card.Body>
                                                <blockquote className="blockquote mb-0">
                                                        <p>
                                                                {this.props.item.text}
                                                        </p>
                                                        <footer className="blockquote-footer">
                                                        {this.props.item.time}
                                                        </footer>
                                                </blockquote>
                                        </Card.Body>
                                </Card>
                );

        }
}

export default ChatItem;