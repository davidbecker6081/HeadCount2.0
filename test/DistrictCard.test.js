import React from 'react';
import ReactDOM from 'react-dom';
import DistrictCard from '../src/DistrictCard';
import { mount, shallow } from 'enzyme'
import DistrictRepository from '../src/DistrictRepository'
import kinderData from '../data/kindergartners_in_full_day_program.js';

describe('DistrictCard', () => {
  let wrapper
  let districtData
  let addToComparisonMock
  let removeFromComparisonArrayMock
  let districtRepo

  beforeEach(() => {
    addToComparisonMock = jest.fn()
    removeFromComparisonArrayMock = jest.fn()
    districtRepo = new DistrictRepository(kinderData)
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
        },
      hasBeenSelected: false
      }
      wrapper = shallow(<DistrictCard {...districtData} addToComparison={addToComparisonMock} districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArrayMock} key={5}/>)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  });

  it('should return the correct elements', () => {
    const h2Text = 'COLORADO'
    const ulLength = 1

    expect(wrapper.find('h2').text()).toEqual(h2Text)
    expect(wrapper.find('ul').length).toEqual(ulLength)
  })

  it('should return 11 li elements', () => {
    const liLength = 11

    expect(wrapper.find('li').length).toEqual(liLength)
  })

  it('should render the correct li elements', () => {
    const liElement1 = '2004: 0.333'
    const liElement2 = '2005: 0.175'

    expect(wrapper.find('li').at(0).text()).toEqual(liElement1)
    expect(wrapper.find('li').at(1).text()).toEqual(liElement2)
  })

  it('should be receiving the correct props', () => {
    const { location, data } = districtData

    expect(wrapper.instance().props.location).toEqual(location)
    expect(wrapper.instance().props.data).toEqual(data)
  })

  it('should have correct class for each li element', () => {
    const liElementAboveFive = wrapper.find('li').at(10)
    const liElementBelowFive = wrapper.find('li').at(1)

    expect(liElementAboveFive.props().className).toEqual('card-data aboveFive')
    expect(liElementBelowFive.props().className).toEqual('card-data belowFive')
  })

  it('should have different classes based on hasBeenSelected property', () => {
    const selectedClass = 'selected default-card'
    const defaultClass = 'default-card'
    const actualClassWhenFalse = wrapper.find('article').at(0).props().className

    expect(actualClassWhenFalse).toEqual(defaultClass)

    districtData.hasBeenSelected = true
    wrapper = shallow(<DistrictCard {...districtData}
                                    addToComparison={addToComparisonMock} districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArrayMock} key={5}/>)
    const actualClassWhenTrue = wrapper.find('article').at(0).props().className

    expect(actualClassWhenTrue).toEqual(selectedClass)
  })

  it('should give the button different text based on hasBeenSelected property', () => {
    const buttonTextWhenTrue = 'Remove'
    const buttonTextWhenFalse = 'Add'
    const actualTextWhenFalse = wrapper.find('button').at(0).text()

    expect(actualTextWhenFalse).toEqual(buttonTextWhenFalse)

    districtData.hasBeenSelected = true
    wrapper = shallow(<DistrictCard {...districtData}
                                    addToComparison={addToComparisonMock} districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArrayMock} key={5}/>)

    const actualTextWhenTrue = wrapper.find('button').at(0).text()

    expect(actualTextWhenTrue).toEqual(buttonTextWhenTrue)
  })

  it('should contain a button that runs different methods based on hasBeenSelected property', () => {
    const methodWhenFalse = addToComparisonMock
    const methodWhenTrue = removeFromComparisonArrayMock
    const btnWhenFalse = wrapper.find('button')

    btnWhenFalse.simulate('click')
    expect(methodWhenFalse).toHaveBeenCalled()

    districtData.hasBeenSelected = true
    wrapper = shallow(<DistrictCard {...districtData}
                                    addToComparison={addToComparisonMock} districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArrayMock} key={5}/>)

    const btnWhenTrue = wrapper.find('button')
    btnWhenTrue.simulate('click')
    expect(methodWhenTrue).toHaveBeenCalled()
  })

  it('should have a district average if the hasBeenSelected property is true', () => {
    const expectedDistrictAverage = districtRepo.findAverage(districtData.location)
    const expectedDistrictAverageDisplay = `District Average: ${expectedDistrictAverage}`

    expect(wrapper.find('div').exists()).toEqual(false)

    districtData.hasBeenSelected = true
    wrapper = shallow(<DistrictCard {...districtData}
                                    addToComparison={addToComparisonMock} districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArrayMock} key={5}/>)

    const actualAverageDisplayWhenTrue = wrapper.find('div').at(0).text()

    expect(wrapper.find('div').exists()).toEqual(true)
    expect(actualAverageDisplayWhenTrue).toEqual(expectedDistrictAverageDisplay)
  })

})
