import React, {Component} from 'react';

import MessageList from '../../components/MessageList/MessageList';
import MessageBox from '../../components/MsgBox/MessageBox';
import Header from '../../components/Header/Header';

import { Grid, Icon } from 'semantic-ui-react'

class ChatScreen extends Component {

    constructor(props){
        super(props);
        this.db = this.props.db;
        this.state = {
            user : this.props.user
        }
        console.log('User for ChatBox : ', this.props.user);
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('User for ChatBox componentWillReceiveProps: ', this.props.user);
        console.log('User for componentWillReceiveProps nextprop : ', nextProps);
        
        this.setState({ user : nextProps.user });  
    }

  render(){
    //   console.log('rendering from ChatScreen: ', this.state);
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>            
                    <Icon name='chevron right' onClick = {() => { this.props.onSetDock(false)}} style={{ color : '#3b3e99', position : 'fixed', left : '10px', top : '10px'}} size='large'/>
                </Grid.Column>
                <Grid.Column style={{ width : '100%'}}>            
                    <Header/>
                </Grid.Column>                            
            </Grid.Row>
            
            <Grid.Row>
                <Grid.Column>                        
                    <div id="MsgList">
                        <MessageList user = {this.state.user} db={this.db} />
                    </div>
                </Grid.Column>                            
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>                        
                    <div id="textBox" style={{ marginBottom: '80px' }}>
                    <MessageBox user = {this.state.user} db={this.db} />
                    </div>
                </Grid.Column>                            
            </Grid.Row>
        </Grid>
    )
  }
}
export default ChatScreen;