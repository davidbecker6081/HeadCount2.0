import React from 'react'
import './CssFolder/Controls.css';

 const Controls = ({ populateDistrictList }) => {

  return (
    <div className='controls-container'>
      <section className='heading-container'>
        <h1 className='app-title'>Headcount 2.0</h1>
        <input className='search-input' type="text"  placeholder='Enter District To Search'
        onChange={populateDistrictList}/>
      </section>
    </div>
  )
}

export default Controls

// const dataKeys = {
//   ThirdGradeTests: '3rd Grade Tests',
//   EigthGradeTests: '8th Grade Test Scores',
// let checkKeys = Object.keys(dataKeys).filter((key) => key === this.state.searchInput)
// let keyForData = dataKeys[checkKeys[0]]
// console.log('checkKeys', checkKeys);
// console.log('keyforData', keyForData);
// if (checkKeys.length) {
  //populateDistrictList
// } else {
//   return alert('invalid input')
// }
