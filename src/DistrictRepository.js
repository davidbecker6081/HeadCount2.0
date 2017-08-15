export default class DistrictRepository {

  constructor(data) {
    this.data = this.removeDuplicates(data)

  }

  removeDuplicates(data) {
    const parsedData = data.reduce((newDataObj, dataObj, index) => {
      if(!newDataObj[dataObj['Location']]) {
        newDataObj[dataObj['Location']] = {
          location: dataObj['Location'],
          dataFormat: dataObj['DataFormat'],
          yearData: [ {year: dataObj['Timeframe'], data: dataObj['Data']} ]
        }
      } else {
        let newYearDataArray = [...newDataObj[dataObj['Location']].yearData, {year: dataObj['Timeframe'], data: dataObj['Data']}]

        newDataObj[dataObj['Location']].yearData = newYearDataArray
      }
      return newDataObj
    }, {})

    console.log('parsedData', parsedData);
    return parsedData
  }

}
