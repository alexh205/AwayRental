import { csrfFetch } from './csrf';
const initialState = {
  spots: {}, spot: {}, search: {}
};

const GETALL = 'spots/GETALL';
const GET = 'spots/GET';
const EDIT = 'spots/EDIT';
const DELETE = 'spots/DELETE';
const SEARCH = 'search/SEARCH'


export const setSearch = data => {
  return {
    type: SEARCH,
    search: data
  }
}

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

const deleteSpot = data => {
  return {
    type: DELETE,
    spot: data,
  };
};

// Thunk

export const getAllSpotsThunk =
  (filters = {}) =>
    async dispatch => {
      const params = new URLSearchParams(filters);
      const response = await csrfFetch(`/api/spots?${params}`);

      if (response.ok) {
        const { Spots } = await response.json();
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }
};

export const editSpotThunk = spot => async dispatch => {
  const { id } = spot;

  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const editData = await response.json();
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(images),
  });
  if (response.ok) {
    // const data = await response.json();
  }
};

//? Reducer
const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GETALL:
      newState.spots = { ...action.spots };
      return newState;
    case GET:
      newState.spot = { ...action.spot };
      return newState;
    case EDIT:
      newState.spots = { ...newState.spots, [action.spot.id]: action.spot };
      return newState;
    case DELETE:
      delete newState[action.spot.id];
      return newState;
    case SEARCH:
      newState.search = { ...action.search }
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
