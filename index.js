var tokenizer = require('./tokenizer');
const csvFilePath="./input.csv"

var jsonInput;
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
  console.log(jsonObj);
  jsonInput=jsonObj
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
})
.on('done',(error)=>{
    console.log('Finished reading csv');
})
console.log("Obtained JSON from CSV : "+jsonInput);
var testString = "I want to travel to Delhi";
console.log("Input String : "+testString);

var endResult = tokenizer.stringTokenizer(testString,function(generatedListComplete){
    console.log("End JSON : "+JSON.stringify(generatedListComplete));
});
