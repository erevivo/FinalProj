import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";
import { modals, defaultButtonStyle } from "./Styles"

class AddUser extends Component {
        state = {
                showModal: false,
                name: "",
                password: "",
                phone: "",
                type: "D"
        };

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
                                        this.setState({
                                                name: "",
                                                password: "",
                                                phone: "",
                                                type: "D"
                                        });
                                        this.props.addFn(data.user);
                                        this.props.onClose();

                                } else {
                                        console.log("Error:", data.message);

                                }
                        })
                        .catch(() => { });
        };



        onChange = e => {
                console.log(this.state)
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
                                                        <label htmlFor="login-email" className="col-sm-8" style={{ marginRight: "12%" }}>שם משתמש:</label>
                                                        <div className="col-sm-8" style={{ marginRight: "12%" }}>
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        className="form-control"
                                                                        placeholder="הכנס שם משתמש"
                                                                        onChange={this.onChange}
                                                                        value={this.state.name}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-8" style={{ marginRight: "12%" }}>סיסמא:</label>
                                                        <div className="col-sm-8" style={{ marginRight: "12%" }}>
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="password"
                                                                        name="password"
                                                                        id="password"
                                                                        className="form-control"
                                                                        placeholder="הכנס סיסמא"
                                                                        onChange={this.onChange}
                                                                        value={this.state.password}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-8" style={{ marginRight: "12%" }}>מספר טלפון:</label>
                                                        <div className="col-sm-8" style={{ marginRight: "12%" }}>
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="email"
                                                                        id="phone"
                                                                        className="form-control"
                                                                        placeholder="הכנס מספר טלפון"
                                                                        onChange={this.onChange}
                                                                        value={this.state.phone}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-8" style={{ marginRight: "12%" }}>סוג</label>
                                                        <div className="col-sm-8" style={{ marginRight: "12%" }}>
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <select required name="type" id="type" onChange={this.onChange} value={this.state.type}>
                                                                        <option value="M"> מנהל חלוקה</option>
                                                                        <option value="D" selected={true}>מחלק</option>
                                                                </select>
                                                        </div>
                                                </div>


                                        </fieldset>
                                        <div className="form-action">
                                                <Button style={{ margin: "-40px 20px", position: "absolute", left: "0" }}
                                                        className="btn btn-primary" onClick={this.onSubmit}>הוסף <span className="icon-arrow-right2 outlined"></span></Button>
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
                                        <Modal.Header closeButton={true} style={{ position: "absolute", left: "0" }} />
                                        <h3 style={{ direction: "rtl", margin: "10px 20px 0 0 " }}> הוסף משתמש חדש </h3>
                                        <Modal.Body style={modals}>
                                                {this.renderDetails()}
                                        </Modal.Body>

                                </Modal>
                        </div>
                );
        }

}


export default AddUser;
