import {SET_AUTH} from "../actions";

export default function (state={auth:false}, action) {
    switch (action.type) {
        case SET_AUTH:
          return {...state,auth:action.payload};

        default:
          return state;

    }
}
