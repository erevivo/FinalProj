import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { Button } from "react-bootstrap";

const styles = {
        fontFamily: 'sans-serif',
        textAlign: 'center',
};
class LoginModal extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        showModal: false,
                        form: "",
                };
        }

        close = () => {
                this.setState({ showModal: false });
        };

        open = () => {
                this.setState({ showModal: true });
        };

        render() {
                //const isLoggedIn = this.state.isLoggedIn;
                return (
                        <div style={styles}>
                                <Button
                                        type="button"
                                        className="btn btn-default"
                                        onClick={this.open}
                                >
                                        Login
                                </Button>
                                <LoginForm
                                        showModal={this.state.showModal}
                                        onClose={this.close}
                                        loginFunc={this.props.loginFunc}
                                />
                        </div>
                );
        }
}

export default LoginModal
