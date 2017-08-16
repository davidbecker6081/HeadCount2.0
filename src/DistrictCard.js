import React from 'react';

const DistrictCard = ({ location, data }) => {

  const listItemInstance = Object.keys(data).map((year, i) => {
    return (
      <li className="card-data" key={i}>{year}: {data[year]}</li>
    )
  })

  return (
    <article>
      <h2 className='card-location'>{location}</h2>
      <ul>
        {listItemInstance}
      </ul>
    </article>
  )
}

export default DistrictCard;
