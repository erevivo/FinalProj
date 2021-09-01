import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import LoginForm from "./LoginForm";
import MyModal from "./MyModal";
import { Modal } from "react-bootstrap";
import logo from "../images/logo01.png";
import { modals } from "./Styles";

const navItemStyle = {
  textAlign: "center",
  padding: "5px",
  fontSize: "20px",

}

const navAdd = {
  paddingTop: "10px",
}

const linkStyle = {
  color: "#000000",
  fontFamily: "Heebo', sans - serif",
  fontWeight: "400",
  textDecoration: "none"

}

const buttonStyle = {
  backgroundColor: "Transparent",
  borderColor: "Transparent",
  fontFamily: "Heebo', sans - serif",
  fontWeight: "400",
  color: "#000000",
  fontSize: "20px"
}


class Navbar extends Component {

  state = {
    loggedIn: false,
    isManager: false,
  };

  loginSuccess = (isAuth) => {
    this.setState({ loggedIn: true, isManager: isAuth });
    this.props.parentSet(isAuth);
  }
  logout = () => {
    this.setState({ loggedIn: false });
    this.props.parentSet(false);
  }



  render() {
    console.log(this.state);
    return (
      <div style={modals}>
        <Nav defaultActiveKey="/home">

          {this.state.loggedIn ? (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} onClick={this.logout}
              to={"/home"}> התנתק
            </NavLink>
          ) :
            (
              <Nav.Item className="col-sm-1" style={navItemStyle}>
                <MyModal str="התחבר" buttonStyle={buttonStyle} content={(show, close) =>
                (<LoginForm
                  showModal={show}
                  onClose={close}
                  loginFunc={this.loginSuccess}
                />)}
                />
              </Nav.Item>
            )
          }
          {this.state.loggedIn && (
            <NavLink style={{ ...navItemStyle, ...navAdd, ...linkStyle }} className="col-sm-1" to={"/home"}>ראשי</NavLink>)}

          {this.state.loggedIn && (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/users"}>
              {this.state.isManager ? "משתמשים" : "מנהלים"} </NavLink>)}

          {this.state.loggedIn && (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/blogs"}>בלוג</NavLink>)}

          {this.state.loggedIn && (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/convos"}>
              צ'אט
            </NavLink>
          )}

          {this.state.loggedIn && (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/distributions"}>
              חלוקות
            </NavLink>
          )}
          <NavLink to={"/home"}><img src={logo}
            style={{ margin: "auto", position: "fixed", left: "35px", top: "-5px", height: "100px" }}></img></NavLink>
        </Nav>
      </div>
    );
  }
}

export default Navbar;
