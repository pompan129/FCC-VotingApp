import React from 'react';
import './poll-thumb.css';
import BarGraph from '../container/graph-bar';

//todo convert to component
class PollThumb extends React.Component {

  render(){
    const {id,author,title} = this.props.poll;
    return (
      <div className="thumb-container panel panel-default col-sm-4 col-md-3" >
        <div className="panel-heading">
          <h2 className="panel-title">{title}</h2>
          <span>by {author}</span>
        </div>
        <BarGraph width={150} height={150} id={id} poll={this.props.poll}/>
      </div>
    )
  }

}

export default PollThumb;
