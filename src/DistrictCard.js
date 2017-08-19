import React from 'react';
import './CssFolder/DistrictCard.css';
import PropTypes from 'prop-types';

const DistrictCard = ({ location, data, addToComparison, districtRepoClass, hasBeenSelected, removeFromComparisonArray }) => {

  const listItemInstance = Object.keys(data).map((year, i) => {
    let numberClass = data[year] >= 0.5 ? 'card-data aboveFive' : 'card-data belowFive'
      return (
      <li className={numberClass} key={i}>{year}: {data[year]}</li>
      )
  })

  const districtAverage = districtRepoClass.findAverage(location)

  //if hasBeenClicked is true give it the .selected and default class, if false, give it default class
  let selected = hasBeenSelected ? 'selected default-card' : 'default-card'
  //if comparisonArray is length of two,
  let buttonText = hasBeenSelected ? 'Remove' : 'Add'
  let buttonAction = hasBeenSelected ?
                          () => removeFromComparisonArray(location)
                          : () => addToComparison(location)

  return (
      <article className={selected}>
        <h2 className='card-location'>{location}</h2>
        <ul>
          {listItemInstance}
        </ul>
        {hasBeenSelected &&
          <div>District Average: {districtAverage}</div>}
        <button onClick={buttonAction}>{buttonText}</button>
      </article>
  )
}

export default DistrictCard;

DistrictCard.propTypes = {
  location: PropTypes.string.isRequired,
  dataFormat: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  data: PropTypes.shape({
    '2004': PropTypes.number,
    '2005': PropTypes.number,
    '2006': PropTypes.number,
    '2007': PropTypes.number,
    '2008': PropTypes.number,
    '2009': PropTypes.number,
    '2010': PropTypes.number,
    '2011': PropTypes.number,
    '2012': PropTypes.number,
    '2013': PropTypes.number,
    '2014': PropTypes.number
  }).isRequired
}
