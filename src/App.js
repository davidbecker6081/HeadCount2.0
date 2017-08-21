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

  addToComparison(districtName) {
    const districtCard = this.data.findByName(districtName)


    let isDistrictInArray = this.state.comparison.filter((districtCard) => districtCard.location === districtName)

    if (this.state.comparison.length < 2 && isDistrictInArray.length === 0) {

      districtCard.hasBeenSelected = true
      const newArray = [...this.state.comparison, districtCard]

      this.setState({
        comparison: newArray
      })
    }
  }

  removeFromComparisonArray(districtName) {
    const districtCard = this.data.findByName(districtName)

    districtCard.hasBeenSelected = false

    const newArray = this.state.comparison.filter((districtObj) => districtObj.location !== districtName)

    this.setState({
      comparison: newArray
    })
  }

  resetComparisonArray() {
    this.state.comparison.map((districtObj) => districtObj.hasBeenSelected = false)

    this.setState({
      comparison: []
    })
  }

  render() {

    return (
        <div className="app-container">
          <Controls
            populateDistrictList={this.populateDistrictList.bind(this)}/>

          {this.state.comparison.length <= 2 &&
            <div className="comparison-container">

              {this.state.comparison.length < 2 &&
                <p className="comparison-text">Add Two Districts To Compare</p>}

              <div className="comparison-wrapper">
                  <DistrictList
                    districtListArray={this.state.comparison} addToComparison={this.addToComparison.bind(this)} districtRepo={this.data}
                    removeFromComparisonArray={this.removeFromComparisonArray.bind(this)}
                    comparisonArray={this.state.comparison} />
              </div>

              {this.state.comparison.length === 2 &&
                <div className="comparison-component-btn">
                  <Comparison
                    comparisonArray={this.state.comparison} districtRepo={this.data} />
                  <button className="clear-comparison-btn" onClick={this.resetComparisonArray.bind(this)}>Clear Comparison</button>
                </div>
              }

            </div>
          }

          <DistrictList
            districtListArray={this.state.districtList} addToComparison={this.addToComparison.bind(this)}
            districtRepo={this.data}
            removeFromComparisonArray={this.removeFromComparisonArray.bind(this)}
            comparisonArray={this.state.comparison}/>
      </div>
    );
  }
}

export default App;
