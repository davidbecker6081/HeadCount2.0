import React from 'react';
import DistrictCard from './DistrictCard';


const DistrictList = ({ districtListArray }) => {

  const districtCardInstance = districtListArray.map((districtObj, i) =>
      <DistrictCard {...districtObj} key={i} />
  )

  return (
    <div>
      {districtCardInstance}
    </div>
  )

}

export default DistrictList
