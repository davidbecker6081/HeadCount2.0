import React from 'react';
import './CssFolder/DistrictCard.css';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';

const DistrictCard = ({ location, data, addToComparison, districtRepoClass, hasBeenSelected, removeFromComparisonArray, comparisonArray }) => {

  const districtAverage = districtRepoClass.findAverage(location)
  let selected = hasBeenSelected ? 'selected default-card' : 'default-card'
  let buttonText = hasBeenSelected ? 'Remove' : 'Add'
  let buttonAction = hasBeenSelected ?
                                    () => removeFromComparisonArray(location)
                                    : () => addToComparison(location)
  let isDisabled = comparisonArray.length === 2 && !hasBeenSelected ? true : false

  const listItemInstance = Object.keys(data).map((year, i) => {
    let numberClass = data[year] >= 0.5 ? 'card-data aboveFive' : 'card-data belowFive'
      return (
        <li className={numberClass} key={i}>{year}: {data[year]}</li>
      )
  })

  return (
    <FadeIn>
      <article className={selected}>
        <h2 className='card-location'>{location}</h2>
        <ul>
          {listItemInstance}
        </ul>
        {hasBeenSelected &&
          <div>District Average: {districtAverage}</div>}
        <button disabled={isDisabled} className="card-btn" onClick={buttonAction}>{buttonText}</button>
      </article>
      </FadeIn>
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
  }).isRequired,
  hasBeenSelected: PropTypes.bool.isRequired,
  addToComparison: PropTypes.func.isRequired,
  districtRepoClass: PropTypes.shape({
    data: PropTypes.object.isRequired
  }),
  removeFromComparisonArray: PropTypes.func.isRequired,
  comparisonArray: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}
