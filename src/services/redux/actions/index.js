export const ActionTypes = {
  SET_CONTACT_DETAILS: "SET_CONTACT_DETAILS",
  CREATE_TODO: "CREATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  MARK_TODO_AS_COMPLETE: "MARK_TODO_AS_COMPLETE",
  MARK_TODO_AS_INCOMPLETE: "MARK_TODO_AS_INCOMPLETE"
};

export const setContactDetails = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.SET_CONTACT_DETAILS,
      payload: payload
    });
  };
};

export const createTodo = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.CREATE_TODO,
      payload: payload
    });
  };
};

export const deleteTodo = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.DELETE_TODO,
      payload: payload
    });
  };
};

export const updateTodo = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.UPDATE_TODO,
      payload: payload
    });
  };
};

export const markTodoAsComplete = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.MARK_TODO_AS_COMPLETE,
      payload: payload
    });
  };
};

export const markTodoAsIncomplete = payload => {
  return async dispatch => {
    dispatch({
      type: ActionTypes.MARK_TODO_AS_INCOMPLETE,
      payload: payload
    });
  };
};
