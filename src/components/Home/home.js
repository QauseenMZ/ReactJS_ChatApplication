import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { Grid, Divider, Image, Label, Icon } from 'semantic-ui-react'

import Header from '../../components/Header/Header';
import UsersList from '../../components/UsersList/UsersList';
import ChatScreen from '../../components/ChatScreen/ChatScreen';
import Login from '../../components/UserLogin/login';


const mql = window.matchMedia(`(min-width: 800px)`);
const sidebarStyles = {
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  sidebar: {
    zIndex: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    transition: 'transform .3s ease-out',
    WebkitTransition: '-webkit-transform .3s ease-out',
    willChange: 'transform',
    overflowY: 'auto',
    width: '400px',    
    backgroundColor: '#3F429B'
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    transition: 'left .3s ease-out, right .3s ease-out',
  },
  overlay: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease-out, visibility .3s ease-out',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  dragHandle: {
    zIndex: 1,
    position: 'fixed',
    top: 0,
    bottom: 0,
  },
};

const mainContentCSS = {
    marginLeft : '50px'        
}

class Home extends Component {
    
    db;
    // user = null;

    constructor(props){
        super(props);
        this.db = this.props.db;
        // this.user = this.props.user;

        //Sidebar Configs
        this.state = {
            sidebarOpen     : false,
            sidebarDocked   : false,
            mql             : mql,
            showChat        : false,
            user            : null,
            loginStatus     : true
        }

        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.onSetDock = this.onSetDock.bind(this);
        //Sidebar Configs*
        this.showChat = this.showChat.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    //Sidebar Functions

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
    }

    onSetDock(fromUserCard) {
        if(fromUserCard){
            mql.addListener(this.mediaQueryChanged);
            this.setState({mql: mql, sidebarDocked: mql.matches});
        }
        else{
            this.setState({ sidebarDocked: !this.state.sidebarDocked });
        }
    }

    componentWillMount() {
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql, sidebarDocked: mql.matches});
        // console.log(" mql.matches: ",  mql.matches);
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    logout(){
        this.db.auth().signOut()
        .then(() => {
            this.setState({
                loginStatus : false
            });
        });
    }

    mediaQueryChanged() {
        // console.log(" mql.matches: ",  this.state.mql.matches);      
        this.setState({sidebarDocked: this.state.mql.matches});
    }

    //Sidebar Functions End

    showChat(userObj, bool){
        this.setState({
                showChat : false
            });
        console.log('userObj: ', userObj, " Bool: ", bool);
        console.log(' this.props.user: ',  this.props.user);
        this.user = userObj;
        console.log(' this.user: ',  this.user);
        this.setState({
                user : userObj,
                showChat : bool
            })
        console.log(' this.user: ',  this.user);
        console.log(' this.state from Home: ',  this.state);
        
    }
    
    render(){
        console.log('rendering home states: ', this.state)
        var sidebarContent = <div>
                                <div style={{ margin : '10px 20px 20px 20px'}}>
                                    <Icon name='chevron left' onClick = {() => this.onSetDock(false)} style={{ color : 'white'}} size='large'/>
                                    <Image src={require('./skl.PNG')} style={{ display: 'inline-block', marginLeft: '25%' }}/>
                                    <Icon name='content' onClick={this.logout}  style={{ color : 'white' , marginTop: '15px',
                                    float: 'right' }} size='large'/>                                    
                                </div>
                    <UsersList db={this.db} showChat={this.showChat.bind(this)} onSetDock = { this.onSetDock.bind(this) }/>        
        </div>;
        return (
            <div>
            { this.state.loginStatus ?
            <Sidebar styles = {sidebarStyles}
                    sidebar={sidebarContent}
                    open={this.state.sidebarOpen}
                    docked={this.state.sidebarDocked}
                    onSetOpen={this.onSetSidebarOpen}>
                { this.state.showChat ? 
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column id="chatScreenCol" width={15} style={{ overflow: 'hidden' }}>
                                    <ChatScreen user = {this.state.user} onSetDock = {this.onSetDock.bind(this)} db = {this.db}/> 
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                :
                    <div>
                         <Icon name='chevron right' onClick = {() => this.onSetDock(false)} style={{ color : '#3b3e99', position : 'fixed', left : '10px', top : '10px'}} size='large'/>              
                    </div>                
                }
            </Sidebar>
            :
             <div style={{ backgroundColor : '#3b3e99'}}>
                <Login/>
            </div>
            }
            </div>
        )
    }
    
}
export default Home;