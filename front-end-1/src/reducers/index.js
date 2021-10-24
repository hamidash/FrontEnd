import {
  FETCHING_USER_START,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAIL,
  FETCHING_CLASS_START,
  FETCHING_CLASS_SUCCESS,
  FETCHING_CLASS_FAIL,
} from "../actions";

const initialState = {
  user: {
    id: 2,
    name: "Ed",
    role: "Instructor",
  },
  class: [
    {
      class_id: 1,
      name: "yoga",
      date: "10-01-21",
      start_time: "15:00",
      duration_mins: 45,
      intensity: "beginner",
      location: "LA",
      max_size: 10,
      user_id: 2,
    },
    {
      class_id: 3,
      name: "hiit",
      date: "10-01-30",
      start_time: "14:00",
      duration_mins: 30,
      intensity: "beginner",
      location: "LA",
      max_size: 9,
      user_id: 2,
    },
  ],
  isFetching: false,
  error: "",
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
        error: action.payload,
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
        error: action.payload,
        isFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
