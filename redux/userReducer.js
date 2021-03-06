import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER,
} from "./userTypes"


const Initial_state = {
  dbUser: null,
  loading: false,
  error: null
}


// export const profileReducer = (state = { dbUser: null }, action) => {
export const profileReducer = (state = Initial_state, action) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { 
        ...state,
        loading: true,
        error: null
       }
    case LOAD_USER_SUCCESS:
      return { 
        ...state,  
        loading: false, 
        dbUser: action.payload 
      }
    case LOAD_USER_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      }
    case LOGOUT_USER: 
      return { state: Initial_state }
    default:
      return state
  }
}
