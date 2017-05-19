import update from 'immutability-helper';
import {SET_ALL_POLLS,EDIT_VOTE,MERGE_POLLS,GET_POLL} from "../actions";




export default function (state={}, action) {
    switch (action.type) {
        case SET_ALL_POLLS:
          return action.payload;
        case EDIT_VOTE:
          return update(state, {[action.payload.id]:{options:{$set: action.payload.options}}})
        case MERGE_POLLS:
          return Object.assign({}, state, action.payload);
        case GET_POLL:
        console.log("pollreducer>GET_POLL>",action.payload)
          return {...state, [action.payload.id]:action.payload}

        default:
          return state;
    }
}
