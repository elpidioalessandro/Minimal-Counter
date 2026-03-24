let count = parseInt(localStorage.getItem("count")) || 0;
let step = parseInt(localStorage.getItem("step")) || 1;


let pressTimeout = null;
let pressInterval = null;


const app = document.createElement("div");
app.className = "app";


const topBar = document.createElement("div");
topBar.className = "top-bar";

const resetBtn = document.createElement("button");
resetBtn.className = "icon-btn";
resetBtn.innerHTML = "&#10227;";

topBar.appendChild(resetBtn);


const main = document.createElement("main");
main.className = "main";


const decrementBtn = document.createElement("button");
decrementBtn.className = "side-btn left";
decrementBtn.textContent = "−";


const display = document.createElement("div");
display.className = "display";


const incrementBtn = document.createElement("button");
incrementBtn.className = "side-btn right";
incrementBtn.textContent = "+";


const footer = document.createElement("div");
footer.className = "footer";


const smallValue = document.createElement("div");
smallValue.className = "small-value";


const stepWrapper = document.createElement("div");
stepWrapper.className = "step-wrapper";

const minusStepBtn = document.createElement("button");
minusStepBtn.className = "step-btn";
minusStepBtn.textContent = "−";

const stepValue = document.createElement("span");
stepValue.className = "step-value";

const plusStepBtn = document.createElement("button");
plusStepBtn.className = "step-btn";
plusStepBtn.textContent = "+";


stepWrapper.appendChild(minusStepBtn);
stepWrapper.appendChild(stepValue);
stepWrapper.appendChild(plusStepBtn);


footer.appendChild(smallValue);
footer.appendChild(stepWrapper);


main.appendChild(decrementBtn);
main.appendChild(display);
main.appendChild(incrementBtn);


app.appendChild(topBar);
app.appendChild(main);
app.appendChild(footer);


document.body.appendChild(app);

const style = document.createElement("style");
style.textContent = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    background: #050505;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    overflow: hidden;
  }

  .app {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 80px 1fr 130px;
    padding: 20px 24px 28px;
  }

  .top-bar {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .icon-btn {
    width: 42px;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .icon-btn:active {
    transform: scale(0.95);
  }

  .main {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .display {
    font-size: clamp(140px, 28vw, 320px);
    line-height: 0.9;
    font-weight: 300;
    letter-spacing: -6px;
    color: #f5f5f5;
    text-align: center;
    user-select: none;
    transition: transform 0.15s ease;
  }

  .display.pop {
    transform: scale(1.06);
  }

  .side-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 42px;
    font-weight: 300;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .side-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .side-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }

  .small-value {
    font-size: 26px;
    color: rgba(255, 255, 255, 0.88);
    letter-spacing: 0.5px;
  }

  .step-wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .step-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(255, 255, 255, 0.03);
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease, background 0.2s ease, border-color 0.2s ease;
  }

  .step-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .step-btn:active {
    transform: scale(0.93);
  }

  .step-value {
    min-width: 32px;
    text-align: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.72);
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    .app {
      grid-template-rows: 70px 1fr 120px;
      padding: 16px;
    }

    .display {
      font-size: clamp(100px, 24vw, 180px);
      letter-spacing: -3px;
    }

    .side-btn {
      width: 56px;
      height: 56px;
      font-size: 34px;
    }

    .small-value {
      font-size: 22px;
    }

    .step-btn {
      width: 34px;
      height: 34px;
      font-size: 16px;
    }
  }
`;
document.head.appendChild(style);


function saveState() {
  localStorage.setItem("count", count);
  localStorage.setItem("step", step);
}

function animateDisplay() {
  display.classList.remove("pop");
  void display.offsetWidth;
  display.classList.add("pop");
}

function updateDisplay() {
  display.textContent = count;
  smallValue.textContent = count;
  stepValue.textContent = `step ${step}`;
  saveState();
  animateDisplay();
}

function increment() {
  count += step;
  updateDisplay();
}

function decrement() {
  count -= step;
  updateDisplay();
}

function resetCounter() {
  count = 0;
  updateDisplay();
}

function increaseStep() {
  step++;
  updateDisplay();
}

function decreaseStep() {
  if (step > 1) {
    step--;
    updateDisplay();
  }
}


function startLongPress(action) {
  action();

  clearTimeout(pressTimeout);
  clearInterval(pressInterval);

  pressTimeout = setTimeout(() => {
    pressInterval = setInterval(action, 120);
  }, 300);
}

function stopLongPress() {
  clearTimeout(pressTimeout);
  clearInterval(pressInterval);
  pressTimeout = null;
  pressInterval = null;
}


incrementBtn.addEventListener("mousedown", () => startLongPress(increment));
decrementBtn.addEventListener("mousedown", () => startLongPress(decrement));

incrementBtn.addEventListener("mouseup", stopLongPress);
decrementBtn.addEventListener("mouseup", stopLongPress);

incrementBtn.addEventListener("mouseleave", stopLongPress);
decrementBtn.addEventListener("mouseleave", stopLongPress);


incrementBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startLongPress(increment);
});

decrementBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startLongPress(decrement);
});

incrementBtn.addEventListener("touchend", stopLongPress);
decrementBtn.addEventListener("touchend", stopLongPress);


resetBtn.addEventListener("click", resetCounter);


plusStepBtn.addEventListener("click", increaseStep);
minusStepBtn.addEventListener("click", decreaseStep);


document.addEventListener("keydown", (e) => {
  if (e.key === "+" || e.key === "=") {
    increment();
  }

  if (e.key === "-") {
    decrement();
  }

  if (e.key.toLowerCase() === "r") {
    resetCounter();
  }
});


updateDisplay();