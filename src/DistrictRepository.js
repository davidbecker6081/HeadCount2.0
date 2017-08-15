export default class DistrictRepository {

  constructor(data) {
    this.data = this.removeDuplicates(data)

  }

  removeDuplicates(data) {
    const parsedData = data.reduce((newDataObj, dataObj, index) => {
      if(!newDataObj[dataObj['Location'].toUpperCase()]) {
        newDataObj[dataObj['Location'].toUpperCase()] = {
          location: dataObj['Location'].toUpperCase(),
          dataFormat: dataObj['DataFormat'],
          yearData: [ {year: dataObj['TimeFrame'], data: dataObj['Data']} ]
        }
      } else {
        let newYearDataArray = [...newDataObj[dataObj['Location'].toUpperCase()].yearData, {year: dataObj['TimeFrame'], data: dataObj['Data']}]

        newDataObj[dataObj['Location'].toUpperCase()].yearData = newYearDataArray
      }
      return newDataObj
    }, {})

    // console.log('parsedData', parsedData['COLORADO']);
    return parsedData
  }

  findByName(districtName) {
    const dataKeys = Object.keys(this.data);
    // console.log(dataKeys);
    const foundKey = dataKeys.find((key) => key === districtName.toUpperCase())
    console.log(foundKey);
    if(foundKey === undefined) {
      return undefined;
    } else {
      console.log(this.data[districtName.toUpperCase()].location);
      return this.data[districtName.toUpperCase()]
    }

  }

}
