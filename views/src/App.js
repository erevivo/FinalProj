import React, { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import "./App.css";
import Users from './components/Users';
import Blog from './components/Blog'
class App extends Component {
  state = {
    isManager: false
  }
  render() {
    return (
      <div>
        
        <Router basename={"/"}>
        <div class="nav-wrapper">
          <Navbar parentSet={this.setState}/>
        </div>
          <Switch>
          
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/users" component={Users}/>
            <Route exact path="/blogs" render={(props)=>(<Blog {...props} isAuth={this.state.isManager}/>)}></Route>
            
          </Switch>
        </Router>         

      </div>
    );
  }
}

export default App;