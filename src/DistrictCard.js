import React from 'react';

const DistrictCard = ({ location, data }) => {

  const listItemInstance = Object.keys(data).map(year => {
    return (
      <li className="card-data" key={year}>{year}: {data[year]}</li>
    )
  })

  return (
    <article>
      <h2 className='card-location'>{location}</h2>
      {listItemInstance}
    </article>
  )
}

export default DistrictCard;
