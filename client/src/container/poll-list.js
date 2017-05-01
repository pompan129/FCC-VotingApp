import React from 'react';
import pollData from '../utility/data'
import PollThumb from '../component/poll-thumb';

const PollList = (props)=>{

  const polls = pollData.map(data=>
    <PollThumb key={data.author+data.title} {...data}/>)

  return (
    <div className="container">
      <div className="row">{polls}</div>
    </div>
  )
}

export default PollList;
