import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import { mount, shallow } from 'enzyme'
import Controls from '../src/Controls'
import DistrictList from '../src/DistrictList'
import DistrictCard from '../src/DistrictCard'
import DistrictRepository from '../src/DistrictRepository'
import kinderData from '../data/kindergartners_in_full_day_program.js';
import Comparison from '../src/Comparison'


describe('App', () => {

  let wrapper
  let district
  let district1
  let district2

  beforeEach(() => {
    district = new DistrictRepository(kinderData)

    district1 = { location: 'COLORADO',
      dataFormat: 'Percent',
      data: {
      '2004': 0.333,
      '2005': 0.175,
      '2006': 0.17,
      '2007': 0.255,
      '2008': 0.275,
      '2009': 0.45,
      '2010': 0.367,
      '2011': 0.327,
      '2012': 0.427,
      '2013': 0.227,
      '2014': 0.527 },
      hasBeenSelected: false
    }

    district2 = {
      location: 'ACADEMY 20',
      dataFormat: 'Percent',
      data: {
      '2004': 0.333,
      '2005': 0.135,
      '2006': 0.17,
      '2007': 0.5,
      '2008': 0.275,
      '2009': 0.45,
      '2010': 0.367,
      '2011': 0.367,
      '2012': 0.427,
      '2013': 0.227,
      '2014': 0.627 },
      hasBeenSelected: false
    }

    wrapper = mount(<App data={ district } />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  })

  it('should have the correct initial state', () => {
    const expectedState = {
      districtList: district.findAllMatches(''),
      comparison: []
    }

    expect(wrapper.state()).toEqual(expectedState)
    expect(wrapper.state().districtList.length).toEqual(181)
  })

  it('should render Controls and two DistrictLists as initial state', () => {
    expect(wrapper.find(Controls).first().exists()).toEqual(true)
    expect(wrapper.find(DistrictList).first().exists()).toEqual(true)
    expect(wrapper.find(DistrictList).length).toEqual(2)
  })

  it('should render a comparison container if comparison array length is less than 2', () => {
    expect(wrapper.find('.comparison-container').exists()).toEqual(true)

    wrapper.state().comparison.push('disrictObj1')
    wrapper.state().comparison.push('disrictObj2')
    wrapper.state().comparison.push('disrictObj3')

    expect(wrapper.find('comparison-container').exists()).toEqual(false)
  })

  it('should render a comparison wrapper and a p element if comparison array length is less than or equal to 2', () => {
    expect(wrapper.find('.comparison-wrapper').exists()).toEqual(true)

    wrapper.state().comparison.push('disrictObj1')
    wrapper.state().comparison.push('disrictObj2')
    wrapper.state().comparison.push('disrictObj3')

    expect(wrapper.find('comparison-wrapper').exists()).toEqual(false)
  })

  it('should render a Comparison component and button if comparison array length is equal to 2', () => {
    expect(wrapper.find('.comparison-component-btn').exists()).toEqual(false)
    expect(wrapper.find(Comparison).exists()).toEqual(false)
    expect(wrapper.find('.clear-comparison-btn').exists()).toEqual(false)

    wrapper.state().comparison.push(district1)
    wrapper.state().comparison.push(district2)
    wrapper.update()

    expect(wrapper.find('.comparison-component-btn').exists()).toEqual(true)
    expect(wrapper.find(Comparison).exists()).toEqual(true)
    expect(wrapper.find('.clear-comparison-btn').exists()).toEqual(true)
  })

  it('should reset comparison array to 0 and hasBeenSelected property to false if the Clear Comparison button is clicked', () => {
    district1.hasBeenSelected = true
    district2.hasBeenSelected = true
    wrapper.state().comparison.push(district1)
    wrapper.state().comparison.push(district2)
    wrapper.update()

    const clearBtn = wrapper.find('.clear-comparison-btn')

    expect(wrapper.state().comparison.length).toEqual(2)

    clearBtn.simulate('click')

    expect(wrapper.state().comparison.length).toEqual(0)
    expect(district1.hasBeenSelected).toEqual(false)
    expect(district2.hasBeenSelected).toEqual(false)
  })

  it('should be able to update state with new districtList', () => {
    expect(wrapper.state().districtList.length).toEqual(181)

    wrapper.instance().populateDistrictList({ target: {value: 'colorado'}})

    expect(wrapper.state().districtList.length).toEqual(2)
  })

  it('should add a district to the comparison array', () => {
    expect(wrapper.state().comparison.length).toEqual(0)

    wrapper.instance().addToComparison(district1.location)
    expect(wrapper.state().comparison.length).toEqual(1)

    wrapper.instance().addToComparison(district2.location)
    expect(wrapper.state().comparison.length).toEqual(2)
  })

  it('should remove a district from the comparison array ', () => {
    wrapper.instance().addToComparison(district1.location)
    wrapper.instance().addToComparison(district2.location)

    expect(wrapper.state().comparison.length).toEqual(2)

    wrapper.instance().removeFromComparisonArray(district1.location)
    expect(wrapper.state().comparison.length).toEqual(1)

    wrapper.instance().removeFromComparisonArray(district2.location)
    expect(wrapper.state().comparison.length).toEqual(0)
  })

  it('should not add a district card twice into comparison array', () => {
    wrapper.instance().addToComparison(district1.location)
    expect(wrapper.state().comparison.length).toEqual(1)

    wrapper.instance().addToComparison(district1.location)
    expect(wrapper.state().comparison.length).toEqual(1)
  })

  it('should not add a district to the comparison array when two districts are already selected', () => {
    const district3 = {
      location: 'ANOTHER DISTRICT',
      dataFormat: 'Percent',
      data: {
      '2004': 0.333,
      '2005': 0.135,
      '2006': 0.17,
      '2007': 0.5,
      '2008': 0.275,
      '2009': 0.45,
      '2010': 0.367,
      '2011': 0.367,
      '2012': 0.427,
      '2013': 0.227,
      '2014': 0.627 },
      hasBeenSelected: false
    }

    wrapper.instance().addToComparison(district1.location)
    wrapper.instance().addToComparison(district2.location)

    expect(wrapper.state().comparison.length).toEqual(2)

    wrapper.instance().addToComparison(district3.location)

    expect(wrapper.state().comparison.length).toEqual(2)
  })

  it('should be able to reset the comparison array', () => {
    wrapper.instance().addToComparison(district1.location)
    wrapper.instance().addToComparison(district2.location)

    expect(wrapper.state().comparison.length).toEqual(2)

    wrapper.instance().resetComparisonArray()

    expect(wrapper.state().comparison.length).toEqual(0)
  })

  it('should render the correct cards from comparison array', () => {
    wrapper.instance().addToComparison(district1.location)
    wrapper.instance().addToComparison(district2.location)
    wrapper.update()

    expect(wrapper.find(DistrictCard).first().find('h2').at(0).text()).toEqual('COLORADO')
    expect(wrapper.find(DistrictCard).find('h2').at(1).text()).toEqual('ACADEMY 20')
  })

})
