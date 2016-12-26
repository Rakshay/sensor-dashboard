'use strict';

import * as actionEvents from '../actions/events';

let cloneState = function (state) {
  let clonedState;
  if (state !== undefined) {
    if (state instanceof Array) {
      clonedState = state.map((el) => {
        if (typeof el === 'object') {
          return Object.assign({}, el);
        } else {
          return el;
        }
      });
    } else if (state instanceof Object) {
      clonedState = Object.assign({}, state);
    } else {
      clonedState = state;
    }
  } else {
    clonedState = state;
  }
  return clonedState;
};

export function probe1Archiver (state, action) {
  let actionType = action.type,
      newState = (state !== undefined) ? cloneState(state) : [];

  if (actionType === actionEvents.UPDATE_SENSOR_DATA) {
    newState.push(action.payload);
  }

  return newState;
}

export function probe1Logger (state, action) {
  let actionType = action.type,
      newState = (state !== undefined) ? cloneState(state) : [];

  if (actionType === actionEvents.UPDATE_SENSOR_DATA) {
    if (newState.length > 10) {
      newState = newState.slice(1);
    }
    newState.push(action.payload);
  }

  return newState;
}
