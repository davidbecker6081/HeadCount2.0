import React from 'react';
import ReactDOM from 'react-dom';
import Comparison from '../src/Comparison';
import { mount, shallow } from 'enzyme'
import kinderData from
 '../data/kindergartners_in_full_day_program.js';
import DistrictRepository from '../src/DistrictRepository';
describe('Comparison', () => {

let wrapper
let comparisonArray
let districtRepo



beforeEach(() => {
  districtRepo= new DistrictRepository(kinderData);

  comparisonArray = [
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

  wrapper = shallow(<Comparison comparisonArray={comparisonArray} districtRepo={districtRepo} />)
})

it('should exist', () => {
  expect(wrapper).toBeDefined()
});

it('should contain the correct array length passed from props', () => {
  const comparisonArrayLength = comparisonArray.length

  expect(wrapper.instance().props.comparisonArray.length).toEqual(comparisonArrayLength)
});

it('should display correct averages for each district', () => {
  const district1AverageDisplay = wrapper.find('div').at(0).text()
  const district2AverageDisplay = wrapper.find('div').at(2).text()
  const actualD1Average =  districtRepo.findAverage(comparisonArray[0].location);
  const actualD2Average =  districtRepo.findAverage(comparisonArray[1].location);
  const expectedDisplayForD1 =
  `COLORADO Average: ${actualD1Average}`
  const expectedDisplayForD2 = `ACADEMY 20 Average: ${actualD2Average}`

  expect(district1AverageDisplay).toEqual(expectedDisplayForD1)
  expect(district2AverageDisplay).toEqual(expectedDisplayForD2)
})

it('should display a comparison average for two districts', () => {
  const comparedAverageDisplay = wrapper.find('div').at(1).text()
  const districtComparison = districtRepo.compareDistrictAverages(comparisonArray[0].location, comparisonArray[1].location)
  const expectedComparisonDisplay = `Compared: ${districtComparison.compared}`

  expect(comparedAverageDisplay).toEqual(expectedComparisonDisplay)

})




})
