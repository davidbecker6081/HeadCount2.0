import React from 'react';
import DistrictCard from './DistrictCard';
import './CssFolder/DistrictList.css';
import PropTypes from 'prop-types'


const DistrictList = ({ districtListArray, addToComparison, comparisonArray, districtRepo, removeFromComparisonArray }) => {

  const districtCardInstance = districtListArray.map((districtObj, i) =>
      <DistrictCard {...districtObj} addToComparison={addToComparison}  districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArray} key={i} />
  )

  return (
    <div className='card-container'>
      {districtCardInstance}
      {comparisonArray.length === 1 &&
        <article className="ghost-card">Add Card</article>}
    </div>
  )
}

export default DistrictList

DistrictList.propTypes = {
  districtListArray: PropTypes.arrayOf(PropTypes.shape({
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
  }))
}
