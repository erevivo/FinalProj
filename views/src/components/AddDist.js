import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";
import { modals, defaultButtonStyle } from "./Styles"

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
                                                        <label htmlFor="name" className="col-sm-5">פרטי החלוקה:</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <textarea
                                                                        type="text"
                                                                        name="details"
                                                                        id="details"
                                                                        className="form-control"
                                                                        placeholder="הכנס פרטי חלוקה"
                                                                        onChange={this.onChange}
                                                                        value={this.state.details}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">רחוב:</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="address"
                                                                        id="address"
                                                                        className="form-control"
                                                                        placeholder="הכנס רחוב"
                                                                        onChange={this.onChange}
                                                                        value={this.state.address}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">עיר:</label>
                                                        <div className="col-sm-7">
                                                                <span className="form-control-feedback" aria-hidden="true"></span>
                                                                <input
                                                                        type="text"
                                                                        name="city"
                                                                        id="city"
                                                                        className="form-control"
                                                                        placeholder="הכנס עיר"
                                                                        onChange={this.onChange}
                                                                        value={this.state.city}
                                                                        required
                                                                />
                                                        </div>
                                                </div>
                                                <div className="form-group has-feedback required">
                                                        <label htmlFor="name" className="col-sm-5">תאריך:</label>
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
                                                        <label htmlFor="name" className="col-sm-5">מחזורי</label>
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
                                                <Button style={{ margin: "-40px 20px", position: "absolute", left: "0" }}
                                                        className="btn btn-primary" onClick={this.onSubmit}>הוסף <span className="icon-arrow-right2 outlined"></span></Button>
                                        </div>
                                </form>

                        </div>
                );
        };

        renderRepetitive = () => {
                return <div>
                        <div className="form-group has-feedback required">
                                <label htmlFor="name" className="col-sm-5">כל</label>
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
                                <label htmlFor="name" className="col-sm-5">ימים</label>
                        </div>


                        <div className="form-group has-feedback required">
                                <label htmlFor="name" className="col-sm-5">עד:</label>
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


                                        <Modal.Header closeButton={true} style={{ position: "absolute", left: "0" }} />
                                        <h3 style={{ direction: "rtl", margin: "10px 20px 0 0 " }}> הוסף חלוקה חדשה </h3>
                                        <Modal.Body style={modals}>
                                                {this.renderDetails()}
                                        </Modal.Body>

                                </Modal>
                        </div>
                );
        }
}

export default AddDist;
