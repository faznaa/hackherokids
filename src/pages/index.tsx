import { useRouter } from "next/router";
import React from "react";

export default function Main() {
  const { query } = useRouter();
  const flowers_code = `import turtle

t = turtle.Turtle()
petals = 6
angle = 360/petals

for i in range(petals):  #
    t.circle(50)
    t.right(angle) 

turtle.done()`;

  const calculatorCode = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Calculator</title>
    <link rel="stylesheet" href="./style.css" />
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

      * {
        margin: 0;
        padding: 0;
        user-select: 0;
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
      }
      body {
        display: grid;
        place-items: center;
      }
      .calculator {
        width: 330px;
        background: #dde1e7;
        padding: 40px 30px;
        border-radius: 10px;
        box-shadow: -3px -3px 7px #ffffff73,
          2px 2px 5px rgba(94, 104, 121, 0.288);
      }
      form .result {
        height: 60px;
        width: 100%;
        border-radius: 5px;
        box-shadow: inset -3px -3px 7px #ffffff73,
          inset 2px 2px 5px rgba(94, 104, 121, 0.288);
      }

      .result input {
        width: 100%;
        height: 100%;
        background: none;
        border: none;
        outline: none;
        font-size: 30px;
        padding: 0 20px;
        font-weight: 500;
        font-family: "Poppins", sans-serif;
        text-align: right;
        color: #595959;
        pointer-events: none;
      }

      form .buttons {
        text-align: center;
        padding: 30px 0 0 0;
      }

      .buttons input[type="button"] {
        height: 56px;
        width: 56px;
        font-size: 23px;
        margin: 4px;
        border: none;
        outline: none;
        background: #dde1e7;
        border-radius: 10px;
        box-shadow: -3px -3px 7px #ffffff73,
          2px 2px 5px rgba(94, 104, 121, 0.288);
        color: #595959;
      }

      .buttons input[type="button"]:focus {
        box-shadow: inset -3px -3px 7px #ffffff73,
          inset 2px 2px 5px rgba(94, 104, 121, 0.288);
        color: #3498db;
        transform: scale(0.9);
      }
    </style>
  </head>
  <body>
    <div class="calculator">
      <form action="#" name="form">
        <div class="result">
          <input type="text" name="display" id="dispaly" />
        </div>
        <div class="buttons">
          <div class="row">
            <input
              type="button"
              value="7"
              name="v7"
              onclick="buttonClick(v7.value)"
            />
            <input
              type="button"
              value="8"
              name="v8"
              onclick="buttonClick(v8.value)"
            />
            <input
              type="button"
              value="9"
              name="v9"
              onclick="buttonClick(v9.value)"
            />
            <input
              type="button"
              value="+"
              name="add"
              onclick="buttonClick(add.value)"
            />
          </div>
          <div class="row">
            <input
              type="button"
              value="4"
              name="v4"
              onclick="buttonClick(v4.value)"
            />
            <input
              type="button"
              value="5"
              name="v5"
              onclick="buttonClick(v5.value)"
            />
            <input
              type="button"
              value="6"
              name="v6"
              onclick="buttonClick(v6.value)"
            />
            <input
              type="button"
              value="-"
              name="sub"
              onclick="buttonClick(sub.value)"
            />
          </div>
          <div class="row">
            <input
              type="button"
              value="1"
              name="v1"
              onclick="buttonClick(v1.value)"
            />
            <input
              type="button"
              value="2"
              name="v2"
              onclick="buttonClick(v2.value)"
            />
            <input
              type="button"
              value="3"
              name="v3"
              onclick="buttonClick(v3.value)"
            />
            <input
              type="button"
              value="*"
              name="mul"
              onclick="buttonClick(mul.value)"
            />
          </div>
          <div class="row">
            <input
              type="button"
              value="0"
              name="v0"
              onclick="buttonClick(v0.value)"
            />
            <input
              type="button"
              value="."
              name="vdot"
              onclick="buttonClick(vdot.value)"
            />
            <input
              type="button"
              value="/"
              name="vdiv"
              onclick="buttonClick(vdiv.value)"
            />
            <input type="button" value="=" name="veql" onclick="calculate()" />
            <input
              type="button"
              value="Clear"
              name="vclear"
              onclick="clear()"
              style="width: 100%"
            />
          </div>
        </div>
      </form>
    </div>

    <script>
      function buttonClick(value) {
        form.display.value += value;
      }

      function calculate() {
        const input = form.display.value;

        if (input === "") {
          alert("Please enter a valid input.");
        } else {
          const [num1, operator, num2] = input.split("");
          const result = performOperation(
            parseFloat(num1),
            operator,
            parseFloat(num2)
          );
          form.display.value = result !== undefined ? result : "Error!";
        }
      }

      function clearDisplay() {
        form.display.value = "";
      }

      // Perform basic operations
      function performOperation(num1, operator, num2) {
        switch (operator) {
          case "+":
            return add(num1, num2);
          case "-":
            return subtract(num1, num2);
          case "*":
            return multiply(num1, num2);
          case "/":
            return divide(num1, num2);
          default:
            return undefined;
        }
      }

      // Add two numbers
      function add(a, b) {
        const result = 0;
        return result;
      }

      // Subtract two numbers
      function subtract(a, b) {
        const result = 0;
        return result;
      }

      // Multiply two numbers
      function multiply(a, b) {
        const result = 0;
        return result;
      }

      // Divide two numbers
      function divide(a, b) {
        if (b === 0) {
          alert("Division by zero is not allowed.");
          return undefined;
        }
        const result = 0;
        return result;
      }
    </script>
  </body>
</html>
`;
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };
  return (
    <div className="w-screen min-h-screen p-20 flex items-center">
      <div className="w-full rounded-2xl min-h-[50vh] h-full p-10 flex flex-col gap-3 items-center justify-center bg-gradient-to-b from-gray-700 to-gray-800">
        <h1 className="text-3xl font-bold text-white">
          Welcome to Hack Heroes
        </h1>
        <p className="text-white">Let's learn to code</p>
        <a
          href="https://studio.code.org/hoc/1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 rounded-md"
        >
          Angry Birds Game
        </a>
        <a
          href="https://trinket.io/turtle"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 rounded-md"
        >
          Turtle Coding
        </a>
        <button
          className="bg-white text-black p-4 rounded-md"
          onClick={() => copyToClipboard(flowers_code)}
        >
          Copy Flowers Code
        </button>
        <a
          href="https://www.w3schools.com/html/tryit.asp?filename=tryhtml_intro"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 rounded-md"
        >
          W3 Schools
        </a>
        {query?.q === "admin" && (
          <>
            <a
              href="/HACKHEROES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-4 rounded-md"
            >
              Slideshow PDF
            </a>
            <button
              className="bg-white text-black p-4 rounded-md"
              onClick={() => copyToClipboard(calculatorCode)}
            >
              Copy Calculator Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
