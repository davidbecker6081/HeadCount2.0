import React from 'react';
import DistrictCard from './DistrictCard';
import './CssFolder/DistrictList.css';
import PropTypes from 'prop-types'

const DistrictList = ({ districtListArray, addToComparison, districtRepo, removeFromComparisonArray, comparisonArray }) => {

  const districtCardInstance = districtListArray.map((districtObj, i) =>
      <DistrictCard {...districtObj}
        addToComparison={addToComparison}
        districtRepoClass={districtRepo} removeFromComparisonArray={removeFromComparisonArray}
        comparisonArray={comparisonArray}
        key={i} />
  )

  return (
    <div className='card-container'>
      {districtCardInstance}
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
    }).isRequired,
    hasBeenSelected: PropTypes.bool.isRequired
  })),
  addToComparison: PropTypes.func.isRequired,
  removeFromComparisonArray: PropTypes.func.isRequired,
  districtRepo: PropTypes.shape({
    data: PropTypes.object.isRequired
  }),
  comparisonArray: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}
