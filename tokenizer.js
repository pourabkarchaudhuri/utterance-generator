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
  },
    'RandomizedGenerator': function(passingjson, callback){
      //console.log("Test Sample : "+JSON.stringify(passingjson));
      var articles=[];
      var nouns=[];
      var lv=[];
      var adjectives=[];
      var keyword=[];

      for(var m=0;m<passingjson.length-1;m++){
        if(passingjson[m].subject_prefix!=""){
          articles.push(passingjson[m].subject_prefix);
        }
        if(passingjson[m].noun!=""){
          nouns.push(passingjson[m].noun);
        }
        if(passingjson[m].lv!=""){
          lv.push(passingjson[m].lv);
        }
        if(passingjson[m].adjective!=""){
          adjectives.push(passingjson[m].adjective);
        }
        if(passingjson[m].keyword!=""){
          keyword.push(passingjson[m].keyword);
        }
      }
      // console.log(articles);
      // console.log(nouns);
      // console.log(lv);
      // console.log(adjectives);
      // console.log(keyword);

      // var articles = "The,All of the,Most of the,Some of the,My,Your,His,Her,Their,Our,Everybody's,Almost all of the,That,I knew that the,We knew that the,She knew that the,He knew that the,They knew that the".split(",");
      // //The Subject Prefix Word
      // var nouns = "water".split(",");
      // //The Subject Word
      // var lv = "was,had been,will be,could be,might be,is,may be,shall be,would be,has been,".split(",");
      // //Tense Context
      // var adjectives = "pretty,extremely,awefully,severly,intricately,confusingly,truly,falsely".split(",");
      // //Adjectives
      // var keyword = "smelly".split(",");
      var x;

      //var ta = articles[Math.floor(Math.random() * articles.length)];
      //var tb = nouns[Math.floor(Math.random() * nouns.length)];
      console.log("\nAuthor : Pourab Karchaudhuri\n-----------------------------\n");
      var final;
      var n=28;

      var jsonify=[];
      var end = [];
      var afterGenerator=[];
      var complete ={
        "success":1,
        "results":{
          sentences : afterGenerator
        }
      }
      for (x = 0; x < n; x++) {
        var a = articles[Math.floor(Math.random() * articles.length)];
        var b = nouns[Math.floor(Math.random() * nouns.length)];
        var c = lv[Math.floor(Math.random() * lv.length)];
        var d = adjectives[Math.floor(Math.random() * adjectives.length)];
        var e = keyword[Math.floor(Math.random() * keyword.length)]
        final = a + " " + b + " " + c + " " + d;
        //console.log(final);
        jsonify.push(final);
      }
      //console.log(jsonify);
      global.jsonify = jsonify;
      //Now to put keyword synonyms

      var finalResult = wordnetEntry.wordSearch(e,function(finalResult){
          //console.log(finalResult);
          var successfactor = 1;
          finalResult.push(e);
          //var afterGenerator = [];
          //console.log("After Entry : "+global.jsonify);
          var sentenceCount = 0;
          console.log(global.jsonify.length+" sentences generated from input file");
          console.log(finalResult.length+" synonyms for '"+e+"' have been found");

          for(var i=0;i<global.jsonify.length;i++){
            //console.log("Current sentence : "+global.jsonify[i]);
            for(var j=0;j<finalResult.length;j++){
                //console.log("Special")
                var end = global.jsonify[i] + " " + finalResult[j];
                afterGenerator.push(end);
          }
        }
        //console.log("Generator Funtion Ended");
        //console.log(JSON.stringify(afterGenerator))
          //speechsynth=speechsynth+completeSentence[i];
          //var spacedWords = result.synonyms[i].replace(/_/g, " ");
          //console.log("Final : "+speechsynth);
          callback(complete);
      });



    }


}
