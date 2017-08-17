export default class DistrictRepository {

  constructor(originalData) {
    this.data = this.removeDuplicates(originalData)
  }

  removeDuplicates(originalData) {
    const parsedData = originalData.reduce((newDataObj, dataObj, index) => {
      if(!newDataObj[dataObj['Location'].toUpperCase()]) {
        newDataObj[dataObj['Location'].toUpperCase()] = {
          location: dataObj['Location'].toUpperCase(),
          dataFormat: dataObj['DataFormat'],
          data: { [dataObj['TimeFrame']]:
          (Math.round(dataObj['Data'] * 1000)/ 1000) || 0 }
        }
      } else {
        newDataObj[dataObj['Location'].toUpperCase()].data[dataObj['TimeFrame']] = (Math.round(dataObj['Data'] * 1000)/ 1000) || 0
      }
      return newDataObj
    }, {})

    return parsedData
  }

  findByName(districtName = undefined) {
    return districtName ? this.data[districtName.toUpperCase()] : districtName
  }

  findAllMatches(districtName = '') {
    const matchedDistrictsArray = Object.keys(this.data).filter((district) => district.includes(districtName.toUpperCase()))

    const matchesArray = matchedDistrictsArray.map((districtKey) =>
      this.data[districtKey]
    )

    return matchesArray
  }

  findAverage(district) {
    const { data } = this.findByName(district)
    const yearDataKeys = Object.keys(data)
    const sumOfYearData = yearDataKeys.reduce((sum, year) => {
      sum += data[year]
      return sum
    }, 0)
    const average = Math.round((sumOfYearData / yearDataKeys.length) * 1000) / 1000

    return average
  }

  compareDistrictAverages(district1, district2) {
    const d1Average = this.findAverage(district1)
    const d2Average = this.findAverage(district2)
    const comparedAverage = Math.round((d1Average / d2Average) * 1000) / 1000

    const result = {
      [district1.toUpperCase()]: d1Average,
      [district2.toUpperCase()]: d2Average,
      'compared': comparedAverage
    }
    return result
  }

}
