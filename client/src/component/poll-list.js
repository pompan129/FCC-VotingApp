import React from 'react';
import pollData from '../utility/data'
import PollThumb from './poll-thumb';


const PollList = (props)=>{
  const polls = pollData.map(data=><PollThumb
    key={data.author+data.title}
    {...data}/>)
  return (
    <div><ul>{polls}</ul></div>
  )
}

export default PollList;
