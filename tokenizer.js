var pos = require('pos');
var natural = require('natural');

var wordnetEntry = require('./wordnetspace');

module.exports={

      'stringTokenizer': function(testString, callback){

      var wordBreakdown = new natural.WordTokenizer();
      wordBreakdown = wordBreakdown.tokenize(testString);

      //console.log(wordBreakdown);
      var wordLength=wordBreakdown.length;
      console.log("No. of Words : "+wordLength);
      //NO OF TOKENIZED WORDS

      var buildBody={
        "grammar":{
          "partsOfSpeech":[

          ]
        }
      };

      var lexer = new pos.Lexer();
      var tagger = new pos.Tagger();
      var start = new Date().getTime();
      var words = lexer.lex(testString);
      var tags = tagger.tag(words);
      var end = new Date().getTime();
      var difference = (end - start);
      var i;
      var noun=[];
      var properNoun=[];
      var conjunction=[];
      var number=[];
      var preposition=[];
      var adjective=[];
      var modal=[];
      var adverb=[];
      var verb=[];
      var pronoun=[];
      var completeSentence=[];
      var tokenRange=[];

      console.log("Tags : "+tags);


      for (i in tags) {
        var tag = tags[i];
        completeSentence.push(tag[0]);
        completeSentence=Array.from(new Set(completeSentence));

        tokenRange.push(tag[1]);
        tokenRange=Array.from(new Set(tokenRange));

       if(tag[1]=='NN'||tag[1]=='NNS'){
         //console.log(tag[0]);
         noun.push(tag[0]);
         noun=Array.from(new Set(noun));

       }//NOUN

       else if(tag[1]=='NNP'||tag[1]=='NNPS'){
         properNoun.push(tag[0]);
         properNoun=Array.from(new Set(properNoun));
       }//PROPER NOUN

       else if(tag[1]=='CC'){
         conjunction.push(tag[0]);
         conjunction=Array.from(new Set(conjunction));
       }//CONJUNCTIONS

       else if(tag[1]=='CD'||tag[1]=='LS'){
         number.push(tag[0]);
         number=Array.from(new Set(number));
       }//NUMBER

       else if(tag[1]=='JJ'||tag[1]=='JJR'||tag[1]=='JJS'){
         adjective.push(tag[0]);
         adjective=Array.from(new Set(adjective));
       }//ADJECTIVE

        else if(tag[1]=='IN'){
         preposition.push(tag[0]);
         preposition=Array.from(new Set(preposition));
       }//PREPOSITION

        else if(tag[1]=='MD'){
         modal.push(tag[0]);
         modal=Array.from(new Set(modal));
       }//MODAL

        else if(tag[1]=='RB'){
         adverb.push(tag[0]);
         adverb=Array.from(new Set(adverb));
       }//ADVERB

       else if(tag[1]=='VB'||tag[1]=='VBD'||tag[1]=='VBF'||tag[1]=='VBN'||tag[1]=='VBP'||tag[1]=='VBZ'){
         verb.push(tag[0]);
         verb=Array.from(new Set(verb));
       }//VERB

       else if(tag[1]=='PRP'){
         pronoun.push(tag[0]);
         pronoun=Array.from(new Set(pronoun));
       }//PRONOUN


        //console.log(tag[0] + " / " + tag[1]);

      }

      console.log("Tokenized and tagged " + words.length + " words in " + difference + " milliseconds");

      // console.log("Nouns : "+noun);
      // console.log("Proper Nouns : "+properNoun);
      // console.log("Conjunctions : "+conjunction);
      // console.log("Number : "+number);
      // console.log("Preposition : "+preposition);
      // console.log("Adjective : "+adjective);
      // console.log("Modal : "+modal);
      // console.log("Adverb : "+adverb);
      // console.log("Verb :"+verb);
      // console.log("Pronoun : "+pronoun);
      console.log(completeSentence);
      console.log(tokenRange);
      console.log("--------------------------");
      buildBody.grammar.partsOfSpeech.push({"noun":noun});
      buildBody.grammar.partsOfSpeech.push({"properNoun":properNoun});
      buildBody.grammar.partsOfSpeech.push({"conjunction":conjunction});
      buildBody.grammar.partsOfSpeech.push({"number":number});
      buildBody.grammar.partsOfSpeech.push({"preposition":preposition});
      buildBody.grammar.partsOfSpeech.push({"adjective":adjective});
      buildBody.grammar.partsOfSpeech.push({"modal":modal});
      buildBody.grammar.partsOfSpeech.push({"adverb":adverb});
      buildBody.grammar.partsOfSpeech.push({"verb":verb});
      buildBody.grammar.partsOfSpeech.push({"pronoun":pronoun});

      console.log(JSON.stringify(buildBody));
      //PARTS OF SPEECH JSON BUILDS
      console.log("------------------------------");


    var index = tokenRange.indexOf('NN');


    var wordnet = new natural.WordNet();

    var search=completeSentence[index];
    var generatedList=[];
    var generatedListComplete={
      "utterances":{
        "generated":generatedList
      }
    };
    var synonymList=[];

    var finalResult = wordnetEntry.wordSearch(search,function(finalResult){
        console.log(finalResult);



        for(var j=0;j<finalResult.length;j++){
        completeSentence[index]=finalResult[j];


        var speechsynth = completeSentence.join(" ");
        generatedList.push(speechsynth);
        //var resultObtained = speechsynth.replace(',',' ');
        console.log("Generated Utterances "+j+": "+speechsynth);
        }
        //speechsynth=speechsynth+completeSentence[i];
        //var spacedWords = result.synonyms[i].replace(/_/g, " ");
        //console.log("Final : "+speechsynth);
        callback(generatedListComplete);
    });
    //callback(generatedList);
  }

}
