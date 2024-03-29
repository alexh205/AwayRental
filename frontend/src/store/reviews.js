import { csrfFetch } from './csrf';

const GET = 'reviews/GET';
const EDIT = 'reviews/EDIT';
const DELETE = 'reviews/DELETE';
const USERREVIEWS = 'reviews/USERREVIEWS';

const getReviews = data => ({
  type: GET,
  reviews: data,
});

const editReview = data => ({
  type: EDIT,
  reviews: data,
});

const userReviews = data => ({
  type: USERREVIEWS,
  reviews: data,
});

const deleteReview = data => ({
  type: DELETE,
  reviews: data,
});

export const renderReviews = () => {
  return {
    type: 'RENDERREVIEWS',
  };
};

export const getSpotReviewsThunk = spotId => async dispatch => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const { Reviews } = await response.json();
    const obj = {};
    Reviews.forEach(review => (obj[review.id] = review));
    dispatch(getReviews(obj));

  }

};

export const addNewReviewThunk = data => async dispatch => {
  const { spotId } = data;

  await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

};

export const getUserReviewsThunk = () => async dispatch => {
  const response = await csrfFetch('/api/reviews/current');

  if (response.ok) {
    const { Reviews } = await response.json();
    const obj = {};
    Reviews.forEach(review => (obj[review.id] = review));

    dispatch(userReviews(obj));
  }
};

export const reviewEditThunk = review => async dispatch => {
  const { id } = review;
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const editedReview = await response.json();
    dispatch(editReview(editedReview));
  }
};

export const reviewDeleteThunk = id => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteReview(id));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...action.reviews };
      return newState;
    // case ADD:
    //   newState = { ...newState, [action.reviews.id]: action.reviews };
    //   return newState;
    case USERREVIEWS:
      newState = { ...action.reviews };
      return newState;
    case EDIT:
      newState = { ...newState, [action.reviews.id]: action.reviews };
      return newState;
    case DELETE:
      delete newState[action.reviews];
      return newState;
    case 'RENDERREVIEWS':
      return initialState;

    default:
      return state;
  }
};

export default reviewsReducer;
