var natural = require('natural');

module.exports = {

'wordSearch': function(search, callback) {
      var wordnet = new natural.WordNet();
      var synonymList=[];
      wordnet.lookup(search, function(results) {
          results.forEach(function(result) {
              //console.log('------------------------------------');
              for(var i=0;i<result.synonyms.length;i++){

                      if(result.synonyms[i]!=search){
                          var spacedWords = result.synonyms[i].replace(/_/g, " ");
                          synonymList.push(spacedWords);
                      }
              }
              //console.log(result.synsetOffset);
              //console.log(result.pos);
              //console.log(result.lemma);
              //if(result.synonyms.length)
              //console.log(result.synonyms);
              //console.log(result.pos);
             // console.log(result.gloss);
          });
          //console.log("Synonyms Inside Search : "+synonymList);
          callback(synonymList);
      });
    }
}
