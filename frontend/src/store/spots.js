import {csrfFetch} from './csrf';
const initialState = {spots: {}, spot: {}};

const GETALL = 'spots/GETALL';
const GET = 'spots/GET';
const EDIT = 'spots/EDIT';
const USERSPOTS = 'spots/USERSPOTS';
const DELETE = 'spots/DELETE';

const getSpots = data => {
  return {
    type: GETALL,
    spots: data,
  };
};

const getSpot = data => {
  return {
    type: GET,
    spot: data,
  };
};
const editSpot = data => {
  return {
    type: EDIT,
    spot: data,
  };
};

const userSpots = userData => {
  return {
    type: USERSPOTS,
    spots: userData,
  };
};

const deleteSpot = data => {
  return {
    type: DELETE,
    spot: data,
  };
};

// Thunk

export const getAllSpotsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/spots');

  if (response.ok) {
    const {Spots} = await response.json();
    const objArr = {};
    Spots.forEach(spot => (objArr[spot.id] = spot));
    dispatch(getSpots(objArr));
  }
};

export const getSpotByIdThunk = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spotData = await response.json();
    dispatch(getSpot(spotData));
    return spotData;
  }
};

export const addNewSpotThunk = spot => async dispatch => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }
};

export const editSpotThunk = spot => async dispatch => {
  const {id} = spot;

  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const editData = await response.json();
    // dispatch(editSpot(editData));
    return editData;
  }
};
export const deleteSpotByIdThunk = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data));
  }
};
export const userSpotsByIdThunk = () => async dispatch => {
  const response = await csrfFetch('/api/spots/current');

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};
export const userDetailThunk = () => async dispatch => {
  const response = await csrfFetch('/api/spots/currentUser/current');

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const addSpotImagesThunk = (images, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(images),
  });
  if (response.ok) {
    const data = await response.json();
  }
};

//? Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case GETALL:
      newState.spots = {...action.spots};
      return newState;
    case GET:
      newState.spot = {...action.spot};
      return newState;
    case USERSPOTS:
      newState.spots = {...action.spots};
      return newState;
    case EDIT:
      newState.spots = {...newState.spots, [action.spot.id]: action.spot};
      return newState;
    case DELETE:
      delete newState[action.spot.id];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
