import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [convertedAmount, setConvertedAmount] = useState();

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/" + fromCurrency)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
        setExchangeRate(data.rates[toCurrency]);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, [fromCurrency, toCurrency]);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  useEffect(() => {
    if (exchangeRate !== undefined) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    }
  }, [amount, exchangeRate]);

  return (
    <div className="container">
      <h1 className="head">Currency Converter</h1>
      <div className="row">
        <div className="col-12">
          <input
            type="number"
            value={amount}
            className="baseamt"
            onChange={handleFromAmountChange}
          />
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <h3>Converts to :</h3>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="convertamt">{amount}  {fromCurrency}   is equal amount of   -   {convertedAmount} {toCurrency}</p>
    </div>
  );
};

export default CurrencyConverter;
