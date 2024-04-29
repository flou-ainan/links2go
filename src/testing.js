const g = require("gzip-js")
const c = require("./helpers/utils")

let symbols = ""
c.symbols.forEach((symbol, index) => {
  index = index.toString().padStart(2,"0")
  symbols += index + ": " + symbol + " | "
  if ((parseInt(index)+1) % 5 == 0) symbols += "\n"
}) 

//console.log(symbols)

// TESTING BASE CONVERSION
/*
// FF AA B6 21 42

console.log(c.fromBase("FF AA B6 21 42", 16))
// 1.098.080.723.266

console.log(c.toBase("3.832", 16))
// EF8
console.log(c.toBase("1.098.080.723.266", 64))
// f!GJy52
console.log(c.toBase("1.098.080.723.266", 16))
// ffaab62142
console.log(c.toBase("1.098.080.723.266", 75))
// 6cSW0Yg
*/

// TESTING GZIP
const data = require("./helpers/testdata.json")
const { clear } = require("console")
/*
const data = require("./helpers/testdata.json")
const dataText = data.toString()
console.log(dataText)
console.log(dataText.length)

const ziped_data = g.zip(data)

const zip_hex_string = c.dataToHex(ziped_data, " ")
console.log(zip_hex_string)


const ready_to_URL_b64 = c.hexToB64(zip_hex_string)
console.log(ready_to_URL_b64)
console.log(c.fromBase(ready_to_URL_b64, 64))
*/

// TESTING THE ALGORITHM
const data2 = {
  id: '0001',
  type: 'donut',
  name: 'Cake',
  ppu: 0.55,
  batters: {
    batter: [
      { id: '1001', type: 'Regular' },
      { id: '1002', type: 'Chocolate' },
      { id: '1003', type: 'Blueberry' },
      { id: '1004', type: "Devil's Food" }
    ]
  },
  topping: [
    { id: '5001', type: 'None' },
    { id: '5002', type: 'Glazed' },
    { id: '5005', type: 'Sugar' },
    { id: '5007', type: 'Powdered Sugar' },
    { id: '5006', type: 'Chocolate with Sprinkles' },
    { id: '5003', type: 'Chocolate' },
    { id: '5004', type: 'Maple' }
  ]
}

let toUnzip
const zipDataToURL = (data) => {
  const ziped_data = g.zip(JSON.stringify(data))
  // console.log("ziped data: "+ziped_data.join(" "))
  const zip_hex_string = c.dataToHex(ziped_data, " ")
  toUnzip = zip_hex_string
  //console.log("ziped hex string: "+zip_hex_string)
  const ready_to_URL_b64 = c.hexToB64(zip_hex_string)
  //console.log(ready_to_URL_b64)
  return ready_to_URL_b64
}

const zipedURLtoData = (zipString) => {
  let result
  const zipHexdata = c.b64ToHex(zipString)
  result = zipHexdata
  return result
}
const fgGreen =  '\x1b[32m'
const bgGreen =  '\x1b[42m'
const reset = '\x1b[0m'
const bright = "\x1b[1m"
const log = (data, msg) => console.log(`-----\n${fgGreen+bright}${msg?msg:""}:     |      length: ${data.length}${reset} \n${data}\n-----`)

// console.log(data)
//console.log(zipToURL(data))

const URLzipedData = zipDataToURL("lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.")
//console.log("ziped data: "+URLzipedData)





// let toUnzipArray = toUnzip.split(" ").map((hex)=>c.fromBase(hex,16))
// let unzipedData = g.unzip(toUnzipArray)
// console.log("unziped data: "+unzipedData.join(" "))




// take any data and turns it into a string
// then into a ziped bytes array
// then into a ziped hex string
// then into a b64string
// then into a hex string again
// then into a ziped bytes array
// then unzip it again as a JSON stringfied object
// logs everything
const dataCompressionTest = (data) =>{ 
  const testData = JSON.stringify(data, null, "") 
  log(testData, "Test Data")

  const ziped = g.zip(testData, {level: 6})
  log(ziped, "Ziped Bytes Array")

  const hex = c.dataToHex(ziped)
  log(hex, "Hexadecimal String")

  const b64 = c.hexToB64(hex)
  log(b64, "Base 64 string")

  const hexFromB64 = c.b64ToHex(b64)
  log(hexFromB64, "Hex String from Base 64")

  const unhexed = c.hexToBytesArray(hex)
  log(unhexed, "Ziped Bytes Array from hex string")

  const unziped = g.unzip(unhexed)
  //log(unziped, "Unziped Data")

  let result = c.dataToString(unziped) 
  log(result, "Original Data")
  return result
}

const lorem = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

// console.log(data3)

//let result = dataCompressionTest(JSON.stringify(data))
// console.log(JSON.parse(result))


// fetch('https://dummyjson.com/products/')
// .then(res => res.json())
// .then(json => {
//   const data = json.products.slice(0,10)
//   log(data)
//   dataCompressionTest(JSON.stringify(data))
//   }
// )
   
// ------ String.fromCharCode --------
// const ziped = g.zip("123456789")
// let unziped = g.unzip(ziped)
// let result = ""
// unziped.forEach(charCode => result+= String.fromCharCode(charCode))

// ------- Zip and Unzip Test --------
const zipUnzipTest = () => {
  console.log("Ziped File: "+ ziped)
  console.log("Unziped file: " + unziped)
  console.log("Original: " + result)
}
//zipUnzipTest()

//  ------- Base conversion from docs -------
const baseConvDocs01 = () => {
  // -- Converting from decimal to hexadecimal --
  let decBytes = [245, 50, 151, 0]
  let hexBytes = decBytes.map(byte => c.toBase(byte, 16))
  console.log("Hex Array: " + hexBytes)
  
  // -- Turning into a string --
  // Fix paddin to 2 digits
  hexBytes = hexBytes.map(byte=>byte.padStart(2,"0"))
  console.log("Padded Hex Array: " + hexBytes)
  // Join
  let HexBytesString = hexBytes.join("")
  console.log("Hex String: " + HexBytesString)
}
//baseConvDocs01()

const baseConvDocs02 = () => {
  let HexBytesString = "f5329700"
  let result = c.hexToBytesArray(HexBytesString)
  console.log(result)
}
baseConvDocs02()
