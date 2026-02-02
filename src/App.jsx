import { useEffect, useMemo, useState } from "react";
import "./App.css";

const BUTTONS = [
  [
    { label: "AC", type: "function", action: "clear" },
    { label: "+/-", type: "function", action: "toggleSign" },
    { label: "%", type: "function", action: "percent" },
    { label: "÷", type: "operator", action: "operator", value: "/" },
  ],
  [
    { label: "7", type: "number", action: "digit" },
    { label: "8", type: "number", action: "digit" },
    { label: "9", type: "number", action: "digit" },
    { label: "×", type: "operator", action: "operator", value: "*" },
  ],
  [
    { label: "4", type: "number", action: "digit" },
    { label: "5", type: "number", action: "digit" },
    { label: "6", type: "number", action: "digit" },
    { label: "−", type: "operator", action: "operator", value: "-" },
  ],
  [
    { label: "1", type: "number", action: "digit" },
    { label: "2", type: "number", action: "digit" },
    { label: "3", type: "number", action: "digit" },
    { label: "+", type: "operator", action: "operator", value: "+" },
  ],
  [
    { label: "0", type: "number", action: "digit", wide: true },
    { label: ".", type: "number", action: "dot" },
    { label: "=", type: "operator", action: "equal", value: "=" },
  ],
];

const OPERATOR_LABELS = {
  "/": "÷",
  "*": "×",
  "-": "−",
  "+": "+",
};

const MAX_DISPLAY_LENGTH = 12;

const formatNumber = (value) => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return "Error";
  }

  const asString = value.toString();
  if (asString.length <= MAX_DISPLAY_LENGTH) return asString;

  return value.toExponential(6).replace("+", "");
};

const calculate = (left, right, operator) => {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return right === 0 ? NaN : left / right;
    default:
      return right;
  }
};

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForInput, setWaitingForInput] = useState(false);

  const isAllClear = display === "0" && previousValue === null && operator === null;

  const activeOperatorLabel = operator ? OPERATOR_LABELS[operator] : null;

  const handleDigit = (digit) => {
    if (waitingForInput) {
      setDisplay(digit);
      setWaitingForInput(false);
      return;
    }

    setDisplay((current) => (current === "0" ? digit : current + digit));
  };

  const handleDot = () => {
    if (waitingForInput) {
      setDisplay("0.");
      setWaitingForInput(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  };

  const handleClear = () => {
    if (isAllClear) {
      return;
    }

    if (display !== "0") {
      setDisplay("0");
      return;
    }

    setPreviousValue(null);
    setOperator(null);
    setWaitingForInput(false);
  };

  const handleToggleSign = () => {
    if (display === "0" || display === "Error") return;
    setDisplay((current) => (current.startsWith("-") ? current.slice(1) : `-${current}`));
  };

  const handlePercent = () => {
    if (display === "Error") return;
    const value = parseFloat(display);
    const result = value / 100;
    setDisplay(formatNumber(result));
  };

  const handleOperator = (nextOperator) => {
    if (display === "Error") {
      setDisplay("0");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForInput(false);
      return;
    }

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator && !waitingForInput) {
      const nextValue = calculate(previousValue, inputValue, operator);
      if (!Number.isFinite(nextValue)) {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForInput(true);
        return;
      }
      setPreviousValue(nextValue);
      setDisplay(formatNumber(nextValue));
    }

    setOperator(nextOperator);
    setWaitingForInput(true);
  };

  const handleEqual = () => {
    if (!operator) return;

    const inputValue = parseFloat(display);
    const nextValue = calculate(previousValue ?? 0, inputValue, operator);

    if (!Number.isFinite(nextValue)) {
      setDisplay("Error");
      setPreviousValue(null);
      setOperator(null);
      setWaitingForInput(true);
      return;
    }

    setDisplay(formatNumber(nextValue));
    setPreviousValue(null);
    setOperator(null);
    setWaitingForInput(true);
  };

  const buttonGrid = useMemo(() => BUTTONS, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key } = event;

      if (/[0-9]/.test(key)) {
        handleDigit(key);
        return;
      }

      if (key === ".") {
        handleDot();
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleEqual();
        return;
      }

      if (key === "Backspace") {
        handleClear();
        return;
      }

      if (["+", "-", "*", "/"].includes(key)) {
        handleOperator(key);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  });

  return (
    <div className="app-shell">
      <div className="calculator">
        <div className="calculator-top">
          <div className="calculator-display">
            <div className="operator-indicator">{activeOperatorLabel}</div>
            <div className="display-text">{display}</div>
          </div>
        </div>

        <div className="calculator-keys">
          {buttonGrid.flat().map((button) => {
            const isWide = button.wide ? "key--wide" : "";
            const isActive =
              button.type === "operator" &&
              operator &&
              button.value === operator &&
              waitingForInput;

            const label =
              button.action === "clear" ? (isAllClear ? "AC" : "C") : button.label;

            const onClick = () => {
              switch (button.action) {
                case "digit":
                  handleDigit(button.label);
                  break;
                case "dot":
                  handleDot();
                  break;
                case "clear":
                  handleClear();
                  break;
                case "toggleSign":
                  handleToggleSign();
                  break;
                case "percent":
                  handlePercent();
                  break;
                case "operator":
                  handleOperator(button.value);
                  break;
                case "equal":
                  handleEqual();
                  break;
                default:
                  break;
              }
            };

            return (
              <button
                key={`${button.label}-${button.action}`}
                className={`key key--${button.type} ${isWide} ${
                  isActive ? "key--active" : ""
                }`}
                onClick={onClick}
                type="button"
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
