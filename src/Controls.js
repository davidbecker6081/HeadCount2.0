import React from 'react'
import './CssFolder/Controls.css';
import PropTypes from 'prop-types';

 const Controls = ({ populateDistrictList }) => {

   const fixNav = () => {
     const nav = document.querySelector('.heading-container');
     const topOfNav = nav.offsetTop;
     if(window.scrollY >= topOfNav + 2){
       document.body.style.paddingTop = nav.offSetHeight + 'px'
       document.body.classList.add('fixed-nav');
     } else {
       document.body.style.paddingTop = nav.offSetHeight
       document.body.classList.remove('fixed-nav');
     }
   }
   
   window.addEventListener('scroll', fixNav)

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
