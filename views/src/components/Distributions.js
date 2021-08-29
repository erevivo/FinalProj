import React, { Component } from "react";
import { ListGroup, Button } from 'react-bootstrap'
import AddDist from "./AddDist";
import DistItem from "./DistItem";
import MyModal from "./MyModal";
import Multiselect from 'multiselect-react-dropdown';
import { Map, Marker, Markers } from '@joeattardi/react-mapquest-static-map';
import { getStringFromDate } from "../common";
import {defaultButtonStyle} from "./Styles";
class Distributions extends Component {
        state = {
                dists: {},
                date: "",
                availableDistributers: [],
                selectedDistributers: [],
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
                                                        dists: data.grouped,
                                                        date: getStringFromDate(new Date()),
                                                        availableDistributers: data.distributers,
                                                });
                                }

                        })
                        .catch((e) => { console.log("error:", e) });
        }

        addDist = dist => {
                console.log(this.state.dists);
                let newList = this.state.dists;
                if (dist.city in newList)
                        newList[dist.city].push(dist);
                else
                        newList[dist.city] = [dist];
                this.setState({ dists: newList });
        }

        fetchChange = () => {
                fetch("/distributions/change", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                date: this.state.date,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ dists: data.grouped })
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });

        }

        assign = (e) => {
                fetch("/distributions/assign", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                distributers: this.state.selectedDistributers,
                                city: e.target.id
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        console.log(data);
                                        
                                        this.forceUpdate();
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });
        }

        changeDate = e => {
                let dateArr = e.target.value.split("-");
                this.setState({ date: `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}` },
                        this.fetchChange);
                console.log(this.state);

        }



        onSelect = (selectedList) => {
                this.setState({ selectedDistributers: selectedList });
        }

        doneDist = (ID, city) => {
                fetch("/distributions/done", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                id: ID,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.state.dists[city].forEach(d => {
                                                if (d.ID == ID) {
                                                        d.done = true;
                                                }
                                        });
                                        this.forceUpdate();

                                        console.log(data);
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });
        }

        render() {
                console.log("state", this.state);
                return this.props.isManager ? this.renderForManager() : this.renderForDistributor();
        }

        renderAllCitys = () => {
                let cityList = [];
                for (let city in this.state.dists) {
                        cityList.push(this.renderCity(city, this.state.dists[city], true));
                }
                return cityList;
        }

        renderCity = (c, l, m) => {
                console.log(c, l, m);
                return (<div>
                        {m && this.state.date == getStringFromDate(new Date()) && <div>
                                <span className="form-control-feedback" aria-hidden="true">{c}</span>
                                <Button style={defaultButtonStyle}
                                        className="btn btn-lg btn-primary btn-left" id={c} onClick={this.assign}>Assign <span className="icon-arrow-right2 outlined"></span>
                                </Button>
                        </div>
                        }

                        <ListGroup>
                                {l.map(d => <ListGroup.Item>
                                        <DistItem item={d} fromD={!m} doneDist={this.doneDist} />
                                </ListGroup.Item>)}
                        </ListGroup>
                        <Map apiKey={"bpJv6Pv9c0J9TourCzB24vlzBSta7kgY"}>
                                <Markers>{l.map(d => <Marker
                                        location={`${d.address}, ${d.city}`}
                                        icon={d.done ? "marker-start" : d.assigned ? "marker" : "marker-end"}
                                >

                                </Marker>)}</Markers>

                        </Map>
                </div>)
        }


        renderForManager() {
                return (
                        <div>
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
                                {this.renderAllCitys()}


                                <MyModal str="Add Distribution"
                                        content={(show, close) =>
                                        (<AddDist
                                                showModal={show}
                                                onClose={close}
                                                addFn={this.addDist}
                                        />)}
                                />
                        </div>
                );
        }
        renderForDistributor() {
                let keys = Object.keys(this.state.dists);
                if (keys.length)
                        return this.renderCity(keys[0], this.state.dists[keys[0]], false);
                return <div></div>;
        }
}

export default Distributions;