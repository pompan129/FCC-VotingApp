import {GET_ALL_POLLS,EDIT_VOTE} from "../actions";

const poll = (state, action)=>{
  switch (action.type) {
      case EDIT_VOTE:
        if (state.id !== action.payload.id) {
          return state
        }
        return {...state,
            data: state.data.map(o=>o.name===action.payload.option?{name:o.name,votes:o.votes + 1}:o)}
      default:
        return state;
  }
}





export default function (state=[], action) {
    switch (action.type) {
        case GET_ALL_POLLS:
          return {...state, polls:action.payload};
        case 'EDIT_VOTE':
          return {...state,polls:state.polls.map(p =>
              poll(p, action)
            )};
        default:
          return state;
    }
}
