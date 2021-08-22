import React, { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import "./App.css";
import Users from './components/Users';
import Blog from './components/Blog'
import Distributions from './components/Distributions';

class App extends Component {
  constructor(props){
    super(props);
    this.setManager = this.setManager.bind(this);
  }
  state = {
    isManager: false
  }
  setManager(isManager){
    this.setState({isManager:isManager});
  }
  render() {
    return (
      <div>
        
        <Router basename={"/"}>
        <div class="nav-wrapper">
          <Navbar parentSet={this.setManager}/>
        </div>
          <Switch>
          
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/users" render={(props)=>(<Users {...props} isManager={this.state.isManager}/>)}/>
            <Route exact path="/blogs" render={(props)=>(<Blog {...props} isAuth={this.state.isManager}/>)}></Route>
            <Route exact path="/distributions" render={(props)=>(<Distributions {...props} isManager={this.state.isManager}/>)}></Route>
            
          </Switch>
        </Router>         

      </div>
    );
  }
}

export default App;