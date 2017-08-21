import React from 'react'
import './CssFolder/Controls.css';
import PropTypes from 'prop-types';

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

Controls.propTypes = {
  populateDistrictList: PropTypes.func.isRequired
}
