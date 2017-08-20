import React from 'react';
import ReactDOM from 'react-dom';
import DistrictList from '../src/DistrictList';
import DistrictCard from '../src/DistrictCard'
import DistrictRepository from '../src/DistrictRepository'
import kinderData from '../data/kindergartners_in_full_day_program.js';
import { mount, shallow } from 'enzyme'

describe('DistrictList', () => {
  let wrapper
  let districtListArray
  let addToComparisonMock
  let removeFromComparisonArrayMock
  let districtRepo

  beforeEach(() => {
    addToComparisonMock = jest.fn()
    removeFromComparisonArrayMock = jest.fn()
    districtRepo = new DistrictRepository(kinderData)
    districtListArray = [
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
        '2014': 0.527 }
      },
      {
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
        '2014': 0.627 }
      }
    ]
    wrapper = shallow(<DistrictList districtListArray={districtListArray} addToComparison={addToComparisonMock} removeFromComparisonArray={removeFromComparisonArrayMock} districtRepo={districtRepo}/>)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  });

  it('should return the same amount of DistrictCards as elements in the array', () => {
    expect(wrapper.find(DistrictCard).length).toEqual(2)
  });

  it('should contain the correct array length passed from props',() => {
    const districtArrayLength = districtListArray.length

    expect(wrapper.instance().props.districtListArray.length).toEqual(districtArrayLength)
  });

  it('should return correct second district card component',() => {
    let { location, dataFormat, data } = districtListArray[1]

     expect(wrapper.find(DistrictCard).get(1).props.location).toEqual(location)
     expect(wrapper.find(DistrictCard).get(1).props.dataFormat).toEqual(dataFormat)
     expect(wrapper.find(DistrictCard).get(1).props.data).toEqual(data)
  })

  it('should pass the correct key to the correct DistrictCard', () => {
    expect(wrapper.find(DistrictCard).at(1).key()).toEqual('1')
  })
})
