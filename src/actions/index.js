import { postsRef } from '../Firebase';
import { FETCH_POST, FETCH_POSTS } from './types.js';

export const addPost = newPost => async dispatch => {
  postsRef.push().set(newPost);
};

export const delPost = postId => async dispatch => {
  postsRef.child(postId).remove();
};

export const fetchPosts = () => async dispatch => {
  postsRef.on("value", snapshot => {
    dispatch({
      type: FETCH_POSTS,
      payload: snapshot.val()
    })
  })
}

export const fetchPost = postId => async dispatch => {
  postsRef.child(postId).on("value", snapshot => {
    dispatch({
      type: FETCH_POST,
      payload: snapshot.val()
    })
  })
}