import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Country.css";
import Loader from "../components/Loader";

const url = "https://restcountries.com/v3.1/";

const Border = ({ name }) => {
  const [border, setBorder] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (!name) return;
    fetch(`${url}alpha/${name}`)
      .then((res) => res.json())
      .then((res) => {
        setBorder(res[0].name.official);
      });
  }, [name]);

  return (
    <>
      {border && (
        <button onClick={() => history.push(`/country/${border}`)}>
          {border}
        </button>
      )}
    </>
  );
};

const Country = () => {
  const [country, setcountry] = useState(null);
  const [loading, setLoading] = useState(false);

  let name = useParams().id;
  let history = useHistory();

  useEffect(() => {
    if (!name) return;
    setLoading(true);
    fetch(`${url}name/${name.split("*").join(" ")}?fullText=true`)
      .then((res) => res.json())
      .then((res) => {
        const countries = res.map((el) => ({
          name: el.name.official || el.name,
          img: el.img || el.flags.svg,
          population: el.population,
          region: el.region,
          capital: el.capital,
          nativeName: el.nativeName
            ? [el.nativeName]
            : false ||
              Object.keys(res[0].name?.nativeName).map(
                (el) => `${res[0].name.nativeName[el].common}(${el})`
              ),
          subRegion: el.subregion,
          topLevelDomain: el.topLevelDomain || el.tld,
          currencies: res[0].currencies
            ? Object.values(res[0].currencies).map(({ name }) => name)
            : null,
          languages: el.languages ? Object.values(el.languages) : null,
          borders: el.borders,
        }));
        setcountry(...countries);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [history, name]);

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <main className="container-country">
      {loading && <Loader />}
      {country && (
        <>
          <button onClick={back}>← Back</button>
          <div className="col-2">
            <div className="container-img">
              <img src={country.img} alt={country.name} />
            </div>
            <div className="detail">
              <h2>{country.name}</h2>
              <div className="col-2">
                <div>
                  <h4>
                    <b>Native Name: </b>
                    {country.nativeName.join(", ") || "Sin datos"}
                  </h4>
                  <h4>
                    <b>Population: </b>
                    {country.population || "Sin datos"}
                  </h4>
                  <h4>
                    <b>Region: </b>
                    {country.region || "Sin datos"}
                  </h4>
                  <h4>
                    <b>Sub Region: </b>
                    {country.subRegion || "Sin datos"}
                  </h4>
                  <h4>
                    <b>Capital: </b>
                    {country.capital || "Sin datos"}
                  </h4>
                </div>
                <div>
                  <h4>
                    <b>Top Level Domian: </b>
                    {country.topLevelDomain
                      ? country.topLevelDomain.join(", ")
                      : "Sin datos"}
                  </h4>
                  <h4>
                    <b>Currencies: </b>
                    {country.currencies
                      ? country.currencies.join(", ")
                      : "Sin datos"}
                  </h4>
                  <h4>
                    <b>Languages: </b>
                    {country.languages
                      ? country.languages.map((name) => name).join(", ")
                      : "Sin datos"}
                  </h4>
                </div>
              </div>

              <div className="borders">
                <h4>
                  <b>borders: </b>
                </h4>
                {country.borders
                  ? country.borders.map((el) => <Border name={el} key={el} />)
                  : ""}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Country;
