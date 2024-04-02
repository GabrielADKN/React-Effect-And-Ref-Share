import React from "react";
import "./Card.css";

export default function Card({card}) {
    return (
        <div className="card">
            <img src={card.image} alt={card.code} />
        </div>
    )
}
