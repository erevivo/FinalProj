import React, { Component, useState } from "react";
import UserCard from "./UserCard";
import ListGroup from 'react-bootstrap/ListGroup'
import MyModal from "./MyModal";
import AddUser from "./AddUser";

class Users extends Component {
        state = {
                users: []
        }
        componentDidMount() {
                console.log("whats aup?")
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

        removeUser = (userName) => {
                let newList = this.state.users.filter(u => u.name !== userName);
                this.setState({ users: newList })
        }

        addUser = user => {
                console.log(user);
                let newList = this.state.users;
                newList.push(user);
                this.setState({ users: newList });
        }


        render() {
                return (<div>
                        <ListGroup>
                                {this.state.users.map(u => <ListGroup.Item><UserCard u={u} isManager={this.props.isManager} removeUser={this.removeUser} /></ListGroup.Item>)}
                        </ListGroup>
                        {this.props.isManager &&
                                <MyModal str="Add User"
                                        content={(show, close) =>
                                        (<AddUser
                                                showModal={show}
                                                onClose={close}
                                                addFn={this.addUser}
                                        />)}
                                />}
                </div>

                )
        }
}
export default Users;