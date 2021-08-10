import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import Home from './Home'
import Nav from "react-bootstrap/Nav";
import Users from './Users'
import "./Navbar.css";
class Navbar extends Component {
  constructor() {
    super();
    this.loginSuccess = this.loginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }
  state = {
    loggedIn: false,
    isManager: false,
  };

  loginSuccess() {
    this.setState({ loggedIn: true });
  }
  logout() {
    this.setState({ loggedIn: false });
  }

  
  render() {
    return (
      
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item className="col-sm-2">
          <Nav.Link eventKey="link-1"><Link to={"/home"}>Home</Link></Nav.Link>
        </Nav.Item>
        {!this.state.loggedIn && (
          <Nav.Item className="col-sm-2">
            <Nav.Link
              eventKey="link-1"
              onClick={
                this
                  .loginSuccess
              }
            >
              Login
            </Nav.Link>
          </Nav.Item>
        )}
        {this.state.loggedIn && (
          <Nav.Item  className="col-sm-2">
            <Nav.Link
              eventKey="link-2"
              onClick={this.logout}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
        )}

        {this.state.loggedIn && (
          <Nav.Item  className="col-sm-2">
            {this.state.isManager && (
              <Nav.Link eventKey="link-3">
              <Link to={"/users"}>Users</Link>
              </Nav.Link>
            )}
            {!this.state.isManager && (
              <Nav.Link eventKey="link-4">
              <Link to={"/users"}>Managers</Link>
              </Nav.Link>
            )}
          </Nav.Item>
        )}

        {this.state.loggedIn && (
          <Nav.Item  className="col-sm-2">
            <Nav.Link eventKey="link-5">
              Blog
            </Nav.Link>
          </Nav.Item>
        )}
        {
          <Nav.Item  className="col-sm-2">
            <Nav.Link eventKey="link-6">
              Chat
            </Nav.Link>
          </Nav.Item>
        }
        
      </Nav>
    );
  }
}

export default Navbar;
