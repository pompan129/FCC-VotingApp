import React from 'react';
import PollThumbUser from './poll-thumb-user';


const UserPolls = ({polls,author})=>{
  console.log("UserPolls>",polls)

  return(
    <div>
      {Object.keys(polls).filter(key=>polls[key].author === author)
          .map(key=><PollThumbUser poll={polls[key]} key={polls[key].id} /> )}
    </div>
  )
}

export default UserPolls;
