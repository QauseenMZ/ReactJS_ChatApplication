import React, {Component} from 'react';
import { Grid, Search, Label } from 'semantic-ui-react'

class Header extends Component {

  render(){
    return (
        <div style={{ marginBottom : '40px'}}>
            <Grid textAlign='center'>
            <Grid.Column width={8} padded>
              <Search id="searchDIV" style={{ input : { backgroundColor: 'lightgrey'} }}/>
              </Grid.Column>
              </Grid>
        </div>
    )
  }
}
export default Header;