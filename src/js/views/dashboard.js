/* global PUBNUB */
'use strict';

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
// import { Chart } from 'react-d3-core';
// import { AreaChart } from 'react-d3-basic';
// import {Chart} from 'react-google-charts'

const PUBNUB_Settings = {
  subscribe_key: 'sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe'
};
const PUBNUM_Channel = 'pubnub-sensor-network';

let limit = ( cb, rate ) => {
  var queue = [];

  setInterval(() => {
      var msg = queue.shift();
      msg && cb(msg);
  }, rate );

  return (message) => { queue.push(message) };
}

class Dashboard extends React.Component {
  componentDidMount () {
    PUBNUB.init(PUBNUB_Settings)
      .subscribe({
        channel: PUBNUM_Channel,
        message: (msg) => { 
          this.props.dispatch(actions.fetchingPageData(msg));
        }
      });
  }

  render () {
    return (
      <div className="chart-container">
        <ResponsiveContainer minHeight={400}>
          <AreaChart data={this.props.data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="timestamp"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Area type="monotone" dataKey="photosensor" stroke='#EF6772' fill='#F7B1B6' isAnimationActive={false} />
            <Area type="monotone" dataKey="radiation_level" stroke='#F7AD5A' fill='#FBD4A8' isAnimationActive={false} />
            <Area type="monotone" dataKey="humidity" stroke='#50B97A' fill='#A7DCBC' isAnimationActive={false} />
            <Area type="monotone" dataKey="ambient_temperature" stroke='#3882CE' fill='#9AC0E6' isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

Dashboard.displayName = 'Dashboard';

Dashboard.propTypes = {
  dispatch: React.PropTypes.func,
  data: React.PropTypes.array
};

function extract (state) {
  return {
    data: state.active.map((datum) => {
      return {
        sensor_uuid: 'probe-0b01fc5e',
        humidity: parseFloat(datum.humidity),
        timestamp: 1482750376,
        ambient_temperature: parseFloat(datum.ambient_temperature),
        photosensor: parseFloat(datum.photosensor),
        radiation_level: parseFloat(datum.radiation_level)
      }
    })
  };
}

export default connect(extract)(Dashboard);
