import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
class ChatItem extends Component {
        state = {
                align: ""
        }

        componentDidMount(){
                this.setState({align: this.props.isMine?"right":"left"});

        }

        render() {
                return (

                        <Card>
                                <Card.Header align={this.state.align}>{this.props.sender}:</Card.Header>
                                <Card.Body>
                                        <blockquote className="blockquote mb-0">
                                                <p align={this.state.align}>
                                                        {this.props.item.text}
                                                </p>
                                                <footer className="blockquote-footer" align={this.state.align}>
                                                        {this.props.item.time}
                                                </footer>
                                        </blockquote>
                                </Card.Body>
                        </Card>
                );

        }
}

export default ChatItem;