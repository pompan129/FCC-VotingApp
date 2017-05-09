import React from 'react';
//import IDGenerator from '../utility/id-generator' //todo
import './poll-editor.css';

class EditPoll extends React.Component {
  constructor(props){
    super(props);
    this.state = props.poll?
          props.poll:
          {id:props.author}
  }

  render(){
    return(
      <div>poll editor</div>
    )
  }
}

export default EditPoll;
