/* global describe, it */

'use strict';

import React from 'react';
import { mount } from 'enzyme';
import Component from '../src';
import expect from 'expect';

describe('Checking Rendering', function () {
  let component = mount(<Component />);

  it('component is rendered', function () {
    expect(component).toExist();
  });
});
