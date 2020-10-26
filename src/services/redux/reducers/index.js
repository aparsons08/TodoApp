import { combineReducers } from "redux";

import contactDetails from "./contactDetails";
import todos from "./todos";

const rootReducer = combineReducers({
  todos,
  contactDetails
});

export default rootReducer;
