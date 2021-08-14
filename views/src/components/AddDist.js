import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";

class AddDist extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        showModal: false,
                        city: "",
                        address: "",
                        details: ""
                };
        }

        onSubmit = () => {
                console.log("fetching");
                fetch("/distributions/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                details: this.state.details,
                                address: this.state.address,
                                city: this.state.city,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        console.log(data.message);
                                        this.props.onClose();

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
                                        </fieldset>
                                        <div className="form-action">
                                                <Button
                                                        className="btn btn-lg btn-primary btn-left" onClick={this.onSubmit}>Add <span className="icon-arrow-right2 outlined"></span></Button>
                                        </div>
                                </form>

                        </div>
                );
        };

        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true}>
                                                <h2>Add New Distribution</h2>
                                        </Modal.Header>
                                        <Modal.Body>
                                                {this.renderDetails()}
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <Button onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default AddDist;
