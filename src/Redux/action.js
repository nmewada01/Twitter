import axios from "axios";
import { setToast } from "../Components/extra";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const GET_TWEETS = "GET_TWEETS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const PROFILE_SUCCESS = "PROFILE_SUCCESS"
export const PROFILE_UPDATE = "PROFILE_UPDATE"
export const getTweets = () => async (dispatch) => {
  let { data } = await axios.get("https://nareshrajput-sportsk.up.railway.app/posts");
  dispatch({
    type: GET_TWEETS,
    payload: data,
  });
};


export const register = (payload, toast) => (dispatch) => {
  return axios
    .post("https://nareshrajput-sportsk.up.railway.app/registerUsers", payload)
    .then((r) => {
      console.log(r)
      setToast(toast, "Register Successfully", "success")
      dispatch({ type: REGISTER_SUCCESS, payload: r.data });
    })

};
export const login = () => (dispatch) => {
  return axios
    .get("https://nareshrajput-sportsk.up.railway.app/registerUsers")
    .then((r) => {
      // console.log(r)
      dispatch({ type: LOGIN_SUCCESS, payload: r.data });
    })
};

export const loginPro = (payload, toast) => (dispatch) => {
  return axios
    .post("https://nareshrajput-sportsk.up.railway.app/loginProfile", payload)
    .then((r) => {
      console.log(r)
      dispatch({ type: PROFILE_SUCCESS, payload: r.data });
    })
};

export const updateProfile = (payload, id,toast) => (dispatch) => {
  return axios.patch(`https://nareshrajput-sportsk.up.railway.app/loginProfile/${id}`, payload).then((r) => {
    // console.log(r.data)
    setToast(toast, "Profile Updated Successfully", "success")
    dispatch({ type: PROFILE_UPDATE, payload: r.data })
  })
}