import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user-reducer';
import pollReducer from './poll-reducer';
import messageReducer from './message-reducer';
import {BATCH_ACTIONS} from "../actions";

export function enableBatching(reduce) {
	return function batchingReducer(state, action) {
		switch (action.type) {
			case BATCH_ACTIONS:
				return action.payload.reduce(batchingReducer, state);
			default:
				return reduce(state, action);
		}
	}
}

const rootReducer = combineReducers({
    form: formReducer,
    polls: pollReducer,
    user: userReducer,
		message: messageReducer
});

export default rootReducer;
