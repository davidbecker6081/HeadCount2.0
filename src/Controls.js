import React, { Component } from 'react';
import DistrictRepository from './DistrictRepository'
import ThirdGradeTests from '../data/3rd_grade_tests.js'
import EigthGradeTests from '../data/8th_grade_test_scores.js'
import kinderData from '../data/kindergartners_in_full_day_program.js';

import './CssFolder/Controls.css';

export default class Controls extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: '',
    }
  }

  handleChange(e) {
    this.setState({ searchInput: e.target.value})
  }

  handleSubmit() {
    // const dataKeys = {
    //   ThirdGradeTests: '3rd Grade Tests',
    //   EigthGradeTests: '8th Grade Test Scores',
    //   'kindergartners in full day program': kinderData
    // }
    //
    // let checkKeys = Object.keys(dataKeys).filter((key) => key === this.state.searchInput)
    // let keyForData = dataKeys[checkKeys[0]]
    // console.log('checkKeys', checkKeys);
    // console.log('keyforData', keyForData);

    // if (checkKeys.length) {
      const newDataSet = new DistrictRepository(kinderData)
      // console.log(newDataSet.data);
      this.props.populateDistrictList(newDataSet.data)
    // } else {
    //   return alert('invalid input')
    // }

  }

  render () {
    return (
      <div className='controls-container'>
        <section className='heading-container'>
          <h1 className= 'app-title'>Headcount 2.0</h1>
          <input className='search-input' type="text" placeholder='Enter Data Set To Search'
          value={this.state.searchInput}
          onChange={ this.handleChange.bind(this) }/>
          <button className='submit-btn'
          onClick={ this.handleSubmit.bind(this) }>Submit</button>
        </section>
      </div>
    )
  }
}
