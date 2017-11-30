import React, {Component} from 'react';
import { Grid, Form, TextArea } from 'semantic-ui-react'

class MessageBox extends Component {
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onKeyup = this.onKeyup.bind(this);
    this.state = {
      message: ''
    };
  }
  onChange(e){
      this.setState({
        message: e.target.value
      });
  }
  onKeyup(e){
    if(e.keyCode === 13 && e.target.value.trim() !== ''){
      e.preventDefault();
      let sendingTo = this.props.user.email;
      console.log('sendingTo: ', sendingTo);
      let sendingBy = this.props.db.auth().currentUser.email;
      console.log('sendingBy: ', sendingBy);
      let dbCon = this.props.db.database().ref('/messages');
      dbCon.push({
        message : e.target.value.trim(),
        sentAt  : Date.now(),
        sentBy  : sendingBy,
        sentTo  : sendingTo
      });
      this.setState({
        message: ''
      });
      e.target.value = '';
    }
  }
  render() {
    return (
      <Grid padded style={{
        bottom: '0',
        position: 'fixed',
        minWidth: '80%',
        backgroundColor: 'white'
      }}>
        <Grid.Row>
         <Grid.Column >
            <Form>
              <TextArea placeholder='Tell something' rows={1} style={{ resize: 'none',
                padding: '20px 20px 20px 20px',
                borderRadius: '35px',
                maxWidth: '80%'
              }} className="textarea"
                  onChange={this.onChange}
                  onKeyUp={this.onKeyup}
              />
            </Form>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    )
  }
}

export default MessageBox