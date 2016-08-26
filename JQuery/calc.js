$(document).ready(function() {

  var accumulator;
  var n1;
  var n2;
  var lastOperator;
  var lastOperand;
  var pressedEquals;

  function initializeVariables() {
    accumulator = "";
    n1 = undefined;
    n2 = undefined;
    lastOperator = undefined;
    lastOperand = undefined;
    pressedEquals = false;
  }

  initializeVariables();

  $(".display").html("0");

  $('.digit').click(function(){ insertNumber($(this).text()) });

  $('.btnAdd').click(function(){ computeOperation('add'); });
  $('.btnSub').click(function(){ computeOperation('sub'); });
  $('.btnMul').click(function(){ computeOperation('mul'); });
  $('.btnDiv').click(function(){ computeOperation('div'); });

  $('.btnClr').click(function(){ calculatorClear(); });
  $('.btnEqu').click(function(){ calculatorEquals(); });

  function insertNumber(number) {
    var displayContent = $(".display").text();
    if(displayContent.length<14) {
    if(wasLastOperator() || isDisplayZero())
      $(".display").html(number);
    else
      $(".display").html(displayContent+number);
    }
    accumulator+=number;
  }

  function isDisplayZero() {
    return $(".display").text()==0;
  }

  function wasLastOperator() {
    var lastInputChar = accumulator.charAt(accumulator.length-1)
    return isNaN(lastInputChar);
  }

  function computeOperation(operation) {
    if(!isAlreadyComputing()) {
      insertOperation(operation);
      return;
    }

    if(!areNumbersAccumulated()) {
      accumulator = accumulator.substring(0,accumulator.length-1);
    }
    else {
      result = calculate(lastOperator);
      displayResult(result);
      accumulator = result.toString();
    }
    insertOperation(operation);
    pressedEquals = false;
  }

  function repeatComputeOperation() {
    if(!isAlreadyComputing()) return;

    var nextResult = reCalculate(lastOperator);
    displayResult(nextResult);
    accumulator = nextResult.toString();
    insertOperation(lastOperator);
  }

  function isAlreadyComputing() {
    for(var i=0;i<accumulator.length;i++)
      if(accumulator.charAt(i)<'0' || accumulator.charAt(i)>'9')
        return true;
    return false;
  }

  function areNumbersAccumulated() {
    var str = accumulator.split(/[^0-9]/);
    if(str[1]=="") return false;
    return true;
  }

  function getFirstNumber(){
    return parseFloat(accumulator.substring(0,accumulator.length-1));
  }

  function getSecondNumber() {
    return parseFloat($(".display").text());
  }

  function insertOperation(operation){
    lastOperator = operation;
    switch (operation) {
      case "add": accumulator+= "+"; break;
      case "sub": accumulator+= "-"; break;
      case "mul": accumulator+= "*"; break;
      case "div": accumulator+= "/"; break;
    }
    n1 = getFirstNumber();
  }

  function calculate(operation) {
    n2 = getSecondNumber();
    lastOperand = n2;
    switch (operation) {
      case "add": return n1+n2;
      case "sub": return n1-n2;
      case "mul": return n1*n2;
      case "div": return n1/n2;
    }
  }

  function reCalculate() {
    n2 = getSecondNumber();
    switch (lastOperator) {
      case "add": return n2+lastOperand;
      case "sub": return n2-lastOperand;
      case "mul": return n2*lastOperand;
      case "div": return n2/lastOperand;
    }
  }

  function calculatorClear() {
    $(".display").html("0");
    initializeVariables();
  }

  function calculatorEquals() {
    if(!pressedEquals) {
      computeOperation(lastOperator);
      pressedEquals = true;
    }
    else if(isSetLastOperation())
      repeatComputeOperation();
  }

  function displayResult(result) {
    var finalResult = parseFloat(result.toString().substring(0,14));
    $(".display").html(finalResult);
  }

  function isSetLastOperation() {
    return isDefinedlastOperator() && isDefinedLastOperand();
  }

  function isDefinedlastOperator() {
    return (lastOperator != undefined);
  }

  function isDefinedLastOperand() {
    return (lastOperand != undefined);
  }
});
