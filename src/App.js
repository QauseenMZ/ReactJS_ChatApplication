import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from 'react-sidebar';

import firebase, { auth, provider } from './Firebase/firebase';

import Login from './components/UserLogin/login';
import Home from './components/Home/home';

import { Grid } from 'semantic-ui-react'

class App extends Component {

constructor(props){
  super(props);
  this.state = {
    user : null
  }
}

  render(){
    return (
      <div>   
              { this.state.user ? 
                <Home db={firebase}/>
                // <div style={{ backgroundColor : '#3b3e99'}}>
                // iufhsdlfsdkfsdfjs;dfkdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                // <Login />
                // </div>              
                : 
                <div style={{ backgroundColor : '#3b3e99'}}>
                <Login/>
                </div>  
              }                      
      </div>
    )
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({ loginStatus : true });
      } 
    });
  }
}


export default App;
