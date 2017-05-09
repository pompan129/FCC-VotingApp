import update from 'immutability-helper';
import {SET_ALL_POLLS,EDIT_VOTE} from "../actions";

const poll = (state, action)=>{
  switch (action.type) {
      case EDIT_VOTE:
        if (state.id !== action.payload.id) {
          return state
        }
        return {...state,
            options: state.options.map(o=>o.name===action.payload.option?{name:o.name,votes:o.votes + 1}:o)}
      default:
        return state;
  }
}





export default function (state={}, action) {
    switch (action.type) {
        case SET_ALL_POLLS:
          return action.payload;
        case 'EDIT_VOTE':
        return update(state, {[action.payload.id]:{options:{$set: action.payload.options}}})

        default:
          return state;
    }
}
