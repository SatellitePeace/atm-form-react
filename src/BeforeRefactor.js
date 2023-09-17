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

  function handleSubmit(e) {
    e.preventDefault()
    console.log("submitted")

    if (name === "") {
      setNameError(true)
      setTimeout(() => {
        setNameError(false)
      }, 2000);
      setName().focus()
      return
    }
   
    if (number === "" || number.length < 3) {
      setNumberError(true)
      setTimeout(() => {
        setNumberError(false)
      }, 2000);
      return
    }
    
    if (month === "" || month === 0 || month > 12) {
      setMonthError(true)
      setTimeout(() => {
        setMonthError(false)
      }, 2000);
      return
    } 
    if (year === "" || year < 23) {
      setYearError(true) 
      setTimeout(() => {
        setYearError(false)
      }, 2000);
      return
    } 
    if (cvv === "" || cvv.length < 3) {
      setCvvError(true)
      setTimeout(() => {
        setCvvError(false)
      }, 2000);
      return
    }
    setSubmitted(true)
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
        onAddNumber={setNumber}
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
  return <section className="cards">
    <div className="card-back">
      <figure className="back-card">
        <img src={cardBack} alt="" className="back" />
        <span className="cvv">
          {`${cvv === "" ? "CVV" : cvv} `}
        </span>
      </figure>
    </div>


    {/* front */}
    <div className="card-front">
      <figure className="front-card">
        <img src={cardFront} alt="" className="front" />
        {/* captions */}
        <img src={cardLogo} alt="" className="card-logo" />
        <span className="digits">
          {`${number === "" ? "0000 0000 0000 0000" : number} `}
        </span>
        <span className="name">  {`${name === "" ? "Name" : name} `}</span>
        <p className="expiry">
          <span>{`${month === "" ? "00" : month} `}</span>/<span>{`${year === "" ? "00" : year} `}</span>
        </p>
      </figure>
    </div>
  </section>
}

function Form({ name, onAddName, number, onAddNumber, month, onAddMonth, year, onAddYear, cvv, onAddCvv, onSubmit, submitted, reload, nameError, numberError, monthError, yearError, cvvError }) {
  return (<>
    {submitted ? (<section className="success-modal form">
      <img src={thankYouIcon} alt="thank you icon" />
      <h1>Thank You !</h1>
      <p>We've added your card details</p>
      <button className="btn" onClick={reload}>Continue</button>
    </section>) : (
      <form className="form" onSubmit={onSubmit}>
        {/* NAME */}
        <label>CARDHOLDER NAME</label>
        <input type="text"
          placeholder="e.g Jane Appleseed"
          value={name}
          onChange={(e) => onAddName(e.target.value)}
          className={`${nameError ? "err" : ""}`} />
        <span className={`${nameError ? "error" : "normal"}`}>
          Please input a valid name
        </span>
        {/* DIGITS */}
        <label>CARD NUMBER</label>
        <input type="number"
          placeholder="e.g 1234 5678 9123 000"
          value={number}
          onChange={(e) => {
            const inputValue = e.target.value.slice(0, 19)
            onAddNumber(inputValue)
          }
          }
          maxLength="5"
          className={`${numberError ? "err" : ""}`} />
        <span className={`${numberError ? "error" : "normal"}`}>
          Must be between 13 and 19 digits
        </span>
        {/*  */}
        <div className="date-CVC">
          <div className="mm-yy-container">
            <label>EXP. DATE [MM / YY]</label>
            <div className="mm-yy">
              {/* MONTH */}
              <div>
                <input type="number"
                  placeholder="MM"
                  value={month}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 2)
                    onAddMonth(inputValue)
                  }}
                  maxLength="2"
                  className={`${monthError ? "err" : ""}`} />
                <span className={`${monthError ? "error" : "normal"}`}>
                  Please input a valid month
                </span>
              </div>
              {/* YEAR */}
              <div>
                <input type="number"
                  placeholder="YY"
                  value={year}
                  onChange={(e) => {
                    const inputValue = e.target.value.slice(0, 4)
                    onAddYear(inputValue)
                  }}
                  maxLength="2"
                  className={`${yearError ? "err" : ""}`} />
                <span className={`${yearError ? "error" : "normal"}`}>
                  Please input a valid year
                </span>
              </div>
            </div>
          </div>
          {/* CVV */}
          <div className="cvv-input">
            <label>CVV</label>
            <input type="number"
              placeholder="e.g. 123"
              value={cvv}
              onChange={(e) => {
                const inputValue = e.target.value.slice(0, 4)
                onAddCvv(inputValue)
              }}
              maxLength="4"
              className={`${cvvError ? "err" : ""}`} />
            <span className={`${cvvError ? "error" : "normal"}`}>
              Must be 3 or 4 digits
            </span>
          </div>
        </div>
        <button className="btn">
          Confirm
        </button>
      </form>
    )}
  </>)
}

export default App;
