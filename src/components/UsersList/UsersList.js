import React, { Component } from 'react';


import UCard from '../../components/UCard/ucard';
import Login from '../../components/UserLogin/login';

class UsersList extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            allUsers: [],
        };
        this.db = this.props.db;
        let app = this.props.db.database().ref('users');
        app.on('value', snapshot => {
            console.log("Users Snaps: ", snapshot.val());
            this.getUsers(snapshot.val());
        });
    }

    getUsers(data){
        let allUsers = [];
        let dataObj = data;
        // const itemsRef = this.db.database().ref('users');
        if(dataObj) {
            Object.keys(dataObj)
            .map(function(key) {
                    let cloned = dataObj[key];
                    cloned.key = key;
                    console.log(key, dataObj[key]);
                    allUsers.push( cloned);
                });
            console.log("allUsers: ", allUsers);
            this.setState({
                allUsers: allUsers
            });   
        }  
    }

    render(){
        let userNodes = this.state.allUsers.map((userObj) => {
            console.log("state.user from Users List: ", userObj);
            let currentUserEmail = this.db.auth().currentUser.email;
            if(userObj.email != currentUserEmail){
                return (
                    <div className="card" key={userObj.key}>
                    <div className="card-content">
                        <UCard user = {userObj} db = {this.db} showChat={this.props.showChat} onSetDock = {this.props.onSetDock}/>
                    </div>
                    </div>
                )
            }
        });
        return (
            <div>
                    <div>
                        {userNodes}
                    </div>
            </div>
        );
    }


}
export default UsersList;