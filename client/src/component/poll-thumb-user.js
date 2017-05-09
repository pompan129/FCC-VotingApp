import React from 'react';
import BarGraph from '../container/graph-bar';
import {Link} from 'react-router-dom'


const PollThumbUser =({poll})=>{
    const {id,author,title,} = poll;
    return (
      <div className="thumb-container panel panel-default col-sm-4 col-md-3" >
        <div>
          <Link to={`/editpoll/${poll.id}`}   className="btn btn-default">Edit</Link>
          <button className="btn btn-default">Delete</button>
        </div>
        <BarGraph width={150} height={150} id={id} poll={poll}/>
        <div className="panel-heading">
          <h2 className="panel-title">{title}</h2>
          <span>by {author}</span>
        </div>
      </div>
    )
  }

export default PollThumbUser;
