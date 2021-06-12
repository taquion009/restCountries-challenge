import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Country.css";

const Border = ({ name }) => {
  const [border, setBorder] = useState(null);
  let history = useHistory();

  useEffect(() => {
    if (!name) return;
    fetch(`https://restcountries.eu/rest/v2/alpha/${name}`)
    .then(res=>res.json())
    .then(res=>setBorder(res.name));
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

  let name = useParams().id;
  let history = useHistory();

  useEffect(() => {
    if (!name) return;
    fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(res=>res.json())
      .then((res) => {
        const countries = res.map((el) => ({
          name: el.name,
          img: el.flag,
          population: el.population,
          region: el.region,
          capital: el.capital,
          nativeName: el.nativeName,
          subRegion: el.subregion,
          topLevelDomain: el.topLevelDomain,
          currencies: el.currencies,
          languages: el.languages,
          borders: el.borders,
        }));
        setcountry(...countries);
      })
  }, [history, name]);

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <main className="container-country">
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
                  {country.nativeName}
                </h4>
                <h4>
                  <b>Population: </b>
                  {country.population}
                </h4>
                <h4>
                  <b>Region: </b>
                  {country.region}
                </h4>
                <h4>
                  <b>Sub Region: </b>
                  {country.subRegion}
                </h4>
                <h4>
                  <b>Capital: </b>
                  {country.capital}
                </h4>
              </div>
              <div>
                <h4>
                  <b>Top Level Domian: </b>
                  {country.topLevelDomain.join(", ")}
                </h4>
                <h4>
                  <b>Currencies: </b>
                  {country.currencies.map(({ name }) => name).join(", ")}
                </h4>
                <h4>
                  <b>Languages: </b>
                  {country.languages.map(({ name }) => name).join(", ")}
                </h4>
              </div>
              </div>
              
                <div className="borders">
                <h4>
                  <b>borders: </b>
                </h4>
                  {country.borders.map((el) => (
                    <Border name={el} key={el} />
                  ))}
                </div>
            </div>
            
          </div>
        </>
      )}
    </main>
  );
};

export default Country;
