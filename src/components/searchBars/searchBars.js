import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import API from "../../utils/API";



class InputFoo extends React.Component {
    constructor() {
      super();
      this.handleChange = this.handleChange.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.state = {
        channel: null
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
          <form onSubmit={this.submitHandler}>
            <Input type="text" 
                   id="theInput" 
                   fullWidth={true}
                   placeholder="Enter username here"
                   value={this.state.channel} 
                   onChange={this.handleChange}
                    />
                   <br/>
                   <br/>
            <Button variant="outlined" color="primary">Load Stream</Button>
            <br/>
            <br/>
            
          </form>

        </div>
      );
    }
  }
  

export default InputFoo;
