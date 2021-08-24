import React, { Component } from "react";
import {ListGroup, Button} from 'react-bootstrap'
import AddDist from "./AddDist";
import DistItem from "./DistItem";
import MyModal from "./MyModal";
import Multiselect from 'multiselect-react-dropdown';

class Distributions extends Component {
        state = {
                dists: [],
                city: "",
                date: "",
                availableDistributers: [],
                selectedDistributers: []
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
                                        console.log(data);
                                        this.setState(
                                                {
                                                        dists: data.distributions,
                                                        city: data.city,
                                                        date: data.getCurrentDate,
                                                        availableDistributers: data.distributers
                                                });
                                }

                        })
                        .catch(() => { console.log("error") });
        }

        fetchChange = () => {
                fetch("/distributions/change", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                city: this.state.city,
                                date: this.state.date,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ dists: data.distributions })
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });

        }

        assign = ()=>
        {
                fetch("/distributions/assign", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                distributers: this.state.selectedDistributers,
                                city: this.state.city,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                       console.log(data);
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });
        }

        changeCity = e => {
                this.setState({ city: e.target.value },
                        this.fetchChange);
        }

        changeDate = e => {
                let dateArr = e.target.value.split("-");
                this.setState({ date: `${parseInt(dateArr[2])}/${parseInt(dateArr[1])}/${dateArr[0]}` },
                        this.fetchChange);
                console.log(this.state);

        }

        onSelect = (selectedList)=>{
                this.setState({selectedDistributers: selectedList});
        }

        render() {
                return this.props.isManager ? this.renderForManager() : this.renderForDistributor();
        }

        renderForManager() {
                return (
                        <div>
                                <div className="col-sm-3">
                                        <span className="form-control-feedback" aria-hidden="true">City</span>
                                        <input
                                                type="text"
                                                className="form-control"
                                                onChange={this.changeCity}
                                                value={this.state.city}
                                        />
                                </div>
                                <div className="col-sm-3">
                                        <span className="form-control-feedback" aria-hidden="true">Date</span>
                                        <input
                                                type="date"
                                                className="form-control"
                                                onChange={this.changeDate}
                                                required
                                        />
                                </div>
                                <Multiselect
                                        options={this.state.availableDistributers} // Options to display in the dropdown
                                        selectedValues={this.state.selectedDistributers} // Preselected value to persist in dropdown
                                        onSelect={this.onSelect} // Function will trigger on select event
                                        onRemove={this.onSelect} // Function will trigger on remove event
                                        displayValue="name" // Property name to display in the dropdown options
                                />
                                <Button
                                                        className="btn btn-lg btn-primary btn-left" onClick={this.assign}>Assign <span className="icon-arrow-right2 outlined"></span></Button>
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