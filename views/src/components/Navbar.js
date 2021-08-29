import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";
import LoginForm from "./LoginForm";
import MyModal from "./MyModal";

const navItemStyle = {
  border: "5px outset #000000",
  backgroundColor: "#ff6600",
  textAlign: "center",
  padding: "5px",
  borderRadius: "10px",
  fontSize: "30px"
}

const navAdd = {
  paddingTop: "10px"
}

const linkStyle = {
  color: "#000000",
  fontFamily: "Bradley Hand, cursive",
  textDecoration: "none"

}

const buttonStyle = {
  backgroundColor: "Transparent",
  borderColor: "Transparent",
  fontFamily: "Bradley Hand, cursive",
  color: "#000000",
  fontSize: "30px"
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

      <Nav defaultActiveKey="/home">
        <NavLink style={{ ...navItemStyle, ...navAdd, ...linkStyle }} className="col-sm-2" to={"/home"}>Home</NavLink>
        {this.state.loggedIn ? (
          <NavLink className="col-sm-2" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} onClick={this.logout}
            to={"/home"}> Logout
          </NavLink>
        ) :
          (
            <Nav.Item className="col-sm-2" style={navItemStyle}>
              <MyModal str="Login" buttonStyle={buttonStyle} content={(show, close) =>
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
          <NavLink className="col-sm-2" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/users"}>
            {this.state.isManager ? "Users" : "Managers"}
          </NavLink>
        )}

        {this.state.loggedIn && (
          <NavLink className="col-sm-2" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/blogs"}>
            
              Blog
          </NavLink>
        )}
        {this.state.loggedIn && (
          <NavLink className="col-sm-2" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/convos"}>
              Chat
          </NavLink>
        )}

        {this.state.loggedIn && (
          <NavLink className="col-sm-2" style={{ ...navItemStyle, ...navAdd, ...linkStyle }} to={"/distributions"}>
              Distributions
          </NavLink>
        )}

      </Nav>
    );
  }
}

export default Navbar;
