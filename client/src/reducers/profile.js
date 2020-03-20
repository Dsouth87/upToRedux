import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE
} from '../actions/types'

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      }

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      }

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        profile: null,
        errors: payload
      }
    default:
      return state
  }
}
