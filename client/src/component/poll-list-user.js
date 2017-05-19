import React from 'react';
import PollThumbUser from './poll-thumb-user';



const UserPolls = ({polls,author,handleDeletePoll})=>{
  const userPolls = Object.keys(polls).filter(key=>polls[key].author === author)
      .map(key=><PollThumbUser poll={polls[key]} key={polls[key].id}
       /> )
  return(
    <div>
      {userPolls.length?userPolls:<h3>You have not created any polls.</h3>}

    </div>
  )
}

export default UserPolls;
