import { ActionTypes } from "../actions/index";

const initialState = [
  {
    id: 1,
    name: "Do my laundary",
    description: "Laundary",
    completed: false
  },
  {
    id: 2,
    name: "Go to the store",
    description: "Store",
    completed: true
  },
  {
    id: 3,
    name: "Finish project",
    description: "Project",
    completed: false
  }
];
let id = 3;

export default function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_TODO:
      return createTodo(state, action.payload);
    case ActionTypes.DELETE_TODO:
      return deleteTodo(state, action.payload);
    case ActionTypes.UPDATE_TODO:
      return updateTodo(state, action.payload);
    case ActionTypes.MARK_TODO_AS_COMPLETE:
      return markTodoAsComplete(state, action.payload);
    case ActionTypes.MARK_TODO_AS_INCOMPLETE:
      return markTodoAsIncomplete(state, action.payload);
    default:
      return state;
  }
}

const createTodo = (state, payload) => {
  const currentState = state.slice();
  const todoId = id++;
  const newTodo = { id: todoId, ...payload };
  currentState.push(newTodo);
  return currentState;
};

const deleteTodo = (state, payload) => {
  const currentState = state.slice();
  const updatedList = currentState.filter(todo => todo.id !== payload);
  return updatedList;
};

const updateTodo = (state, payload) => {
  const currentState = state.slice();
  const todoIndex = currentState.findIndex(todo => todo.id === payload.id);
  currentState[todoIndex].name = payload.name;
  currentState[todoIndex].description = payload.description;
  currentState[todoIndex].completed = payload.completed;
  return currentState;
};

const markTodoAsComplete = (state, payload) => {
  const currentState = state.slice();
  const todoIndex = currentState.findIndex(todo => todo.id === payload);
  currentState[todoIndex].completed = true;
  return currentState;
};

const markTodoAsIncomplete = (state, payload) => {
  const currentState = state.slice();
  const todoIndex = currentState.findIndex(todo => todo.id === payload);
  currentState[todoIndex].completed = false;
  return currentState;
};
