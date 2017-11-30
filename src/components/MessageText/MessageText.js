import React, {Component} from 'react';
import { Message, Image, Divider, Grid } from 'semantic-ui-react'

const ImageExampleAvatarLeft = () => (
  <div id="leftDiv" style= {{ display: 'block', width: '100%', float: 'left'}}>
    <Image verticalAlign='bottom' src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' avatar style={{ width: '60px', height : '60px', marginRight : '15px' }}/>
    <Message style={{ display: 'inline-block', width: '400px '}}>
        <p>We updated our privacy policy here to better service our customers. We recommend reviewing the changes.We updated our privacy policy here to better service our customers. We recommend reviewing the changes.We updated our privacy policy here to better service our customers. We recommend reviewing the changes.</p>
    </Message>
  </div>
)

const ImageExampleAvatarRight = () => (
  <div id="rightDiv" style= {{ display: 'block', width: '100%', float: 'right'}}>
    <Image verticalAlign='middle' src='https://react.semantic-ui.com/assets/images/wireframe/square-image.png' avatar style={{ width: '60px', height : '60px', marginLeft: '15px', float: 'right' }}/>
    <Message style={{ display: 'inline-block', width: '400px', float : 'right'}}>
        <p>We updated our privacy policy here to better service our customers. We recommend reviewing the changes.We updated our privacy policy here to better service our customers. We recommend reviewing the changes.We updated our privacy policy here to better service our customers. We recommend reviewing the changes.</p>
    </Message>
  </div>
)

class MessageText extends Component {

    
    constructor(props){
        super(props);
        console.log('this.props.= fro MsgText: ', this.props);
        this.state = {
            messageTime: new Date(this.props.message.sentAt).toLocaleTimeString(),
            currentUser: this.props.user.email,
            photoURLofOtherUser   : this.props.user.photoURL
        };
    }

  render(){
    console.log('currentUser: ', this.state.currentUser);
    console.log('MessageUser: ', this.props.message.sentBy);
    var photoURLofCurrentUser = localStorage.getItem('photoURL');
    console.log('photoURLofCurrentUser: ', photoURLofCurrentUser);
    var message = 
      this.props.message.sentBy != this.state.currentUser ?
      <Grid>
        <Grid.Row textAlign='center'>     
          <Divider horizontal> { this.state.messageTime } </Divider> 
        </Grid.Row>      
        <Grid.Row floated='right' verticalAlign='bottom' textAlign='left'>
          <Grid.Column floated='right' textAlign='left' width={5}>
                <Message>
                    <p> {this.props.message.message} </p>
                </Message>   
          </Grid.Column>
          <Grid.Column width={2} textAlign='left'>
            <Image avatar size='tiny' style={{ minWidth : '50px', width : '50px' }} src='https://d30y9cdsu7xlg0.cloudfront.net/png/17239-200.png'/> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
      : 
      <Grid padded>  
        <Grid.Row textAlign='center'>     
          <Divider horizontal>{this.state.messageTime} </Divider> 
        </Grid.Row>       
        <Grid.Row floated='left' verticalAlign='bottom'>
          <Grid.Column width={2} textAlign='right'>
            <Image avatar size='tiny' style={{ minWidth : '50px', width : '50px' }} src='https://d30y9cdsu7xlg0.cloudfront.net/png/17239-200.png'/> 
          </Grid.Column>
          <Grid.Column floated='left' textAlign='left' width={5}>
                <Message>
                    <p> {this.props.message.message} </p>
                </Message>   
          </Grid.Column>
        </Grid.Row>
      </Grid>
      
    //   <div style={{ display: 'inline-block' }}>
    //     <Divider hidden horizontal style={{     display: 'block',
    // textAlign: 'right' }}>{this.state.messageTime} </Divider>
    //     <div id="leftDiv" style= {{ display: 'block', width: '100%', float: 'left', marginBottom: '25px'}}>
    //       <Image verticalAlign='bottom' src={this.state.photoURLofOtherUser} avatar style={{ width: '60px', height : '60px', marginRight : '15px' }}/>
    //       <Message style={{ display: 'inline-block', width: '400px ', backgroundColor : '#989ad7', borderColor: '#989ad7'}}>
    //           <p>{this.props.message.message}</p>
    //       </Message>
    //     </div>
    //   </div>
    //  <div>
    //     Message : {this.props.message.message}  <br/>
    //     SentAt  : {this.state.messageTime}   <br/>
    //     SentBy  : {this.props.message.sentBy}   <br/><br/><br/>
    //   </div>

    return (
      <div>
      {message}
      </div>
    )
  }
}
export default MessageText;