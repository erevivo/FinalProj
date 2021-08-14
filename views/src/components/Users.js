import React, { Component, useState } from "react";
import UserCard from "./UserCard";
import ListGroup from 'react-bootstrap/ListGroup'
import MyModal from "./MyModal";
import AddUser from "./AddUser";

class Users extends Component {
        state = {
                users: []
        }
        constructor(props) {
                super(props);
        }
        componentDidMount() {
                fetch("/users", {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                this.setState({ users: data.users })

                        })
                        .catch(() => { console.log("error") });
        }

        render() {
                return (<div>
                        <ListGroup>
                                {this.state.users.map(u => <ListGroup.Item><UserCard u={u} isManager={this.props.isManager} /></ListGroup.Item>)}
                        </ListGroup>
                        <MyModal str="Add User"
                                content={(show, close) =>
                                (<AddUser
                                        showModal={show}
                                        onClose={close}
                                />)}
                        />
                </div>

                )
        }
}
export default Users;