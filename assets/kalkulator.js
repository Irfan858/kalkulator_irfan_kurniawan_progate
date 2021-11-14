const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

//Fungsi Untuk Refresh Display Kalkulator
function updateDisplay() {
  document.querySelector("#displayNumber").innerHTML = calculator.displayNumber;
}

//Fungsi Untuk Menjalankan Tombol CE
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

//Fungsi Untuk Menampilkan Digit Angka Yang Di Inputkan
function inputDigit(digit) {
  if (
    calculator.waitingForSecondNumber &&
    calculator.firstNumber === calculator.displayNumber
  ) {
    calculator.displayNumber = digit;
  } else {
    if (calculator.displayNumber === "0") {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

//Fungsi Untuk Menjalankan tombol +/-
function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
  } else {
    alert("Operator Sudah Ditetapkan");
  }
}

//Fungsi Untuk Menjalankan Tombol =
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda Belum menetapkan Operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }
  //Objek Yang akan Dikirimkan Sebagai Argumen Fungsi putHistory()

  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  //Mendapatkan Objek Element Yang di Klik
  button.addEventListener("click", function (event) {
    const target = event.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
