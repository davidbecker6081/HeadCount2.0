import React from 'react';
import ReactDOM from 'react-dom';
import Controls from '../src/Controls';
import { mount, shallow } from 'enzyme'

describe('Controls', () => {

  it('should exist', () => {
    let wrapper = shallow(<Controls/>)
    expect(wrapper).toBeDefined()
  });
})
