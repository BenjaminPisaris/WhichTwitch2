import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;
   
    return (
      
    isAuthenticated() && (
      <Button style={{
        position: 'fixed',
        right: 20,
        bottom: 20
      }} variant="fab" color="primary" aria-label="Add" >
        <AddIcon />
      </Button>)
    );
  }
}

export default Home;
