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
    console.log(dataArray);
    this.setState({
      districtList: dataArray

    })
  }

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
