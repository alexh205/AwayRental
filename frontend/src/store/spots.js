import { csrfFetch } from './csrf';
const initialState = {};

const GET = 'spots/GET';
const GETBYID = 'spots/GETBYID';
const ADD = 'spots/ADD';
const EDIT = 'spots/EDIT';
const USERSPOTS = 'spots/USERSPOTS';
const DELETE = 'spots/DELETE';

const getSpots = data => {
    return {
        type: GET,
        spots: data,
    };
};
const getSpotId = data => {
    return {
        type: GETBYID,
        spot: data,
    };
};

const addSpot = data => {
    return {
        type: ADD,
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

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const { Spots } = await response.json();
        const objArr = {};
        Spots.forEach(spot => (objArr[spot.id] = spot));
        dispatch(getSpots(objArr));
    }
};

export const getSpotById = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotData = await response.json();

        dispatch(getSpotId(spotData));
    }
};

export const addNewSpot = spot => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addSpot(data));
    }
};

export const modifySpot = spot => async dispatch => {
    const { id } = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    });

    if (response.ok) {
        const editData = await response.json();
        dispatch(editSpot(editData));
    }
};
export const deleteSpotById = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'Delete',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(deleteSpot(data));
    }
};
export const userSpotsById = userId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${userId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(userSpots(data));
    }
};


const spotsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET:
            newState = { ...action.spots };
            return newState;
        case GETBYID:
            newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;
        case ADD:
            newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        case USERSPOTS:
            newState = { ...action.spots };
            return newState;
        case EDIT:
            newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        case DELETE:
            delete newState[action.spot.id];
            return newState;
        default:
            return state;
    }
};

export default spotsReducer;
