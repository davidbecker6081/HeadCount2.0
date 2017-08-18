import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { mount, shallow } from 'enzyme'
import Controls from '../src/Controls'
import DistrictList from '../src/DistrictList'
import DistrictRepository from '../src/DistrictRepository'
import kinderData from '../data/kindergartners_in_full_day_program.js';


describe('App', () => {

  let wrapper
  let district

  beforeEach(() => {
    district = new DistrictRepository(kinderData)
    wrapper = mount(<App data={ district } />)

  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });us

  it('should render Controls and DistrictList', () => {
    expect(wrapper.find(Controls).first().exists()).toEqual(true)
    expect(wrapper.find(DistrictList).first().exists()).toEqual(true)
  })

  it('should have the correct initial state', () => {
    const expectedState = {
      districtList: district.findAllMatches(''),
      comparison: []
    }

    expect(wrapper.state()).toEqual(expectedState)
    expect(wrapper.state().districtList.length).toEqual(181)
  })

  it('should be able to update state with new districtList', () => {
    expect(wrapper.state().districtList.length).toEqual(181)

    wrapper.instance().populateDistrictList({ target: {value: 'colorado'}})

    expect(wrapper.state().districtList.length).toEqual(2)
  })

})
