import React, { memo } from "react"
import { Link } from "react-router-dom"
import "./Card.css"

const Card = ({ img, name, population, region, capital }) => {
    return (
        <Link to={`/country/${name}`} className="card">
            <div className="container-img">
                <img src={img} alt={name} />
            </div>
            <div className="detail">
                <h3>{name}</h3>
                <h4><b>Population: </b>{population}</h4>
                <h4><b>Region: </b>{region}</h4>
                <h4><b>Capital: </b>{typeof capital === "object"?capital[0]:capital}</h4>
            </div>
        </Link>
    )
}

export default memo(Card)
