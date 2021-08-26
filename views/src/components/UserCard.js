import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { getCookie } from "../common";
import ChatForm from "./ChatForm";
import Delete from "./Delete";
import MyModal from "./MyModal";


class UserCard extends Component {

        renderManager() {
                return (<Card.Body>
                        <Card.Title>{this.props.u.name}</Card.Title>
                        <ListGroup variant="flush">
                                <ListGroup.Item>Manager</ListGroup.Item>
                                <ListGroup.Item>Phone Number: {this.props.u.phone}</ListGroup.Item>
                        </ListGroup>
                        {this.props.isManager ?
                                <MyModal str="Delete"
                                        content={(show, close) =>
                                        (<Delete
                                                showModal={show}
                                                onClose={close}
                                                username={this.props.u.name}
                                                removeUser={this.props.removeUser}
                                        />)}
                                /> :
                                <MyModal str="Chat"
                                        content={(show, close) =>
                                        (<ChatForm
                                                showModal={show}
                                                onClose={close}
                                                sender={getCookie("name")}
                                                receiver={this.props.u.name}
                                        />)}
                                />
                        }

                </Card.Body>)


        }

        renderDistributer() {
                return (<Card.Body>
                        <Card.Title>{this.props.u.name}</Card.Title>
                        <ListGroup variant="flush">
                                <ListGroup.Item>Distributer</ListGroup.Item>
                                <ListGroup.Item>Phone Number: {this.props.u.phone}</ListGroup.Item>
                                <ListGroup.Item>{this.props.u.isAssigned ? "Is unavailable today" : "Is available today"}</ListGroup.Item>
                        </ListGroup>
                        <MyModal str="Delete"
                                content={(show, close) =>
                                (<Delete
                                        showModal={show}
                                        onClose={close}
                                        username={this.props.u.name}
                                        removeUser={this.props.removeUser}
                                />)}
                        />
                </Card.Body>);


        }
        render() {
                return (
                        <Card style={{ width: '18rem' }}>
                                {this.props.u.userType == "M" ?
                                        this.renderManager()
                                        :
                                        this.renderDistributer()}
                        </Card>
                )
        }
}

export default UserCard;