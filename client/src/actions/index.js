import Polls from '../utility/data'
//Actions
export const SET_AUTH = "SET_AUTH";
export const GET_ALL_POLLS = "GET_ALL_POLLS";
export const EDIT_VOTE = "EDIT_VOTE";


export const setAuth = (auth)=>{
    return {
      type:SET_AUTH,
      payload: auth
    }
}

export const getAllPolls = ()=>{
  return {
    type: GET_ALL_POLLS,
    payload: Polls
  }
}

export const editVotes = (id, option)=>{
  return {
    type: EDIT_VOTE,
    payload: {option,id}
  }

}
