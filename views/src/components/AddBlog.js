import React, { Component } from "react";
import getCookie from "../common";

import {
        Button,
        Modal,
} from "react-bootstrap";
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
                                }

                        })
                        .catch();
        }




        handleChange = e =>{
                this.setState({ input: e.target.value });
        }


        renderDetails = () => {
                return (
                        <form onSubmit={this.add}>
                                <label>
                                        Blog:
                                        <textarea value={this.state.input} onChange={this.handleChange} />
                                </label>
                                <input type="submit" value="Submit" />
                        </form>
                );
        }
        render(){
                return (
                        <div>
                                <Modal
                                        show={this.props.showModal}
                                        onHide={this.props.onClose}

                                        bsSize="large"
                                >
                                        <Modal.Header closeButton={true}>
                                                <h2>Add New Blog</h2>
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

export default AddBlog;