import React from 'react';
import ReactDOM from 'react-dom';
import DistrictCard from '../src/DistrictCard';
import { mount, shallow } from 'enzyme'

describe('DistrictCard', () => {
  let wrapper
  let districtData

  beforeEach(() => {
    districtData =
      { location: 'COLORADO',
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
          '2014': 0.527
        }
      }
      wrapper = shallow(<DistrictCard {...districtData} key={5}/>)
  })

  it.skip('should exist', () => {
    expect(wrapper).toBeDefined()
  });

  it.skip('should return the correct elements', () => {
    const h2Text = 'COLORADO'
    const ulLength = 1

    expect(wrapper.find('h2').text()).toEqual(h2Text)
    expect(wrapper.find('ul').length).toEqual(ulLength)
  })

  it.skip('should return 11 li elements', () => {
    const liLength = 11

    expect(wrapper.find('li').length).toEqual(liLength)
  })

  it.skip('should render the correct li elements', () => {
    const liElement1 = '2004: 0.333'
    const liElement2 = '2005: 0.175'

    expect(wrapper.find('li').at(0).text()).toEqual(liElement1)
    expect(wrapper.find('li').at(1).text()).toEqual(liElement2)
  })

  it.skip('should be receiving the correct props', () => {
    const { location, data } = districtData

    expect(wrapper.instance().props.location).toEqual(location)
    expect(wrapper.instance().props.data).toEqual(data)
  })

  it.skip('should have correct class for each li element', () => {
    const liElementAboveFive = wrapper.find('li').at(10)
    const liElementBelowFive = wrapper.find('li').at(1)

    expect(liElementAboveFive.props().className).toEqual('card-data aboveFive')
    expect(liElementBelowFive.props().className).toEqual('card-data belowFive')
  })

})
