import React, { Component, useState } from "react";
import UserCard from "./UserCard";
import ListGroup from 'react-bootstrap/ListGroup'
import AddUserModal from "./AddUserModal";

class Users extends Component{
        state = {
                users:[]
        }
        constructor(props){
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

        render(){
                return (<div>
                        <ListGroup>
                                {this.state.users.map(u=><ListGroup.Item><UserCard u={u} isManager={this.props.isManager}/></ListGroup.Item>)}
                               </ListGroup>
                               <AddUserModal/>
                               </div>
                               
                        )
        }
}
export default Users;