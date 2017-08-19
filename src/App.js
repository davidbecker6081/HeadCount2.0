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

  populateDistrictList(e) {
    this.setState({
      districtList: this.data.findAllMatches(e.target.value)
    })
  }

  //method to account for no matches, run as callback in populateDistrictList

  //push into comparison array when a card is clicked
  //gives method to districtList and then DistrictCard
  //when comparison array has length of 2, we can run methods to compare averages

  addToComparison(districtName) {
    const districtCard = this.data.findByName(districtName)
    const newArray = [...this.state.comparison, districtCard]

    if (this.state.comparison.length < 2) {
      this.setState({
        comparison: newArray
      }, this.checkComparisonArray)
    }
  }

  resetComparisonArray() {
    this.setState({
      comparison: []
    })
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if( nextProps.count > 5) {
  //     this.yungheader.style = 'color: purple;'
  //   }
  // }

  render() {

    return (
        <div className="app-container">
          <Controls populateDistrictList={this.populateDistrictList.bind(this)}/>

          {this.state.comparison.length === 2 &&
            <div className="comparison-container">
              <DistrictList districtListArray={this.state.comparison}/>
              <button onClick={this.resetComparisonArray.bind(this)}>Clear Comparison</button>
            </div>
          }

          <DistrictList
            districtListArray={this.state.districtList} addToComparison={this.addToComparison.bind(this)}
            comparisonArray={this.state.comparison}/>
      </div>
    );
  }
}

export default App;
