import React from 'react';
import './poll-thumb.css';


const PollThumb = (props)=>{
  const id = props.author + props.title;
  return (
    <div className="thumb-container panel panel-default col-sm-6 col-md-4" >
      <div className="panel-heading">
        <h2 className="panel-title">{props.title}</h2>
        <span>by {props.author}</span>
      </div>
      <div className="graph panel-body" id={id} ><h2>graph</h2></div>
    </div>
  )
}

export default PollThumb;
