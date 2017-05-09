import Axios from "axios";

import Polls from '../utility/data'
//Actions
export const SET_AUTH = "SET_AUTH";
export const GET_ALL_POLLS = "GET_ALL_POLLS";
export const GET_POLL = "GET_POLL";
export const SET_ALL_POLLS = "SET_ALL_POLLS";
export const EDIT_VOTE = "EDIT_VOTE";


export const setAuth = (auth)=>{
    return {
      type:SET_AUTH,
      payload: auth
    }
}

const setAllPolls = (polls)=>{
  return {
    type:SET_ALL_POLLS,
    payload:polls
  }
}

//a thunk
export const getAllPolls_Async = ()=>{
  return (dispatch, getState) => {
    Axios.get('/api/polls/getall')
    .then(function (resp) {
      console.log("response>",resp);//todo
      let polls ={};
      resp.data.map((p)=>{polls[p.id] = p})
      console.log("getAllPolls_Async>polls",polls);//todo
      dispatch(setAllPolls(polls));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

//a thunk
export const getPoll = (id)=>{
  return (dispatch, getState) => {
    Axios.get('/api/polls/getvote',{id:id})
      .then(function (resp) {
        console.log("response>",resp);//todo
        dispatch({
          type: GET_POLL,
          payload: resp.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const editVotesLocal = (id, options)=>{
  return {
    type: EDIT_VOTE,
    payload: {options,id}
  }
}

//a thunk
export const editVotes = (poll,optionName)=>{
  return (dispatch, getState) => {
    let {options,id} = poll;
    options = options.map((o)=>{
      return o.name === optionName?{name:o.name,votes:o.votes + 1}:o;
    })

    Axios.post('/api/polls/update/vote',{
        id: id ,
        options: options
      })
      .then(function (resp) {
        console.log("response>",resp);
        dispatch(editVotesLocal(id,options));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
