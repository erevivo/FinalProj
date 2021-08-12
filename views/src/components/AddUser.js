import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";

class AddUser extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        showModal: false,
                        name: "",
                        password: "",
                        phone: "",
                        type: ""
                };
        }

        onSubmit = () => {
                console.log("fetching");
                fetch("/users/newUser", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                name: this.state.name,
                                password: this.state.password,
                                phone: this.state.phone,
                                userType: this.state.type

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



        renderLogin = () => {
                return (
                        <div>
                                <form className="form-horizontal form-loanable">
                                        <fieldset>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Username</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        className="form-control"
                                                                        placeholder="Enter username"
                                                                        onChange={this.onChange}
                                                                        value={this.state.name}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">password</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="password"
                                                                        id="password"
                                                                        className="form-control"
                                                                        placeholder="Enter password"
                                                                        onChange={this.onChange}
                                                                        value={this.state.password}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Phone Number</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="email"
                                                                        id="phone"
                                                                        className="form-control"
                                                                        placeholder="Enter phone number"
                                                                        onChange={this.onChange}
                                                                        value={this.state.phone}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">Type</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <select required name="type" id="type" onChange={this.onChange} value={this.state.type}>
                                                                        <option value="M">Manager</option>
                                                                        <option value="D">Distributer</option>
                                                                </select>
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
                                                <h2>Add New User</h2>
                                        </Modal.Header>
                                        <Modal.Body>
                                                {this.renderLogin()}
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <Button onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default AddUser;
