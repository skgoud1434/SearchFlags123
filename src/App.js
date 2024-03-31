import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((data) => data.json())
        .then((data) => setData(data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let time;
    try {
      setLoading(true);
      if (input) {
        time = setTimeout(() => {
          fetch(`https://restcountries.com/v3.1/name/${input}`)
            .then((data) => data.json())
            .then((data) => setData(data));
        }, 500);
      }
      return () => clearTimeout(time);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [input]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for countries..."
      />
      <div className="container">
        {loading ? (
          <div className="loader">
            <p>Loading...</p>
          </div>
        ) : data.length > 0 ? (
          data.map((ele) => {
            return (
              <div key={ele.name.common} className="countryCard">
                <img src={ele.flags.png} alt={ele.name.common} />

                <p>{ele.name.common}</p>
              </div>
            );
          })
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
