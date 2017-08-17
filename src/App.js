import React, { Component } from 'react';
import './App.css';
import Controls from './Controls' ;
import DistrictList from'./DistrictList';
import kinderData from '../data/kindergartners_in_full_day_program.js';
import DistrictRepository from './DistrictRepository'

class App extends Component {
  constructor() {
    super()
    this.data = new DistrictRepository(kinderData)
    this.state = {
      districtList: this.data.findAllMatches(''),
      comparison: []
    }
  }

  //push into comparison array when a card is clicked
  //when comparison array has length of 2, we can run methods to compare averages

  populateDistrictList(e) {
    this.setState({
      districtList: this.data.findAllMatches(e.target.value)
    })
  }
ß
  //method to account for no matches, run as callback in populateDistrictList

  render() {
    return (
      <div>
        <Controls populateDistrictList={this.populateDistrictList.bind(this)}/>
        <DistrictList districtListArray={this.state.districtList} />
      </div>
    );
  }
}

export default App;
