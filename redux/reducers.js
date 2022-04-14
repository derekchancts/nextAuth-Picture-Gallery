import { combineReducers } from "redux"
import { profileReducer } from "./userReducer";
import {
  // postCreateReducer,
  postGetReducer,
  // deleteAPostReducer,
} from "./posts/postReducers";


const reducers = combineReducers({
  profile: profileReducer,
  postGet: postGetReducer,
  // postCreate: postCreateReducer,
  // deleteAPost: deleteAPostReducer,
})

export default reducers