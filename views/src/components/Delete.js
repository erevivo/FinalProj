import React, { Component } from "react";
import {
        Button,
        Modal,
} from "react-bootstrap";
import { modals, defaultButtonStyle } from "./Styles"


class Delete extends Component {
        state = {
                showModal: false,
        };
        constructor(props) {
                super(props);
                console.log("Delete component")
        }

        onSubmit = () => {
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
                                                <Button className="btn btn-lg btn-primary btn-left" onClick={this.onSubmit}>כן</Button>
                                                <Button className="btn btn-lg btn-primary btn-left" style={{ position: "absolute", left: "10px" }}
                                                        onClick={this.props.onClose}>לא</Button>
                                        </div>
                                </form>

                        </div >
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
                                        <Modal.Header style={modals} closeButton={true}>
                                                <h3 style={{ direction: "rtl", margin: "10px 20px 0 0 " }}>
                                                        האם אתה בטוח שברצונך למחוק את {this.props.username} </h3>
                                        </Modal.Header>
                                        <Modal.Body style={modals}>
                                                {this.renderDelete()}
                                        </Modal.Body>
                                        <Modal.Footer style={modals}>

                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default Delete;
