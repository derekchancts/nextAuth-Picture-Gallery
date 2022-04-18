import axios from "axios"
import cookie from 'js-cookie';
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
  GET_PAGINATE_FAIL,
  GET_PAGINATE_SUCCESS,
  GET_PAGINATE_REQUEST,
} from "./postTypes"

import { parseCookies } from "nookies"


const cookies = parseCookies();


export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_POSTS_REQUEST })

    // const { data } = await axios.get(`/api/posts`)
    const { data } = await axios.get(`/api/posts`)
    console.log("data", data)

    // cookie.set('posts', JSON.stringify(data))

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};


export const createPosts = (memoryData) => async (dispatch) => {
  // console.log(cookies)

  try {
    dispatch({ type: CREATE_POSTS_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }


    const { data } = await axios.post(
      `/api/posts/create`,
      { memoryData },
      config
    )

    dispatch({
      type: CREATE_POSTS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CREATE_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};



export const updatePost = (id, memoryData) => async (dispatch) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/posts/${id}`,
      { memoryData },
      config
    )
    // console.log(data)

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data.updatedPost,
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};



export const postDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST })

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.delete(`/api/posts/${id}`, config)
    // const { data } = await axios.delete(`/api/posts/${id}` )
    // console.log(data)

    dispatch({
      type: POST_DELETE_SUCCESS,
      payload: data.deletedPost,
    })
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const postLike = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST })

    // console.log('action', cookies.token)
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    }

    const { data } = await axios.patch(
      `/api/posts/${id}`,
      { },
      config
    )
    // console.log(data)

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data.updatedPost,
    })
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};




// export const startLoading = () => async (dispatch) => {
//   dispatch({ type: START_LOADING })
// }

// export const requestLoading = () => async (dispatch) => {
//   dispatch({ type: REQUEST_LOADING, })
// }

// export const requestFinished = () => async (dispatch) => {
//   dispatch({ type: REQUEST_FINISHED, })
// }



export const paginatePosts = (number) => async (dispatch) => {
  try {
    dispatch({ type: GET_PAGINATE_REQUEST })

    const { data } = await axios.get(`/api/posts/paginate/${number}`)
    console.log(data)

    dispatch({
      type: GET_PAGINATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_PAGINATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}




export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb',
    },
  },
}