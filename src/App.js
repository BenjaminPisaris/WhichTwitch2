import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';
import  Grid from './components/grid';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">WhichTwitch</a>
            </Navbar.Brand>
            {!isAuthenticated() && (
                  <span><Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                  </span>
                )}
            {isAuthenticated() && (
                  <span><Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                  </span>
                )
            }
          </Navbar.Header>
        </Navbar>
        <Grid/>
      </div>
    );
  }
}

export default App;
