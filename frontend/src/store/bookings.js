import {csrfFetch} from './csrf';

const GET = 'bookings/GET';
const ADD = 'bookings/ADD';
const EDIT = 'bookings/EDIT';
const DELETE = 'bookings/DELETE';
const USERBOOKINGS = 'bookings/USERBOOKINGS';

const getBooking = data => ({
  type: GET,
  bookings: data,
});
const addBooking = data => ({
  type: ADD,
  bookings: data,
});

const editBooking = data => ({
  type: EDIT,
  bookings: data,
});
const userBookings = data => ({
  type: USERBOOKINGS,
  bookings: data,
});

const deleteBooking = data => ({
  type: DELETE,
  bookings: data,
});

export const renderBookings = () => {
  return {
    type: 'RENDERBOOKINGS',
  };
};

export const getAllBookings = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

  if (response.ok) {
    const {Bookings} = await response.json();
    const obj = {};
    Bookings.forEach(booking => (obj[booking.id] = booking));
    dispatch(getBooking(obj));
  }
};

export const addNewBooking = data => async dispatch => {
  const {spotId} = data;
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(addBooking(newBooking));
    return newBooking.id;
  } else {
    return response;
  }
};

export const getUserBookings = () => async dispatch => {
  const response = await csrfFetch('/api/bookings/current');

  if (response.ok) {
    const {Bookings} = await response.json();
    const obj = {};
    Bookings.forEach(booking => (obj[booking.id] = booking));

    dispatch(userBookings(obj));
  }
};

export const bookingEdit = booking => async dispatch => {
  const {id} = booking;
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(booking),
  });
  const editedBooking = await response.json();
  if (response.ok) {
    dispatch(editBooking(editedBooking));
  } else {
    throw response;
  }
};

export const reviewDelete = id => async dispatch => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteBooking(id));
  }
};

const initialState = {};
const bookingsReducer = (state = initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case GET:
      newState = {...action.bookings};
    case ADD:
      newState = {...state, [action.bookings.id]: action.bookings};
      return newState;
    case USERBOOKINGS:
      newState = {...action.bookings};
      return newState;
    case EDIT:
      newState = {...state, [action.bookings.id]: action.bookings};
      return newState;
    case DELETE:
      delete newState[action.bookings.id];
      return newState;
    case 'RENDERBOOKINGS':
      return initialState;
    default:
      return state;
  }
};

export default bookingsReducer;
