

    function getHistory() {
      return document.getElementById("history-value");
    }
    function printHistory(num) {
      document.getElementById("history-value").innerText = num;
    }
    function getOutput() {
      return document.getElementById("output-value").innerText;
    }
    function printOutput(num) {
      document.getElementById("output-value").innerText = num;
    }
    var operators = ["%", "/", "+", "-", "*"];
    var f = false;
    var numberButtons = document.getElementsByClassName("number");
    
    for (var i = 0; i < numberButtons.length; i++) {
      numberButtons[i].addEventListener("click", function () {
        if (this.id == "clear") {
          printHistory("");
          printOutput("");
        } else if (this.id == "backspace") {
          var output = getOutput();
          if (output) {
            output = output.substring(0, output.length - 1);
            printOutput(output);
          }
        } else if (this.id == "=") {
          var output = getOutput();
          if (output == "NaN" || output == "" || f) {
            f = false;
            printOutput("");
            printHistory("");
          } else {
            try {
              var result = evaluateExpression(output);
              if (result == undefined) {
                result = "NaN";
                output = "";
              }
              f = true;
              printOutput(result);
              printHistory(output);
            } catch (error) {
              result = "NaN";
              output = "";
              f = true;
              printOutput(result);
              printHistory(output);
            }
          }
        } else {
          var output = getOutput().toString();
          if (output.length == 0 && operators.includes(this.id)) {
            printOutput("");
            printHistory("");
            f = false;
          } else {
            if (f || output == "NaN") {
              if (!operators.includes(this.id)) {
                output = this.id;
                printHistory("");
              } else {
                output = output + this.id.toString();
              }
              f = false;
            } else {
              output = output + this.id.toString();
            }
            printOutput(output);
          }
        }
      });
    }
    
    function evaluateExpression(expr) {
      var stack = [];
      var num = 0;
      var sign = 1;
      var result = 0;
      var op = '';
    
      for (var i = 0; i < expr.length; i++) {
        var ch = expr[i];
    
        if (ch >= '0' && ch <= '9') {
          num = num * 10 + (ch - '0');
        } else if (operators.includes(ch)) {
          if (op) {
            result = calculate(result, num, op);
            op = '';
          } else {
            result = num;
          }
          op = ch;
          num = 0;
        }
      }
    
      if (op) {
        result = calculate(result, num, op);
      } else {
        result = num;
      }
    
      return result;
    }
    
    function calculate(a, b, op) {
      switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return a % b;
      }
    }
    