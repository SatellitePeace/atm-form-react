import cardFront from "./images/bg-card-front.png"
import cardBack from "./images/bg-card-back.png"
import cardLogo from "./images/card-logo.svg"
import thankYouIcon from "./images/icon-complete.svg"
import { useState } from "react";

function App() {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [cvv, setCvv] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [nameError, setNameError] = useState(false);
  const [numberError, setNumberError] = useState(false);
  const [monthError, setMonthError] = useState(false);
  const [yearError, setYearError] = useState(false);
  const [cvvError, setCvvError] = useState(false);

  function handleNumber(e)  {
    const inputVal = e.target.value.replace(/ /g, ""); //remove all the empty spaces in the input
    let inputNumbersOnly = inputVal.replace(/\D/g, ""); // Get only digits
    if (inputNumbersOnly.length > 19) {
        //If entered value has a length greater than 19 then take only the first 19 digits
        inputNumbersOnly = inputNumbersOnly.substr(0, 19);
    }
   // Get nd array of 4 digits per an element EX: ["4242", "4242", ...]
    const splits = inputNumbersOnly.match(/.{1,4}/g);

    let spacedNumber = "";
    if (splits) {
        spacedNumber = splits.join(" "); // Join all the splits with an empty space
    }

    setNumber(spacedNumber); // Set the new CC number
};


  function handleSubmit(e) {
    e.preventDefault()
    console.log("submitted")

    const fieldsToValidate = [
      { field: name, setError: setNameError },
      { field: number, setError: setNumberError, minLength: 13 },
      { field: month, setError: setMonthError, min: 1, max: 12 },
      { field: year, setError: setYearError, min: 23 },
      { field: cvv, setError: setCvvError, minLength: 3 },
    ];

    let hasErrors = false;

    fieldsToValidate.forEach(({ field, setError, minLength, min, max }) => {
      if (field === "" || (minLength && field.length < minLength) || (min && field < min) || (max && field > max)) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      setSubmitted(true);
    }
  }


  function handleReload() {
    setSubmitted(false)
    setName("")
    setNumber("")
    setMonth("")
    setYear("")
    setCvv("")
    console.log("reload")
  }

  return (
    <main className="App">
      <Cards
        name={name}
        number={number}
        month={month}
        year={year}
        cvv={cvv}
      />
      <Form
        name={name}
        onAddName={setName}
        number={number}
        onAddNumber={handleNumber}
        month={month}
        onAddMonth={setMonth}
        year={year}
        onAddYear={setYear}
        cvv={cvv}
        onAddCvv={setCvv}
        onSubmit={handleSubmit}
        submitted={submitted}
        reload={handleReload}
        nameError={nameError}
        numberError={numberError}
        monthError={monthError}
        yearError={yearError}
        cvvError={cvvError} />
    </main>
  );
}


function Cards({ name, number, month, year, cvv }) {
  // Helper function to handle default values
  const getOrDefault = (value, defaultValue) => (value === "" ? defaultValue : value);

  // Set default values for name, number, month, year, and cvv
  const defaultName = getOrDefault(name, "Name");
  const defaultNumber = getOrDefault(number, "0000 0000 0000 0000");
  const defaultMonth = getOrDefault(month, "00");
  const defaultYear = getOrDefault(year, "00");
  const defaultCvv = getOrDefault(cvv, "CVV");

  return (
    <section className="cards">
      <div className="card-back">
        <figure className="back-card">
          <img src={cardBack} alt="" className="back" />
          <span className="cvv">{`${defaultCvv} `}</span>
        </figure>
      </div>

      {/* front */}
      <div className="card-front">
        <figure className="front-card">
          <img src={cardFront} alt="" className="front" />
          {/* captions */}
          <img src={cardLogo} alt="" className="card-logo" />
          <span className="digits">{`${defaultNumber} `}</span>
          <span className="name">{`${defaultName} `}</span>
          <p className="expiry">
            <span>{`${defaultMonth} `}</span>/<span>{`${defaultYear} `}</span>
          </p>
        </figure>
      </div>
    </section>
  );
}

function InputField({ label, type, value, onChange, placeholder, maxLength, error, errorMessage }) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className={`${error ? "err" : ""}`}
      />
      <span className={`${error ? "error" : "normal"}`}>{errorMessage}</span>
    </>
  );
}

function Form({ name, onAddName, number, onAddNumber, month, onAddMonth, year, onAddYear, cvv, onAddCvv, onSubmit, submitted, reload, nameError, numberError, monthError, yearError, cvvError }) {
  return (
    <>
      {submitted ? (
        <section className="success-modal form">
          <img src={thankYouIcon} alt="thank you icon" />
          <h1>Thank You !</h1>
          <p>We've added your card details</p>
          <button className="btn" onClick={reload}>
            Continue
          </button>
        </section>
      ) : (
        <form className="form" onSubmit={onSubmit}>
          {/* NAME */}
          <InputField
            label="CARDHOLDER NAME"
            type="text"
            placeholder="e.g Jane Appleseed"
            value={name}
            onChange={(e) => onAddName(e.target.value)}
            maxLength={undefined}
            error={nameError}
            errorMessage="Please input a valid name"
          />
          {/* DIGITS */}
          <InputField
            label="CARD NUMBER"
            type="text"
            placeholder="e.g 1234 5678 9123 000"
            value={number}
            onChange={onAddNumber}
            error={numberError}
            errorMessage="Must be between 13 and 19 digits"
          />
          {/* DATE AND CVV */}
          <div className="date-CVC">
            {/* MONTH */}
           <div> <InputField
              label="EXP. DATE"
              type="number"
              placeholder="MM"
              value={month}
              onChange={(e) => {
                const inputValue = e.target.value.slice(0, 2);
                onAddMonth(inputValue);
              }}
              maxLength={2}
              error={monthError}
              errorMessage="Please input a valid month"
            /></div>
            {/* YEAR */}
            <div><InputField
              label="[MM / YY]"
              type="number"
              placeholder="YY"
              value={year}
              onChange={(e) => {
                const inputValue = e.target.value.slice(0, 4);
                onAddYear(inputValue);
              }}
              maxLength={2}
              error={yearError}
              errorMessage="Please input a valid year"
            /></div>

            {/* CVV */}
            <div><InputField
              label="CVV"
              type="number"
              placeholder="e.g. 123"
              value={cvv}
              onChange={(e) => {
                const inputValue = e.target.value.slice(0, 4);
                onAddCvv(inputValue);
              }}
              maxLength={4}
              error={cvvError}
              errorMessage="Must be 3 or 4 digits"
            /></div>
          </div>
          <button className="btn">Confirm</button>
        </form>
      )}
    </>
  );
}


export default App;
