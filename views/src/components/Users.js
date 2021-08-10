import React, { Component } from "react";

class Users extends Component{
        render(){
                return <h1>This pages shows {this.props.isManager?"users":"managers"}</h1>;
        }
}
export default Users;