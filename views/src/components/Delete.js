import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";

class Delete extends Component {
        state = {
                showModal: false,
        };
        constructor(props){
                super(props);
                console.log("Delete component")
        }

        onSubmit = ()=> {
                console.log("fetching");
                fetch("/users/delete", {
                        method: "DELETE",
                        headers: {
                                "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                                name: this.props.username,
                        }),
                })
                        .then((res) => res.json())
                        .then((data) => {
                                //loading(false);
                                if (data.success) {
                                        console.log("Deleted user");
                                        this.props.removeUser(this.props.username)
                                        this.props.onClose();
                                } else {
                                        console.log("Error:", data.message);
                                }
                        })
                        .catch(() => { });
        };

        renderDelete = () => {
                return (
                        <div>
                                <form className="form-horizontal form-loanable">
                                        <div className="form-action">
                                                <Button className="btn btn-lg btn-primary btn-left" onClick={this.onSubmit}>Yes <span className="icon-arrow-right2 outlined"></span></Button>
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
                                                <h2>Are you sure you want to delete {this.props.username}</h2>
                                        </Modal.Header>
                                        <Modal.Body>
                                                {this.renderDelete()}
                                        </Modal.Body>
                                        <Modal.Footer>
                                                <Button onClick={this.props.onClose}>Close</Button>
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default Delete;
