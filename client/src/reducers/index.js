import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user-reducer';
import pollReducer from './poll-reducer';


const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    polls: pollReducer
});

export default rootReducer;
