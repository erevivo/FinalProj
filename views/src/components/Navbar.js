import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import LoginForm from "./LoginForm";
import MyModal from "./MyModal";
import { Modal } from "react-bootstrap";
import logo from "../images/logo01.gif";
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
    var today = new Date()
    var curHr = today.getHours()
    var message = ""
    if (curHr < 12) {
      message = "בוקר טוב 🌞"
    } else if (curHr < 18) {
      message = 'צהריים טובים 🌞'
    } else {
      message = 'ערב טוב 🌚'
    }

    console.log(this.state);
    return (
      <div style={modals}>
        <Nav defaultActiveKey="/home" className="navbar navbar-expand-lg navbar-light bg-light">

          {this.state.loggedIn ? (
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} onClick={this.logout}
              to={"/home"}> התנתק
            </NavLink>
          ) :
            (
              <Nav.Item className="col-sm-1" style={navItemStyle}>
                <MyModal str="התחבר" content={(show, close) =>
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
            <NavLink className="col-sm-1" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/blogs"}>הבלוג</NavLink>)}

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
          <span style={{ marginTop: "10px" }}>{message}</span>
          <NavLink to={"/home"}><img src={logo}
            style={{ position: "absolute", left: "0", marginTop: "-55px", height: "100px" }}></img></NavLink>
        </Nav>
      </div>
    );
  }
}

export default Navbar;
