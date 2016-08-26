var accumulator = "";
var reCalc = false;
var lastOption = 0;
var lastOperand = 0;

function insertNumber(number) {
  var displayContent = document.getElementById("display");
  if(displayContent.innerHTML.length<14) {
    if(lastWasOperator() || displayIsZero()) {
      displayContent.innerHTML = number;
    }
    else {
      displayContent.innerHTML += number;
    }
  }
  accumulator+=number;
}

function displayIsZero() {
  return document.getElementById("display").innerHTML==0;
}

function lastWasOperator() {
  return isNaN(accumulator.charAt(accumulator.length-1));
}

function computeOperation(optionNumber) {
  if(!isComputing()) {
    insertOperation(optionNumber);
  }
  else {
    if(!areNumbersSet) return;

    var n2 = Number(document.getElementById("display").innerHTML);
    var n1 = Number(accumulator.substring(0, (accumulator.length-1)-n2.toString().length));

    var thisOptionAux = optionNumber;
    if(lastOption!==0) {
      optionNumber=lastOption;
    }

    var res = doCalculation(n1,n2,optionNumber);
    document.getElementById("display").innerHTML = res;


    accumulator = res.toString();
    insertOperation(thisOptionAux);
  }
}

function areNumbersSet() {
  var str = accumulator.split(/[^0-9]/);
  if(str[1]=="") return false;
  return true;
}

function doCalculation(n1,n2,optionNumber){
  switch (optionNumber) {
    case 1: return n1+n2;
    case 2: return n1-n2;
    case 3: return n1*n2;
    case 4: return n1/n2;
  }
}

function insertOperation(optionNumber){
  switch (optionNumber) {
    case 1: accumulator+= "+"; break;
    case 2: accumulator+= "-"; break;
    case 3: accumulator+= "*"; break;
    case 4: accumulator+= "/"; break;
  }
  lastOption = optionNumber;
}

function isComputing() {
  for(var i=0;i<accumulator.length;i++)
    if(accumulator.charAt(i)<'0' || accumulator.charAt(i)>'9')
      return true;
  return false;
}

function calculatorClear(){
  document.getElementById("display").innerHTML = 0;
  accumulator = "";
  lastOption = 0;
}

function calculatorEquals() {
  computeOperation(lastOption);
}
