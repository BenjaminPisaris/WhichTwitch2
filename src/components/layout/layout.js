import React from 'react';
import Card from '@material-ui/core/Card';
import Widget from '../widget';

class Cardwidget extends React.Component {
 
    
  


  render() {
    
    return (
      
        <Card style={{
          width: 480,
          
          textAlign: 'center'
        }}>
          <div className="handle">Drag from here</div>
          <Widget/>
        </Card>
    
    );
  }
}

export default Cardwidget;