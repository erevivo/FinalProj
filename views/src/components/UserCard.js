import React, { Component } from "react";
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { getCookie } from "../common";
import ChatForm from "./ChatForm";
import Delete from "./Delete";
import MyModal from "./MyModal";


class UserCard extends Component {

        renderManager() {
                return (
                        <Card.Body>
                                <Card.Title>{this.props.u.name}</Card.Title>
                                <ListGroup variant="flush">
                                        <ListGroup.Item>מנהל חלוקה</ListGroup.Item>
                                        <ListGroup.Item>מספר טלפון: {this.props.u.phone}</ListGroup.Item>
                                </ListGroup>
                                {this.props.isManager ?
                                        <MyModal str="מחק"
                                                content={(show, close) =>
                                                (<Delete
                                                        showModal={show}
                                                        onClose={close}
                                                        username={this.props.u.name}
                                                        removeUser={this.props.removeUser}
                                                />)}
                                        /> :
                                        <MyModal str="צ'אט"
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
                                <ListGroup.Item>מחלק</ListGroup.Item>
                                <ListGroup.Item>מספר טלפון: {this.props.u.phone}</ListGroup.Item>
                                <ListGroup.Item>{this.props.u.isAssigned ? "לא זמין היום" : "זמין היום"}</ListGroup.Item>
                        </ListGroup>
                        <MyModal str="מחק"
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
                        <Card style={{ minWidth: '16rem', maxWidth: '16rem', direction: "rtl" }}>
                                {this.props.u.userType === "M" ?
                                        this.renderManager()
                                        :
                                        this.renderDistributer()}
                        </Card>
                )
        }
}

export default UserCard;