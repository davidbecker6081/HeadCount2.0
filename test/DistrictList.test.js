import React from 'react';
import ReactDOM from 'react-dom';
import DistrictList from '../src/DistrictList';
import { mount, shallow } from 'enzyme'

describe('DistrictList', () => {

  it('should exist', () => {
    const districtListArray = [{
      'COLORADO':
      { location: 'COLORADO',
        dataFormat: 'Percent',
        data: { '2005': 0.175,
        '2006': 0.17,
        '2007': 0.255,
        '2008': 0.275,
        '2009': 0.45,
        '2010': 0.367 }
      },
      'ACADEMY 20': { location: 'ACADEMY 20',
        dataFormat: 'Percent',
        data: { '2005': 0.176,
        '2006': 0.189,
        '2007': 0.355,
        '2008': 0.215,
        '2009': 0.456,
        '2010': 0.307 }

      }
    }]
    let wrapper = shallow(<DistrictList districtListArray={districtListArray} />)
    expect(wrapper).toBeDefined()
  });

})
