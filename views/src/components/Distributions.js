import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import AddDist from "./AddDist";
import DistItem from "./DistItem";
import MyModal from "./MyModal";
class Distributions extends Component {
        state = {
                dists: [],
                city: "",
                date: "",
        }
        componentDidMount() {
                console.log("hello");
                fetch("/distributions", {
                        method: "GET",
                        headers: {
                                "Content-Type": "application/json",
                        },
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                console.log(data);
                                if (data.success) {
                                        this.setState(
                                                {
                                                        dists: data.distributions,
                                                        city: data.city,
                                                        date: data.getCurrentDate
                                                })
                                }

                        })
                        .catch(() => { console.log("error") });
        }

        render() {
                return this.props.isManager ? this.renderForManager() : this.renderForDistributor();
        }

        renderForManager() {
                return (
                        <div>
                                <ListGroup>
                                        {this.state.dists.map(d => <ListGroup.Item><DistItem item={d} /></ListGroup.Item>)}
                                </ListGroup>
                                <MyModal str="Add Distribution"
                                        content={(show, close) =>
                                        (<AddDist
                                                showModal={show}
                                                onClose={close}
                                        />)}
                                />
                        </div>
                );
        }
        renderForDistributor() {
                return (<div></div>);
        }
}

export default Distributions;