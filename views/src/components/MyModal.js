
import React, { Component } from "react";
import { Button } from "react-bootstrap";

const styles = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
};
class MyModal extends Component {
        state = {
                showModal: false,
                form: "",
        }

        close = () => {
                this.setState({ showModal: false });
        };

        open = () => {
                this.setState({ showModal: true });
        };

        render() {
                return (
                        <div style={styles}>
                                <Button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={this.open}
                                >
                                        {this.props.str}
                                </Button>
                                {this.props.content(this.state.showModal, this.close)}

                        </div>
                );
        }
}

export default MyModal
