import { ActionTypes } from "../actions/index";

const initialState = { firstName: "", lastName: "", email: "", comments: "" };

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_CONTACT_DETAILS:
      return action.payload;
    default:
      return state;
  }
}
