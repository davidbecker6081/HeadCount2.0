import React from 'react';

const DistrictCard = ({ location, data }) => {

  const listItemInstance = Object.keys(data).map((year, i) => {
    let numberClass = data[year] >= 0.5 ? 'card-data aboveFive' : 'card-data belowFive'
      return (
      <li className={numberClass} key={i}>{year}: {data[year]}</li>
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
