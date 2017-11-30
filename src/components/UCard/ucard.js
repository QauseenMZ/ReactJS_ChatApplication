import React, {Component} from 'react';
import { Divider, Image, Label } from 'semantic-ui-react'

import Home from '../../components/Home/home';

class UCard extends Component {

    constructor(props){
        super(props);
        console.log('this.props.user: ', this.props.user);
        this.db = this.props.db;
        this.state = {
            openChat : false
        }
        this.openChatBox = this.openChatBox.bind(this);
    }

    openChatBox(){
        console.log("clicked User is: ", this.props.user);
        let showChatHandler = this.props.showChat;
        console.log('showChatHandler sending: ', this.props.user);
        showChatHandler(this.props.user, true);

        let closeSideBar = this.props.onSetDock;
        closeSideBar(true);
    }
    
  render(){
    return (
                <div 
                onClick = {
                    this.openChatBox
                }
                >
                <Divider hidden />
                    <Label size='massive' image style={{ backgroundColor: 'transparent', marginLeft: '20px' }}>
                    <Label floating circular color='red' horizontal style = {{ top: '-0.5em', left: '65%' }}>2</ Label>
                    <Image size='massive' verticalAlign='middle' src={this.props.user.photoURL} shape='circular' style={{ borderRadius: '25px' }}/>
                    </Label>
                    <div style={{ display : 'inline-block', color : 'white' }}>
                        <b> { this.props.user.displayName } </b>
                        <br />
                        Last message to be displayed...
                    </div>
                    <Label verticalAlign='middle' horizontal style={{ borderRadius: '15px', width: 'auto !IMPORTANT', float: 'right', margin: '13px 20px 0px 0px', padding: '5px 10px 5px 10px',
                    color: 'white', backgroundColor: 'darkslateblue',
                    borderColor: 'darkslateblue !important' }}>52 m</Label>
                    
                    <Divider hidden />
                </div>
        //     }
        // </div>
    )
  }
}
export default UCard;