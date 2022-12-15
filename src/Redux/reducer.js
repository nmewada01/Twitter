import { GET_TWEETS, REGISTER_SUCCESS, LOGIN_SUCCESS, PROFILE_SUCCESS, PROFILE_UPDATE } from "./action";

const initState = {
  isLoading: true,
  users: [],
  posts: [],
  current: {},
  isLoggedIn: true,
};

export const Reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case GET_TWEETS:
      return { ...state, posts: payload };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false }
    case LOGIN_SUCCESS:
      return { ...state, users: payload }
    case PROFILE_SUCCESS:
      return { ...state, current: payload }
    case PROFILE_UPDATE:
      return { ...state, current: payload }
    default:
      return state;
  }
};
