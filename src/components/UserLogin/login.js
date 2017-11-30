import React, {Component} from 'react';
import { Icon, Segment, Grid, Form, Button, Divider, Image } from 'semantic-ui-react'

import firebase, { auth, provider } from '../../Firebase/firebase';

class Login extends Component {

    db = firebase.database().ref('users');

  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.showRegisteration = this.showRegisteration.bind(this);
    this.hideRegistration = this.hideRegistration.bind(this);
    this.state = {
      password : '',
      email : '',
      photoURL : '',
      showRegisteration : false,
      displayName : ''
    };

    this.db = firebase.database().ref('users');
  }

  // signInWithGmail(event){
  //   event.preventDefault(); 
  //   let self = this;
  //   auth.signInWithPopup(provider) 
  //   .then((successObj) => {
  //     console.log("result from signInWithPopup: ", successObj, "  result.user: ", successObj.user);
  //     // const user = result.user;    
  //     console.log('push: ', {
  //       displayName   : successObj.user.displayName,
  //       email         : successObj.user.email,
  //       login_status  : true,
  //       photoURL      : successObj.user.photoURL
  //     });
  //     // this.checkIfUserExists();
  //     let email= successObj.user.displayName
  //     var usersRef = firebase.database();
  //     // console.log('usersRef: ', usersRef.child())
  //     usersRef.child('users').once('value', function(snapshot) {
  //       console.log('on value: ', snapshot.val());
  //       var exists = (snapshot.val() !== null);
  //       if (exists) {
  //         alert('user ' + email + ' exists!');
  //       } else {
  //         alert('user ' + email + ' does not exist!');
  //       }
  //     });
  //     // firebase.database().ref('users').push({
  //     //   displayName   : successObj.user.displayName,
  //     //   email         : successObj.user.email,
  //     //   login_status  : true,
  //     //   photoURL      : successObj.user.photoURL
  //     // });
  //   });  
  //   console.log("auth: ", auth);
  // }
  
// checkIfUserExists(email){
//   var usersRef = firebase.database().ref('/users');
//   console.log('usersRef: ', usersRef.child())
//   usersRef.on('value', function(snapshot) {
//     console.log('allUsers: ', snapshot.val())
//     var exists = (snapshot.val() !== null);
//     if (exists) {
//       alert('user ' + email + ' exists!');
//     } else {
//       alert('user ' + email + ' does not exist!');
//     }
//   });
// }

  handleLoginSubmit(event) {
    event.preventDefault(); 
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((successObj) => { 
              console.log('SuccessObj: ', successObj);   
              // localStorage.setItem('photoURL', "https://png.icons8.com/female-profile/color/1600" );       
              localStorage.setItem('userID', successObj.uid);
              localStorage.setItem('userEmail', successObj.email);
              localStorage.setItem('photoURL', successObj.photoURL);                  
              alert("Success");
            }, (err)=>{
              alert('Invalid User ID or Password');
            })
  }

  createUser(event){
    event.preventDefault();  
    let self = this;   
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((successObj) => { 
      console.log("Creating User SuccessObj: ", successObj);
      let user = firebase.auth().currentUser;
      user.updateProfile({
        displayName : this.state.displayName,
        photoURL    : this.state.photoURL
      }).then(function() {
        console.log('After update: ', user);
        self.db.push({
          displayName   : user.displayName,
          email         : user.email,
          uid           : user.uid,
          login_status  : true,
          photoURL      : user.photoURL
        });
        localStorage.setItem('userID', user.uid);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('photoURL', user.photoURL);  
      }, function(error) {
        console.log("Err is updation: ", error);
      });
      alert("regisered");
    }, (err) => {
      alert('Error in Registration');
      console.log('Error in Registration: ', err);
    })
  }

showRegisteration(event){
  event.preventDefault();
  this.setState({
    showRegisteration : true
  })
}

hideRegistration(event){
  event.preventDefault();
    this.setState({
      showRegisteration : false
    })
}

handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("name: ", name, "   value: ", value);
    this.setState({
      [name]: value
    });
  }

  render(){
    return (
      <Grid centered verticalAlign='middle' columns={2} style={{ height : '676px', overflow : 'hidden'}}>
        <Grid.Row centered verticalAlign='middle'>
          <Grid.Column centered verticalAlign='middle' style={{ minWidth: '350px'}}>
          <Image src={require('./skyp.PNG')} size='medium' centered />
            <Segment style={{
                  borderRadius: '15px',
                  padding: '30px 50px 30px 50px',
                  border: '3px solid #f23f79',
                  backgroundColor: '#989ad7'
            }}>
            { !this.state.showRegisteration ?            
              <Form >
                <Form.Input  placeholder='Email' name="email" onChange={this.handleInputChange}/>
                <Form.Input  placeholder='Password' name="password" type='password' onChange={this.handleInputChange}/>
                <Button primary fluid onClick={this.handleLoginSubmit}>Login</Button>
                <Divider horizontal>Or</Divider>
                <Button secondary fluid onClick={this.showRegisteration}>Create Free Account</Button>
              </Form>
                :
              <Form >
                <Form.Input  placeholder='User Name' name="displayName" onChange={this.handleInputChange}/>              
                <Form.Input  placeholder='Email' name="email" onChange={this.handleInputChange}/>
                <Form.Input  placeholder='Password' name="password" type='password' onChange={this.handleInputChange}/>
                <Form.Input  placeholder='Image URL' name="photoURL" onChange={this.handleInputChange}/>                
                <Button secondary fluid onClick={this.createUser}>Create Free Account</Button>
                <Divider horizontal/>
                <Button secondary fluid onClick={this.hideRegistration}>Back</Button>                
              </Form>
            }
            </ Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      // <div>
      //   <form onSubmit={this.handleLoginSubmit}>
      //        <label>
      //               User ID:
      //                <input type="text" name="email"  onChange={this.handleInputChange}/>
      //       </label>
      //          <label>
      //           Password:
      //                <input type="password" name="password"  onChange={this.handleInputChange}/>
      //       </label>
      //       <input type="submit" value="Login"/>
      //   </form>
      // </div>
              // <Divider horizontal>Or</Divider>
      
      // <Button onClick={this.signInWithGmail} labelPosition='left' icon='google plus' fluid color='google plus'>
              //   Sign with Google
              // </Button>
              // <Button secondary fluid labelPosition='left' icon='google plus' content='Forward' />>
    )
  }
}
export default Login;