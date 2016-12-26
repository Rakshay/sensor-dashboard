'use strict';

import * as actionEvents from './events';

export function fetchingPageData (data) {
  return {
    type: actionEvents.UPDATE_SENSOR_DATA,
    payload: data
  };
}
