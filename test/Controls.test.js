import React from 'react';
import ReactDOM from 'react-dom';
import Controls from '../src/Controls';
import { mount, shallow } from 'enzyme'

describe('Controls', () => {

  let wrapper
  let populateMockFn

  beforeEach(() => {
    populateMockFn = jest.fn()
    wrapper = mount(<Controls populateDistrictList={populateMockFn}/>)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  });

  it('should receive correct props', () => {
    expect(wrapper.instance().props.populateDistrictList).toEqual(populateMockFn)
  })

  it('should have a heading', () => {
    const header = 'Headcount 2.0'

    expect(wrapper.find('h1').text()).toEqual(header)
  })

  it('should have a section with a class of heading container', () => {
    expect(wrapper.find('section').props().className).toEqual('heading-container')
  })

  it('should run populateDistrictList method on input change', () => {
    const searchInput = wrapper.find('input')

    searchInput.simulate('change', { target: { value: 'a'}})
    expect(populateMockFn).toHaveBeenCalledTimes(1)

    searchInput.simulate('change', { target: { value: 'ab'}})
    expect(populateMockFn).toHaveBeenCalledTimes(2)

    searchInput.simulate('change', { target: { value: 'a'}})
    searchInput.simulate('change', { target: { value: ''}})
    expect(populateMockFn).toHaveBeenCalledTimes(4)
  })

})
