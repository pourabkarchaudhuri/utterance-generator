var tokenizer = require('./tokenizer');
const csvFilePath="./input.csv"
var fs = require('fs')
var json2csv = require('json2csv');

var jsonInput;
var jsonOutput=[];
var passingjson;
const csv=require('csvtojson')
function csvjson(callback){
csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
  //console.log(jsonObj);
  jsonInput=jsonObj
  jsonOutput.push(jsonInput);
    // combine csv header row and csv line to a json object
    // jsonObj.a ==> 1 or 4
})
.on('done',(error)=>{
    //console.log('Finished reading csv'+JSON.stringify(jsonOutput));
    callback(jsonInput);

})
}

csvjson(function(jsonInput){

 jsonOutput.push(jsonInput);
 //console.log("Final Output : "+JSON.stringify(jsonOutput));
 passingjson=jsonOutput;
   var endResultRandom = tokenizer.RandomizedGenerator(passingjson,function(complete){
     //  console.log("End JSON : "+successfactor);
       //console.log("Final List : "+JSON.stringify(complete));

       var outwrite = complete.results.sentences;
       var count = complete.results.sentences.length;
        console.log("\n\nTotal "+count+" Utterances Generated");
       var heading = "Total " + count + " Utterances Generated" + "\r\n" + "-------------------------------------" + "\r\n";
       fs.writeFile('out.txt', heading, function (err) {
        for(var k=0;k<complete.results.sentences.length;k++){

          fs.appendFile('out.txt', outwrite[k]+"\r\n", function (err) {
            if (err) {
              console.log("Append Failed");
            } else {
              //console.log("Printed to txt file");
            }
        })
      }
      console.log("Printed to 'out.txt' in the Project Directory");
    })

    var fields = ['Utterances'];
    var myData = complete.results.sentences;
    var importData=[];
    for(var z=0;z<myData.length;z++){
      importData.push({'Utterances':myData[z]});
    }
    var csv = json2csv({ data: importData, fields: fields });

    fs.writeFile('out.csv', csv, function(err) {
      if (err) throw err;
    console.log("Printed to 'out.csv' in the Project Directory");
    });


     //  console.log("No of Sentences : "+sentenceCount);
   });
  //SEND JSON TO YOUR API.AI CALL PROCESSOR
});

//console.log("READ : "+JSON.stringify(global.passingjson));

//console.log("Obtained JSON from CSV : "+JSON.stringify(jsonInput));

// var testString = "I want to travel to Delhi";
// console.log("Input String : "+testString);


// var endResultRandom = tokenizer.RandomizedGenerator(testString,function(complete){
//   //  console.log("End JSON : "+successfactor);
//     console.log("Final List : "+JSON.stringify(complete));
//   //  console.log("No of Sentences : "+sentenceCount);
// });
//---------------------------------------------------------------------------------
// var testString = "I want to travel to Delhi";
// console.log("Input String : "+testString);
//
// var endResult = tokenizer.stringTokenizer(testString,function(generatedListComplete){
//     console.log("End JSON : "+JSON.stringify(generatedListComplete));
// });
//---------------------------------------------------------------------------------
