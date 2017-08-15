(function() {
  "use strict";
  
  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv, pathInput;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    pathInput = document.getElementById("path_input");
    var setPathInputButton = document.getElementById("set_path_input");

    //queryInput.addEventListener("keydown", queryInputKeyDown);
    setPathInputButton.addEventListener("click", setInputPath);
  }

  function setInputPath() {
    document.getElementById("placeholder").style.display = "none";
    document.getElementById("main-wrapper").style.display = "block";
    console.log("Path Input for CSV : "+pathInput.value);
    window.init(pathInput.value);
  }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }

    var value = queryInput.value;
    queryInput.value = "";

    createQueryNode(value);
    var responseNode = createResponseNode();

    sendText(value)
      .then(function(response) {
        var result;
        try {
          result = "response.result.fulfillment.speech"
        } catch(error) {
          result = "";
        }
        setResponseJSON(response);
        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseJSON(err);
        setResponseOnNode("Something goes wrong", responseNode);
      });
  }

  function createQueryNode(query) {
    var node = document.createElement('div');
    node.className = "clearfix left-align left card-panel green accent-1";
    node.innerHTML = query;
    resultDiv.appendChild(node);
  }

  function createResponseNode() {
    var node = document.createElement('div');
    node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;
  }

  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
  }

  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    console.log("respond");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

  function sendRequest() {

  }

})();
