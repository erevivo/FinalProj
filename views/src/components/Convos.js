import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import ConvoItem from "./ConvoItem";
class ConvoList extends Component {
        state = {
                convos: []
        }
        //TODO: make better
        componentDidMount() {
                fetch("/messages", {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                if (data.success) {
                                        this.setState({ convos: data.convos })
                                }

                        })
                        .catch(() => { console.log("error") });
        }

        render() {
                return (<div>
                        <ListGroup>
                                {this.state.convos.map(c => <ListGroup.Item><ConvoItem item={c} /></ListGroup.Item>)}
                        </ListGroup>
                </div>

                )


        }
}

export default ConvoList;