import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './user-reducer';
import pollReducer from './poll-reducer';


const rootReducer = combineReducers({
    form: formReducer,
    polls: pollReducer,
    user: userReducer
});

export default rootReducer;
