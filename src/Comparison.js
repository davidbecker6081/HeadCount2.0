import React from 'react';
import './CssFolder/Comparison.css';
import PropTypes from 'prop-types';

const Comparison = ({ comparisonArray, districtRepo }) => {

  let district1 = comparisonArray[0].location
  let district2 = comparisonArray[1].location

  const comparisonObj = districtRepo.compareDistrictAverages(district1, district2)

  return (
    <section className="comparison-card">
      <div>
        {district1} Average: {comparisonObj[district1]}
      </div>
      <div>
        Compared: {comparisonObj.compared}
      </div>
      <div>
        {district2} Average: {comparisonObj[district2]}
      </div>
    </section>
  )
}

export default Comparison

Comparison.propTypes = {
  comparisonArray: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  districtRepo: PropTypes.shape({
    data: PropTypes.object.isRequired
  })
}
