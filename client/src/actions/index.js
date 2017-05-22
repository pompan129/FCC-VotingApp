import Axios from "axios";


//Actions
export const SET_AUTHENTICATION = "SET_AUTHENTICATION";
export const SET_USERNAME = "SET_USERNAME";
export const LOG_OUT = "LOG_OUT";
export const GET_ALL_POLLS = "GET_ALL_POLLS";
export const GET_POLL = "GET_POLL";
export const SET_ALL_POLLS = "SET_ALL_POLLS";
export const EDIT_VOTE = "EDIT_VOTE";
export const EDIT_POLL = "EDIT_CREATE_POLL";
export const MERGE_POLLS = "MERGE_POLLS";
export const BATCH_ACTIONS = "BATCH_ACTIONS";
export const SET_ERROR_MESSAGE = "SET_ERROR_MESSAGE"




export const setAuthentication = (auth)=>{
    return {
      type:SET_AUTHENTICATION,
      payload: auth
    }
}

export const setUsername = (name)=>{
    return {
      type:SET_USERNAME,
      payload: name
    }
}

export const setErrorMessage = (message)=>{
    console.log("setErrorMessage",message);//todo
  return {
    type: SET_ERROR_MESSAGE,
    payload: message
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
  return (dispatch, getState) => {
    Axios.get('/api/polls/getall',{ headers: { authorization: localStorage.getItem('jwt') }})
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
  console.log("getPoll", id);
  return (dispatch, getState) => {
    Axios.get('/api/polls/getvote',{params:{id:id}})
      .then(function (resp) {
        console.log("getPoll(2)", resp);
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

export const signupUser = ({username,password})=>{
  return (dispatch, getState) => {
    Axios.post('/api/user/signup',{username,password})
        .then(function (resp) {
          if(resp.data.success){
            localStorage.setItem('jwt', resp.data.token);
            localStorage.setItem('username', resp.data.username);
            dispatch(getAllPolls_Async());
            dispatch(setAuthentication(true));
          }
        })
        .catch(function (error) {
          console.log("Error>:",error.response.data.error);
        });
    }
}

export const signOut=()=>{
  localStorage.removeItem("jwt");
  localStorage.removeItem("username");
  const batch = [];
  batch.push(setAuthentication(false));
  batch.push(setUsername(""));
  return batchActions(batch);
}

export const signinUser = ({username,password})=>{
  return (dispatch, getState) => {
    const batch = [];
    Axios.post('/api/user/signin',{username,password})
        .then(function (resp) {
          if(resp.data.success){
            console.log("login-success>",resp.data)
            localStorage.setItem('jwt', resp.data.token);
            localStorage.setItem('username', resp.data.username);
            batch.push(getAllPolls_Async());
            batch.push(setAuthentication(true));
            batch.push(setUsername(resp.data.username));
            batch.push(setErrorMessage());//set error to Undefined
            dispatch(batchActions(batch));
          }else{

          }
        })
        .catch(function (error) {
          console.log("signinUser:",error.response.data);
          if(error.response.data === "Unauthorized"){
            console.log('error.response.data === "Unauthorized"');
              batch.push(signOut());
              batch.push(setErrorMessage("Invalid Usename/Password"));
              dispatch(batchActions(batch));
          }
        });
    }
}

//a thunk
export const deletePoll = (id)=>{
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


export function batchActions(actions) {
   return {
      type: BATCH_ACTIONS,
      payload: actions
   }
}
