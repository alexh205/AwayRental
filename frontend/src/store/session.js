import {csrfFetch} from './csrf';
const initialState = {user: null};

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
// const GET_USER = 'session/getUser';

const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//*** Thunk  */

export const restoreUserThunk = () => async dispatch => {
  const response = await csrfFetch('/api/session');

  if (response.ok) {
    const data = await response.json();

    dispatch(setUser(data));
    return response;
  }
};

//! Signup
export const signupThunk =
  (name, username, email, password, profileImg) => async dispatch => {
    const response = await csrfFetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        profileImg,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    }
    return response;
  };

export const editUserThunk = user => async dispatch => {
  const {name, username, email, profileImg} = user;

  const response = await csrfFetch('/api/users', {
    method: 'PUT',
    body: JSON.stringify({
      name,
      username,
      email,
      profileImg,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  }
  return response;
};

// export const editUserPasswordThunk = user => async dispatch => {
//   const {id, password, currentPassword} = user;

//   const response = await csrfFetch('/api/users/password', {
//     method: 'PUT',
//     body: JSON.stringify({
//       password,
//       currentPassword,
//       id,
//     }),
//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(setUser(data));
//   }
//   return response;
// };

//! Login
export const loginThunk = (credential, password) => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    let data = await response.json();
    dispatch(setUser(data));
    return data;
  }
  let data = await response.json();

  return data;
};

//! Logout
export const logoutThunk = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeUser());
  }
  return response;
};

export const getUserThunk = id => async () => {
  const response = await csrfFetch(`/api/session/current/${id}`);

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);

      if (Object.keys(action.user).length) {
        newState.user = action.user;
      }
      return newState;

    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
