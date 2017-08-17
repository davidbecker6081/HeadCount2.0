import React from 'react';
import DistrictCard from './DistrictCard';
import './CssFolder/DistrictList.css';


const DistrictList = ({ districtListArray }) => {

  const districtCardInstance = districtListArray.map((districtObj, i) =>
      <DistrictCard {...districtObj} key={i} />
  )

  return (
    <div className='card-container'>
      {districtCardInstance}
    </div>
  )

}

export default DistrictList
