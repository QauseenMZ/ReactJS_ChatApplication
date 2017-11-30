import React, { Component} from 'react';
import firebase from 'firebase';
import { Grid } from 'semantic-ui-react'

import MessageText from '../MessageText/MessageText';

class MessageList extends Component{

constructor(props){
    super(props);
    this.state = {
      messages: [],
      user    : this.props.user
    };
    this.db = this.props.db;
    let app = this.props.db.database().ref('messages');
    app.on('value', snapshot => {
        console.log("Snaps: ", snapshot.val());
        this.getData(snapshot.val());
    });
    console.log('MEssageList COnst states: ', this.state);
}

componentWillReceiveProps(nextProps) {
    console.log('User for MessageList: ', this.props.user);
    console.log('User for MessageList nextprop : ', nextProps);
    
    this.setState({ user : nextProps.user },
    () =>{
      console.log('after setting state in MsgList: ', this.state);
      let app = this.props.db.database().ref('messages');
      app.on('value', snapshot => {
          console.log("Snaps: ", snapshot.val());
          this.getData(snapshot.val());
      }); 
    }
    );  
    console.log('Updated staed for MessageList : ', this.state);
    
    
}
  
filterData(values){
  console.log('otherUserEmail: ', this.state.user);
  let otherUserEmail = this.state.user.email;
  let currentUserEmail = this.db.auth().currentUser.email;
  console.log('otherUserEmail: ', otherUserEmail);
  console.log('currentUser: ', currentUserEmail);
  let messages = [];

  if(values){
    Object.keys(values)
          .map(function(key) {
            if((values[key].sentBy == otherUserEmail && values[key].sentTo == currentUserEmail) 
            || 
            (values[key].sentTo == otherUserEmail && values[key].sentBy == currentUserEmail))
                  messages.push(values[key]);
            });
    return messages;
  }
}

getData(values){
    let messages = [];
    let messagesVal = this.filterData(values);
    console.log("filtered Messages: ", messagesVal);
    if(messagesVal) {
        Object.keys(messagesVal)
          .map(function(key) {
                 let cloned = messagesVal[key];
                 cloned.key = key;
                 console.log(key, messagesVal[key]);
                 messages.push( cloned);
            });
        console.log("Messages: ", messages);
        this.setState({
            messages: messages
        });   
    }  
  console.log('const: ', this.state.messages);
    
}

componentWillMount() {
  this.setState({
    messages : []
  })
  console.log('componentWillMount: ', this.state.messages);
  
}

  render() {
    console.log("MsgList render state: ", this.state);
    let messageNodes = this.state.messages.map((message) => {
        console.log("state.messages: ", message);
      return (
        <Grid centered verticalAlign='middle'>
          <Grid.Row centered verticalAlign='middle'>
            <Grid.Column centered verticalAlign='middle' style={{ minWidth: '350px'}}>
              <MessageText message = {message} db={this.db} user={this.state.user}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
          
        // <div className="card" key={message.key}>
        //   <div className="card-content">
        //     <MessageText message = {message} db={this.db} user={this.state.user}/>
        //   </div> 
        // </div>
      )
    });
    return (
      <div>
        { messageNodes }
      </div>
    );
  }
}

export default MessageList