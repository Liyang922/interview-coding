const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  }

  dispatch({});

  return { getState, dispatch, subscribe };
}

const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] =  reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

