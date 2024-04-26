var symbols = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$@&_()*,+-=/".split("");

exports.symbols = symbols


exports.toBase = (num, base) => {
    num = parseInt(num.toString().replaceAll(".", "")); 
    let result = "";
    let slot = [num, num, []]
    
    if (num == 0) return num.toString()

    if (!base) throw new Error("Base is missing")
    if (!num && num != 0) throw new Error("Input number is missing")
    if (base > symbols.length || base <= 1) {
        throw new RangeError("Base must be less than "+symbols.length+" and greater than 1");
    }

    const convert = (slot) => {
        //console.log(slot)
        // atualiza dividendo  |  se na primeira rodada = proprio numero
        slot[0] = slot[1]
        // divide o valor pela base e reserva o radical
        slot[1] = Math.floor(slot[0] / base)
        // adiciona o resto ao numero convertido
        slot[2].unshift(slot[0] % base)
        // se restar algum valor repete o processo
        // console.log(slot[2])
        if(slot[1] != 0 ){convert(slot)}
        return slot
    }
    let hexs = convert(slot)[2]
    hexs.forEach(element => {
        result += symbols[element]
    });
    return result
}

exports.toBaseOld = function (num, base) {
    var decimal = num;
    var temp;
    var conversion = "";

    if (base > symbols.length || base <= 1) {
        throw new RangeError("Radix must be less than "+symbols.length+" and greater than 1");
    }

    while (decimal > 0) {
        temp = Math.floor(decimal / base);
        conversion = symbols[(decimal - (base * temp))] + conversion;
        decimal = temp;
    }

    return conversion;
};

exports.reverse = function reverse(str) {
    return str.split("").reverse().join("");
}


exports.fromBase = function(str, base) {
    var decimal = 0;
    var temp;
    

    if (base <= 36){
        str = str.toLowerCase();
    }
    var conversion = this.reverse(str.replaceAll(" ",""));

    if (base > symbols.length || base < 2 || !base) {
        throw new RangeError("Radix must be less than "+symbols.length+" and greater than 1");
    }

    var i = 0;

    while(conversion.length > 0) {
      temp = symbols.indexOf(conversion[0]);
      decimal += temp * Math.pow(base, i);
      conversion = conversion.slice(1);

      i++;
    }

    return decimal;
};



// specific funtions for working with gzip

exports.dataToHex = (data, separator) => {
    if (!separator) separator = ""
    let result = ""
   // console.log(data)
    data.forEach((byte, index) => {
        if(!byte) byte = 0
        //byte = byte.toString().padStart(3, "0")
        //console.log(index+" -> "+byte)
        result += this.toBase(byte, 16).padStart(2, '0')+separator
    })
    if (result.at(-1) == separator) result = result.slice(0,-1) // crop end
    return result
}
/*
exports.hexToB64 = (hex, separator) => {
    if (!separator) separator = " "
    hex = hex.replaceAll(separator,"")
    let result = ""
    //hex.length % 3
    for(let i=0; i < hex.length;i+=3){
        result += hex.slice(i,i+3) + separator
    }
    if (result.at(-1) == separator) result = result.slice(0,-1)
    
    console.log(result)
    let aux_array = result.split(" ")
    console.log(aux_array)
    result = ""
    aux_array.forEach((item)=>{
        if(!item) item = 0
        console.log(item)
        hexItem = this.toBase(item,16)
        result += this.toBase(hexItem, 64)
    })
    // this.toBase(byte,16).padStart(2, '0')+separator
    return result
}*/
    
// recieve a hex string and return a b64 string
// hex: the string input
// separator: needed if the hex string is already separated like "b5-67-ff" or "b5,67,ff"
// NOTE that this function is intended to work with non separated hex strings
// like "b567ff" and separate it on pairs to form bytes. But it supports strings
// already separated just for convenience
exports.hexToB64 = (hex, separator) => {
    // if ist separated in spaces "separator" can be ommited
    if (!separator) separator = " "
    // join everything // in case its not already joined
    hex = hex.replaceAll(separator,"")
    
    
    // reversed for compatibility when counting zeros on the end of the file
    //hex = this.reverse(hex)
    let result = ""
    // separate the values on trios
    for(let i=0; i < hex.length;i+=3){
        result += hex.slice(i,i+3) + separator
    }
    // cut the saparator atached to the end
    if (result.at(-1) == separator) result = result.slice(0,-1)
    //console.log("rearanged hex: "+this.reverse(result))
    // create an array of hex trios (it can have a unique less than 3 digits in the end)
    let aux_array = result.split(" ")

    // take the hex trios array and return
    // an array of  4096 bits sets represented in
    // b64 pairs
    result = []
    aux_array.forEach((item)=>{
        // convert item from hex trio to decimal
        const decItem = this.fromBase(item,16)
        // convert each decItem into a b64 item with 2 digits
        const b64Item = this.toBase(decItem, 64).padStart(2, "0")
        // adds the item to the result array
        result.push(b64Item)
    })
    //result.reverse()
    result = result.join("") // <- REMOVE THIS SPACE
    //console.log(result.length)
    // this.toBase(byte,16).padStart(2, '0')+separator
    return result
}

exports.b64ToHex = (b64, separator) =>{
    // if its separated in spaces "separator" can be ommited
    if (!separator) separator = " "
    // join everything
    b64 = b64.replaceAll(separator,"")
  
    let result = ""
    // separate the values on duos
    for(let i=0; i < b64.length;i+=2){
        result += b64.slice(i,i+2) + separator
    }
    // removes the separator atached to the end
    if (result.at(-1) == separator) result = result.slice(0,-1)
    result = result.split(" ")
    // converts b64 duos into hex trios
    result = result.map((duo)=>{
        const decimal = this.fromBase(duo, 64)
        return this.toBase(decimal, 16).padStart(3, "0")
    })
    //flat the array into a hex string
    result = result.join("")
    return result
}


exports.dataToString = (unziped) => {
    let result = ""
    unziped.forEach(char => result += String.fromCharCode(char))
    return result
  }

// takes a hex string and return a bytes array
exports.hexToBytesArray = (hexString) =>{
    let result = ""
    const separator = " "
    // separate hex string on pairs
    for(let i=0; i < hexString.length;i+=2){
        result += hexString.slice(i,i+2) + separator
    }
    // removes useless separator in the end
    result = result.slice(0,-1)
    // turn string into array of hex bytes
    result = result.split(" ")
    //converts back each hex byte to decimal
    result = result.map(hexByte => this.fromBase(hexByte, 16))
    return result
}