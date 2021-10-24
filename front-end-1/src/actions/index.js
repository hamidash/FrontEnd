import { axiosWithAuth } from "../utils/axiosWithAuth";

export const FETCHING_USER_START = "FETCHING_USER_START";
export const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";
export const FETCHING_USER_FAIL = "FETCHING_USER_FAIL";

export const FETCHING_CLASS_START = "FETCHING_CLASS_START";
export const FETCHING_CLASS_SUCCESS = "FETCHING_CLASS_SUCCESS";
export const FETCHING_CLASS_FAIL = "FETCHING_CLASS_FAIL";

export const fetchUser = (userId) => (dispatch) => {
  dispatch({ type: FETCHING_USER_START });

  axiosWithAuth()
    .get(`/users/${userId}`)
    .then((res) => {
      dispatch({ type: FETCHING_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: FETCHING_USER_FAIL,
        payload: "Can't get user information",
      });
    });
};

export const fetchClass = (userId) => (dispatch) => {
  dispatch({ type: FETCHING_CLASS_START });

  axiosWithAuth()
    .get(`/users/${userId}/class`)
    .then((res) => {
      dispatch({
        type: FETCHING_CLASS_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      dispatch({
        type: FETCHING_USER_FAIL,
        payload: `Can't get cars information`,
      });
    });
};
