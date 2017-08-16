import React, { Component } from 'react';
import './App.css';
import Controls from './Controls' ;
import DistrictCard from './DistrictCard';
import DistrictList from'./DistrictList';

class App extends Component {
  constructor() {
    super()
    this.state = {
      districtList: []
    }
  }

  populateDistrictList(data) {
    const dataArray = Object.keys(data).map((location) => data[location])
    this.setState({
      districtList: dataArray
    })
  }

  render() {
    return (
      <div>
        <Controls populateDistrictList={this.populateDistrictList.bind(this)}/>
      </div>
    );
  }
}

export default App;
