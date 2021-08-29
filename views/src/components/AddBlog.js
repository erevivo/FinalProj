import React, { Component } from "react";
import { getCookie } from "../common";

import {
        Button,
        Modal,
} from "react-bootstrap";
import {modals, defaultButtonStyle} from "./Styles"

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
                                        Blog:
                                        <textarea value={this.state.input} onChange={this.handleChange} />
                                </label>
                                <Button style={defaultButtonStyle} className="btn btn-lg btn-primary btn-left" onClick={this.add}>Add <span className="icon-arrow-right2 outlined"></span></Button>
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
                                        <Modal.Header style={modals} closeButton={true} >
                                                <h2>Add New Blog</h2>
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

export default AddBlog;