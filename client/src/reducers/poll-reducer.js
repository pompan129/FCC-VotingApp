import update from 'immutability-helper';
import {SET_ALL_POLLS,EDIT_VOTE,MERGE_POLLS} from "../actions";




export default function (state={}, action) {
    switch (action.type) {
        case SET_ALL_POLLS:
          return action.payload;
        case EDIT_VOTE:
          return update(state, {[action.payload.id]:{options:{$set: action.payload.options}}})
        case MERGE_POLLS:
          console.log("MERGE_POLLS",action.payload);//todo
          return Object.assign({}, state, action.payload);

        default:
          return state;
    }
}
