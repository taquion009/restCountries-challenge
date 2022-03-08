import React, { memo } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ img, name, population, region, capital }) => {
  const url = name.split(" ").join("*");
  return (
    <Link to={`/country/${url}`} className="card">
      <div className="container-img">
        <img src={img} alt={name} />
      </div>
      <div className="detail">
        <h2>{name}</h2>
        <h3>
          <b>Population: </b>
          {population}
        </h3>
        <h3>
          <b>Region: </b>
          {region}
        </h3>
        <h3>
          <b>Capital: </b>
          {typeof capital === "object" ? capital[0] : capital}
        </h3>
      </div>
    </Link>
  );
};

export default memo(Card);
