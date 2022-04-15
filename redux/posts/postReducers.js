import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  CREATE_POSTS_REQUEST,
  CREATE_POSTS_SUCCESS,
  CREATE_POSTS_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  // START_LOADING,
  // REQUEST_LOADING,
  // REQUEST_FINISHED,
} from "./postTypes"



const posts_Initial_state = {
  posts: [],
  loading: false,
  error: null,
  // requestState: true
}

// const post_Initial_state = {
//   post: null,
//   loading: false,
//   error: null
// }


export const postGetReducer = (state = posts_Initial_state, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { 
        ...state,
        loading: true 
      }
    case GET_POSTS_SUCCESS:
      return { 
        ...state,
        loading: false, 
        posts: action.payload 
      }
    case GET_POSTS_FAIL:
      return { 
        ...state,
        loading: false,
        error: action.payload 
      }

    case CREATE_POSTS_REQUEST:
      return {
        ...state,
        loading: true 
      }
    case CREATE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false, 
        posts: [...state.posts, action.payload]   
      }
    case CREATE_POSTS_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      }

    case POST_UPDATE_REQUEST:
      return {
        ...state,
        loading: true 
      }
    case POST_UPDATE_SUCCESS:
      const remainingPosts = state.posts.filter(post => post._id !== action.payload._id) 
      return {
        ...state,
        loading: false, 
        posts: [...remainingPosts, action.payload]  
      }
    case POST_UPDATE_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      }

    case POST_DELETE_REQUEST:
      return { 
        ...state,
        loading: true, 
      }
    case POST_DELETE_SUCCESS:
      return { 
        ...state,
        loading: false, 
        posts: state.posts.filter(post => post._id !== action.payload._id) 
      }
    case POST_DELETE_FAIL:
      return { 
        ...state,
        loading: false, 
        error: action.payload 
      }
    
    // case REQUEST_LOADING:
    //   return {
    //     ...state,
    //     requestState: false, 
    //   }
    // case REQUEST_FINISHED:
    //   return {
    //     ...state,
    //     requestState: true, 
    //   }
    
    default:
      return state
  }
}


// export const postCreateReducer = (state = post_Initial_state, action) => {
//   switch (action.type) {
//     case CREATE_POSTS_REQUEST:
//       return { loading: true }
//     case CREATE_POSTS_SUCCESS:
//       return { loading: false, post: action.payload }
//     case CREATE_POSTS_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


// export const postUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_UPDATE_REQUEST:
//       return { loading: true }
//     case POST_UPDATE_SUCCESS:
//       return { loading: false, post: action.payload }
//     case POST_UPDATE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }


// export const deleteAPostReducer = (state = {}, action) => {
//   switch (action.type) {
//     case POST_DELETE_REQUEST:
//       return { loading: true }
//     case POST_DELETE_SUCCESS:
//       return { loading: false, post: action.payload }
//     case POST_DELETE_FAIL:
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }