import React, { Component } from "react";
import { getCookie } from "../common";

import {
        Button,
        Modal,
} from "react-bootstrap";
import { modals, defaultButtonStyle } from "./Styles"

class AddBlog extends Component {
        state = {
                input: ""
        }
        constructor(props) {
                super(props);
                this.add = this.add.bind(this);
        }

        add(e) {
                e.preventDefault();
                fetch("/blogs/create", {
                        method: "POST",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                writer: getCookie("name"),
                                text: this.state.input,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        this.setState({ input: "" })
                                        this.props.onClose();
                                        this.props.addFn(data.blog);
                                }

                        })
                        .catch();
        }




        handleChange = e => {
                this.setState({ input: e.target.value });
        }


        renderDetails = () => {
                return (
                        <form>
                                <label>
                                        <textarea style={{ width: "220%" }} value={this.state.input} onChange={this.handleChange} />
                                </label>
                                <div className="form-action">
                                        <Button style={{ margin: "-40px 20px", position: "absolute", left: "0" }}
                                                className="btn btn-primary" onClick={this.add}>הוסף <span className="icon-arrow-right2 outlined"></span></Button>
                                </div>
                        </form>
                );
        }
        render() {
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                >
                                        <Modal.Header closeButton={true} style={{ position: "absolute", left: "0" }} />
                                        <h4 style={{ direction: "rtl", margin: "10px 20px 0 0 " }}> צור הודעה חדשה </h4>
                                        <Modal.Body style={modals}>
                                                {this.renderDetails()}
                                        </Modal.Body>
                                </Modal>
                        </div>
                );
        }
}

export default AddBlog;