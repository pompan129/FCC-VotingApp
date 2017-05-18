import {SET_AUTHENTICATION} from "../actions";

export default function (state={authenticated:false,current:"Eric"}, action) {
    switch (action.type) {
        case SET_AUTHENTICATION:
          return {...state,authenticated:action.payload};

        default:
          return state;

    }
}
