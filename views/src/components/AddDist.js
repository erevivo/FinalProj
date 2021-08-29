import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";
import {modals, defaultButtonStyle} from "./Styles"

class AddDist extends Component {

        state = {
                showModal: false,
                city: "",
                address: "",
                details: "",
                date: "",
                repetitive: false,
                endDay: "",
                interval: 1
        };

        onSubmit = () => {
                console.log("fetching");
                let dateSplit = this.state.date.split("-");
                let newDate = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;

                dateSplit = this.state.endDay.split("-");
                let newEndDay = `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}`;
                fetch("/distributions/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                details: this.state.details,
                                address: this.state.address,
                                city: this.state.city,
                                date: newDate,
                                repetitive: this.state.repetitive,
                                endDay: newEndDay,
                                interval: this.state.interval
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        console.log(data.message);
                                        this.props.onClose();
                                        if (data.newDist) {
                                                this.props.addFn(data.newDist);
                                        }

                                } else {
                                        console.log("Error:", data.message);

                                }
                        })
                        .catch(() => { });
        };



        onChange = e => {
                let newState = {};
                newState[e.target.id] = e.target.value;
                this.setState(newState);
        }

        onCheckRepeat = () => this.setState({ repetitive: !this.state.repetitive });




        renderDetails = () => {
                return (
                        <div>
                                <form className="form-horizontal form-loanable">
                                        <fieldset>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Details</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <textarea
                                                                        type="text"
                                                                        name="details"
                                                                        id="details"
                                                                        className="form-control"
                                                                        placeholder="Enter details"
                                                                        onChange={this.onChange}
                                                                        value={this.state.details}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Address</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="address"
                                                                        id="address"
                                                                        className="form-control"
                                                                        placeholder="Enter Address"
                                                                        onChange={this.onChange}
                                                                        value={this.state.address}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">City</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="city"
                                                                        id="city"
                                                                        className="form-control"
                                                                        placeholder="Enter city"
                                                                        onChange={this.onChange}
                                                                        value={this.state.city}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Date</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="date"
                                                                        name="date"
                                                                        id="date"
                                                                        className="form-control"
                                                                        onChange={this.onChange}
                                                                        value={this.state.date}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Repeat</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="checkbox"
                                                                        name="repetitive"
                                                                        id="repetitive"
                                                                        onChange={this.onCheckRepeat}
                                                                        checked={this.state.repetitive}
                                                                />
                                                        </div>
                                                </div>
                                                {this.state.repetitive && this.renderRepetitive()}
                                        </fieldset>
                                        <div className="form-action">
                                                <Button style={defaultButtonStyle}
                                                        className="btn btn-lg btn-primary btn-left" onClick={this.onSubmit}>Add <span className="icon-arrow-right2 outlined"></span></Button>
                                        </div>
                                </form>

                        </div>
                );
        };

        renderRepetitive = () => {
                return <div>
                        <div className="form-group has-feedback required">
                                <label htmlFor="name" className="col-sm-5">Every</label>
                                <div className="col-sm-7">
                                        <span className="form-control-feedback" aria-hidden="true"></span>
                                        <input
                                                type="number"
                                                min="1"
                                                max="30"
                                                name="interval"
                                                id="interval"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={this.state.interval}
                                                required
                                        />
                                </div>
                                <label htmlFor="name" className="col-sm-5">Days</label>
                        </div>


                        <div className="form-group has-feedback required">
                                <label htmlFor="name" className="col-sm-5">Until</label>
                                <div className="col-sm-7">
                                        <span className="form-control-feedback" aria-hidden="true"></span>
                                        <input
                                                type="date"
                                                name="endDay"
                                                id="endDay"
                                                className="form-control"
                                                onChange={this.onChange}
                                                value={this.state.endDay}
                                                required
                                        />
                                </div>
                        </div>

                </div>

        }

        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header style={modals} closeButton={true}>
                                                <h2>Add New Distribution</h2>
                                        </Modal.Header>
                                        <Modal.Body style={modals}>
                                                {this.renderDetails()}
                                        </Modal.Body>
                                        <Modal.Footer style={modals}>
                                                <Button style={defaultButtonStyle} onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default AddDist;
