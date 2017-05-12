import Axios from "axios";


//Actions
export const SET_AUTH = "SET_AUTH";
export const GET_ALL_POLLS = "GET_ALL_POLLS";
export const GET_POLL = "GET_POLL";
export const SET_ALL_POLLS = "SET_ALL_POLLS";
export const EDIT_VOTE = "EDIT_VOTE";
export const EDIT_POLL = "EDIT_CREATE_POLL";
export const MERGE_POLLS = "MERGE_POLLS";


export const setAuth = (auth)=>{
    return {
      type:SET_AUTH,
      payload: auth
    }
}

const setAllPolls = (polls)=>{
  let newPolls = {}
  polls.map((p)=>{newPolls[p.id] = p;return p;})

  return {
    type:SET_ALL_POLLS,
    payload:newPolls
  }
}

//a thunk
export const getAllPolls_Async = ()=>{
  console.log("getAllPolls_Async")
  return (dispatch, getState) => {
    Axios.get('/api/polls/getall')
    .then(function (resp) {
      dispatch(setAllPolls(resp.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export const getUserPolls=(username)=>{
    return (dispatch, getState) => {
        Axios.get('/api/polls/getUserPolls',{params:{username:username}})
          .then(function(resp){
            console.log("getUserPolls>resp.data:",resp.data);//todo
            var polls = resp.data.reduce(function ( obj, current ) {
                obj[ current.id ] = current;
                return obj;
            }, {});
            dispatch({
              type: MERGE_POLLS,
              payload:polls
            })
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
        dispatch(editVotesLocal(id,options));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

//a thunk
export const editPoll = (poll,callback)=>{
  return (dispatch, getState) => {
    Axios.post('/api/polls/update/poll',poll)
      .then(function (resp) {
        dispatch(setAllPolls(resp.data));//todo
        callback();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export const createPoll = (poll,callback)=>{
  return (dispatch, getState) => {
      Axios.post('/api/polls/save/poll',poll)
        .then(function (resp) {
          dispatch(getAllPolls_Async());
          callback();
        })
        .catch(function (error) {
          console.log("Error saving Poll:",error);
        });
    }
}

export const deletePoll = (id)=>{
  console.log("actions>deletePoll>id",id);
  return (dispatch, getState) => {
    Axios.post('/api/polls/remove/poll',{id})
      .then(function (resp) {
        dispatch(getAllPolls_Async());//todo
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
