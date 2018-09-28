import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';



class InputFoo extends React.Component {
    constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.state = {
        channel: undefined
      };
    }
   
    
    submitHandler(evt) {
      evt.preventDefault();
      // pass the input field value to the event handler passed
      // as a prop by the parent (App)
      this.props.handlerFromParent(this.state.channel);
      this.setState({
        channel: ''
      });
    }
    
    handleChange(event) {
      this.setState({
        channel: event.target.value
      });
    }
  
    render() {
      
      return (
        <div >
          <form style={{textAlign: 'center'}} onSubmit={this.submitHandler}>
            <Input type="text" 
                   id="theInput" 
                   fullWidth={true}
                   placeholder="Enter username here"
                   value={this.state.channel} 
                   onChange={this.handleChange}
                    />
                   <br/>
                   <br/>
            <Button variant="outlined" style={{margin: 'auto'}} color="primary">Load Stream</Button>
                    <br/>
                    <br/>
                    <br/>
                    <p style={{color: '#d3d3d3'}}>/*  TODO: Connect with MongoDB to receive recently selected streamers, the ones below are hard coded /*</p>

                    
            <br/>
            <br/>
            
          </form>

        </div>
      );
    }
  }
  

export default InputFoo;
