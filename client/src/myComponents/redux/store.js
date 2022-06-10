import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const { editUser } = require('./reducer');

const middleware = [thunk]


const rootreducer = combineReducers({
    USER: editUser
});

const store = createStore(
    rootreducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;