import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import LoginModal from "./Loginmodal";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.loginSuccess = this.loginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }
  state = {
    loggedIn: false,
    isManager: false,
  };

  loginSuccess(isAuth) {
    this.setState({ loggedIn: true, isManager: isAuth });
    this.props.parentSet({ isManager: isAuth })
  }
  logout() {
    this.setState({ loggedIn: false });
    this.props.parentSet({isManager:false})
  }



  render() {
    return (

      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item className="col-sm-2">
          <Link eventKey="link-1" to={"/home"}>Home</Link>
        </Nav.Item>
        {!this.state.loggedIn && (
          <Nav.Item className="col-sm-2">
            <LoginModal loginFunc={this.loginSuccess} />
          </Nav.Item>
        )}
        {this.state.loggedIn && (
          <Nav.Item className="col-sm-2">
            <Link
              eventKey="link-2"
              onClick={this.logout}
            >
              Logout
            </Link>
          </Nav.Item>
        )}

        {this.state.loggedIn && (
          <Nav.Item className="col-sm-2">

            <Link to={"/users"}>{this.state.isManager ? "Users" : "Managers"}</Link>
          </Nav.Item>
        )}

        {this.state.loggedIn && (
          <Nav.Item className="col-sm-2">
            <Link to={"/blogs"}>
              Blog
            </Link>
          </Nav.Item>
        )}
        {
          <Nav.Item className="col-sm-2">
            <Link eventKey="link-6">
              Chat
            </Link>
          </Nav.Item>
        }

      </Nav>
    );
  }
}

export default Navbar;
