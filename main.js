const keys = document.querySelectorAll(".key");
const historyDisplay = document.querySelector(".littleNumbers");
const display = document.querySelector(".value");
let history = "";
let value = "";
keys.forEach(key => {
  key.addEventListener("click", handleKeyClick);
});
const add = (x, y) => x + y;
const subt = (x, y) => x - y;
const mult = (x, y) => x * y;
const divide = (x, y) => x / y;
const mod = (x, y) => x % y;

const operate = (operator, n1, n2) => {
  switch (operator) {
    case "+":
      return add(n1, n2);
      break;
    case "-":
      return subt(n1, n2);
      break;
    case "*":
      return mult(n1, n2);
      break;
    case "/":
      return divide(n1, n2);
      break;
    case "%":
      return mod(n1, n2);
      break;
  }
};

function calculate(str) {
  let histArr = str.split(" ");

  let foundOper;
  let holdRes;
  if (history.length === 0 || isNaN(parseFloat(history[history.length - 1]))) {
    return;
  }
  let i = histArr.length;
  while (i > 1) {
    if (histArr.findIndex(item => item.match(/[\*%/]/)) != -1) {
      foundOper = histArr.findIndex(oper => oper.match(/[\*%/]/));
      if (histArr[foundOper] === "/" && histArr[foundOper + 1] == 0) {
        alert("You can't divide by zero!");
        return;
      }
      holdRes = operate(
        histArr[foundOper],
        parseFloat(histArr[foundOper - 1]),
        parseFloat(histArr[foundOper + 1])
      );
      console.log(holdRes);
      histArr.splice(foundOper - 1, 3, holdRes);
    } else if (histArr.findIndex(item => item.match(/[\-\+]/)) != -1) {
      foundOper = histArr.findIndex(oper => oper.match(/[\-\+]/));
      holdRes = operate(
        histArr[foundOper],
        parseFloat(histArr[foundOper - 1]),
        parseFloat(histArr[foundOper + 1])
      );
      console.log(holdRes);
      histArr.splice(foundOper - 1, 3, holdRes);
    }
    i = histArr.length;
  }

  histArr[0] = +parseFloat(histArr[0]).toFixed(4);
  history = histArr[0].toString();
  value = histArr[0].toString();
  historyDisplay.innerHTML = history;
  display.innerHTML = value;
}

function checkOperator() {
  if (
    history[history.length - 2] === "/" ||
    history[history.length - 2] === "*" ||
    history[history.length - 2] === "+" ||
    (history[history.length - 2] === "-" &&
      !Number.isInteger(parseInt(history[history.length - 1]))) ||
    history[history.length - 2] === "%" ||
    history === ""
  ) {
    return true;
  }

  return false;
}

function addToHistory(val) {
  history += ` ${val} `;
  historyDisplay.innerHTML = history;
  value = "";
  display.innerHTML = "";
}

function handleInput(val) {
  if (checkOperator()) {
    return;
  } else {
    addToHistory(val);
  }
}

function handleKeyClick(e) {
  let keyVal = e.target.innerHTML;
  if (display.textContent.length > 20) alert("Input too long");
  switch (keyVal) {
    case "CE":
      display.innerHTML = "";
      historyDisplay.innerHTML = "";
      value = "";
      history = "";

      break;
    case "⌫":
      if (!value) {
        break;
      } else {
        let valArr = value.split("");
        valArr.pop();
        value = valArr.join("");
        let histArr = history.split("");
        histArr.pop();
        history = histArr.join("");
        historyDisplay.innerHTML = history;
        display.innerHTML = value;
      }
      break;
    case "*":
      handleInput("*");
      break;

    case "/":
      handleInput("/");
      break;
    case "+":
      handleInput("+");
      break;
    case "-":
      handleInput("-");
      break;
    case "%":
      handleInput("%");
      break;
    case ".":
      let n = value.includes(".");
      if (n) {
        break;
      } else {
        value += keyVal;
        history += keyVal;
        historyDisplay.innerHTML = history;
        display.innerHTML = value;
      }
      break;
    case "+/-":
      let arr = value.split("");
      let histArr = history.split(" ");
      if (arr[0] === "-") {
        arr.shift();
        value = arr.join("");
        display.innerHTML = value;
        histArr.splice(histArr.length - 1, 1, value);
        history = histArr.join(" ");
        historyDisplay.innerHTML = history;
      } else {
        arr.unshift("-");
        value = arr.join("");
        display.innerHTML = value;
        histArr.splice(histArr.length - 1, 1, value);
        history = histArr.join(" ");
        historyDisplay.innerHTML = history;
      }
      break;
    case "=":
      calculate(history);
      break;
    default:
      value += keyVal;
      history += keyVal;
      historyDisplay.innerHTML = history;
      display.innerHTML = value;
      break;
  }
}

document.addEventListener("keydown", function(event) {
  let char = event.key;
  let regAll = /[0-9+\-*/.]/;
  let regOp = /[+\-*/.]/;

  if (display.textContent.length > 20) alert("Input too long");
  else if (regAll.test(char)) {
    if (display.innerHTML.length == "") {
      value += char.toString();
      display.innerHTML = value;
      history += char.toString();
      historyDisplay.innerHTML = history;
    } else {
      if (regOp.test(char)) {
        if (display.innerHTML == "") {
          return;
        }
        display.innerHTML = "";
        history += ` ${char.toString()} `;
        historyDisplay.innerHTML = history;
        value = "";
      } else {
        value += char.toString();
        display.innerHTML = value;
        history += `${char.toString()}`;
        historyDisplay.innerHTML = history;
      }
    }
  } else if ((char == "Enter" || char == "=") && history != "") {
    calculate(history);
  } else if (char == "Backspace") {
    if (!value) {
      return;
    } else {
      let valArr = value.split("");
      valArr.pop();
      value = valArr.join("");
      let histArr = history.split("");
      histArr.pop();
      history = histArr.join("");
      historyDisplay.innerHTML = history;
      display.innerHTML = value;
    }
  }
});
