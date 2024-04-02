import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import "./CardList.css";

export default function CardList() {
    const [cards, setCards] = useState([]);
    const [deck_id, setDeck_id] = useState("");
    const [deck_remaining, setDeck_remaining] = useState(0);

    const drawCard = () => {
        if (deck_id) {
            axios
                .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
                .then(response => {
                    setCards(cards => [...cards, ...response.data.cards]);
                    setDeck_remaining(response.data.remaining);
                })
                .catch(error => console.error("Error drawing card:", error));
        }
    };

    const resetDeck = () => {
        axios
            .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => {
                setDeck_id(response.data.deck_id);
                setDeck_remaining(response.data.remaining);
                setCards([]);
            })
            .catch(error => console.error("Error shuffling deck:", error));;
    };

    useEffect(() => {
        resetDeck();
    }, []);

    // useEffect(() => {
    //     drawCard();
    // }, [deck_id]);

    return (
        <div >

            <div className="card-list">
                {/* <button onClick={resetDeck} className="card-button reset">Reset Deck</button> */}
                <div className="card-text">
                    <p >Deck ID: {deck_id}</p>
                    <p >Deck Size: {cards.length}</p>
                    <p >Remaining: {deck_remaining}</p>
                    {deck_remaining === 0 && (
            <button onClick={resetDeck} className="card-button shuffle">Shuffle & Reset Deck</button>
        )}
                </div>

                <button onClick={drawCard} className="card-button draw">Draw a Card</button>
            </div>
            <div className="card-list">
                {cards.map((card) => (
                    <Card key={card.code} card={card} />
                ))}
            </div>
        </div>
    );
}
