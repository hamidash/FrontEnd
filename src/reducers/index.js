import {
  FETCHING_USER_START,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAIL,
  FETCHING_CLASS_START,
  FETCHING_CLASS_SUCCESS,
  FETCHING_CLASS_FAIL,
} from "../actions";

const initialState = {
  user: {},
  class: [],
  isFetching: false,
  user_error: "",
  class_error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCHING_USER_FAIL:
      return {
        ...state,
        user_error: action.payload,
        isFetching: true,
      };
    case FETCHING_CLASS_START:
      return {
        ...state,
        isFetching: true,
      };

    case FETCHING_CLASS_SUCCESS:
      return {
        ...state,
        class: action.payload,
        isFetching: false,
      };

    case FETCHING_CLASS_FAIL:
      return {
        ...state,
        class_error: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
