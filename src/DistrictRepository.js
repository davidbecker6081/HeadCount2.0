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

}
