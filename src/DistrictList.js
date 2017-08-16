import React from 'react';
import DistrictCard from './DistrictCard';


const DistrictList = ({ districtListArray }) => {

  const districtCardInstance = districtListArray.map(districtObj =>
    <DistrictCard {...districtObj} key={districtObj.location} />
  )

  return (
    <div>
      {districtCardInstance}
    </div>
  )

}

export default DistrictList
