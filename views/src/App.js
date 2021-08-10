import React, { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import "./App.css";
import Users from './components/Users';
class App extends Component {
  state = {
    currentPage: "home",
    isManager: false
  }
  render() {
    return (
      <div>
        
        <Router basename={"/"}>
        <div class="nav-wrapper">
          <Navbar />
        </div>
          <Switch>
          
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/users" component={Users}/>
            
          </Switch>
        </Router>         

      </div>
    );
  }
}

export default App;