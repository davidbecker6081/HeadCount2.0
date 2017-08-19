import React, { Component } from 'react';
import './App.css';
import Controls from './Controls' ;
import DistrictList from'./DistrictList';
import kinderData from '../data/kindergartners_in_full_day_program.js';
import DistrictRepository from './DistrictRepository'
import Comparison from './Comparison'

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

  addToComparison(districtName) {
    const districtCard = this.data.findByName(districtName)

    districtCard.hasBeenSelected = true

    const newArray = [...this.state.comparison, districtCard]

    let isDistrictInArray = this.state.comparison.filter((districtCard) => districtCard.location === districtName)

    if (this.state.comparison.length < 2 && isDistrictInArray.length === 0) {
      this.setState({
        comparison: newArray
      }, this.checkComparisonArray)
    }
  }

  resetComparisonArray() {
    this.state.comparison.map((districtObj) => districtObj.hasBeenSelected = false)

    this.setState({
      comparison: []
    })
  }

//if there is nothing in the comparison array, we can toggle hasBeenSelected on or off

//if hasbeen selected is true on the card, toggle class off and remove card from array

//if hasBeenSelected is false and the length of the comparisonArray is not equal to 2, then hasBeenSelected can be set to true, and toggle class on

//if comparisonArray has length of 2, then only the two cards in the array should be able to be toggled off (and no other card should be clickable)

  render() {

    return (
        <div className="app-container">
          <Controls populateDistrictList={this.populateDistrictList.bind(this)}/>

          {this.state.comparison.length <= 2 &&
            <div className="comparison-container">

              <div className="comparison-wrapper">
                {this.state.comparison.length === 0 &&
                  <p>Add Districts To Compare</p>}

                  <DistrictList districtListArray={this.state.comparison} addToComparison={this.addToComparison.bind(this)} districtRepo={this.data}
                  comparisonArray={this.state.comparison} />

              </div>

              {this.state.comparison.length === 2 &&
                <div className="comparison-component-btn">
                  <Comparison comparisonArray={this.state.comparison} districtRepo={this.data} />
                  <button onClick={this.resetComparisonArray.bind(this)}>Clear Comparison</button>
                </div>
              }

            </div>
          }

          <DistrictList
            districtListArray={this.state.districtList} addToComparison={this.addToComparison.bind(this)}
            comparisonArray={this.state.comparison}
            districtRepo={this.data}/>
      </div>
    );
  }
}

export default App;
